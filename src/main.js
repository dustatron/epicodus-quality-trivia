import './scss/main.scss';
import $ from 'jquery';
import { Quiz } from './quiz';
import { Api} from './api';


let quiz = new Quiz();

const showQuestion = (qIndex) => {
  let index = parseInt(qIndex);

  let btnContainer = $('.btn-container');
  let printString = "";

  printString += `<div> <strong> Q${index +1}: </strong> ${quiz.questions[index].question} </div>`;

  quiz.questions[index].shuffled.forEach((answer, index)=>{
    printString += `<div><button class='btn btn-info' name=${answer}>${String.fromCharCode(index + 65)}</button> <span>${answer}</span> </div>`
  });
  btnContainer.html(printString);
}

$(document).ready(function () {
  $('.container').attr('style', '');
  let questionIndex = -1;
  let numQs;
  let counter = quiz.timer;
  let interval;
  function countDown(){
    interval = setInterval(()=>{
      $('#counter').text(counter)
      counter--
      if(counter === 0 ){
        clearInterval(interval)
        quiz.addAnswers(' ');
        countDown();
        nextTurn();
      }else if(questionIndex===quiz.questions.length){
        clearInterval(interval)
        quiz.addAnswers(' ');
        nextTurn();
      }
    },1000)
  }
  $('form').submit(e => {
    e.preventDefault();
    numQs = $('#input-1').val();
    let diff = $('#diff').val().toLowerCase();

    (async () => {
      let api = new Api(quiz, numQs, diff);
      const response = await api.triviaQs();
      console.log(quiz);
      quiz.shuffleAnswers();
      countDown();
      nextTurn();
      $('.box-decore').slideUp(); //input box
      $('#question-display').slideDown(); //question box
    })();

    
  });
  
  //button clicks
  $('.btn-container').on('click', 'button', event=>{
    quiz.addAnswers(event.target.name)
    nextTurn();
  });

  function nextTurn(){
    if (quiz.questions.length > quiz.qIndex ) {
      console.log(quiz.qIndex);
      showQuestion(quiz.qIndex);
      counter = quiz.timer;
      quiz.qIndex ++;
    } else {
      quiz.setScore();
      let percent = quiz.calcPercent();
      endDisplay(percent)
    }
  }
});

function endDisplay(percent) {
  $('#total-score').html(`${percent}%`);
  $('.end-game').slideDown();
  $('#question-display').fadeOut();

  let answersContainer = $('.answers-container');
  let printString = "";

  quiz.questions.forEach((questObj, index) => {
    let answerState = "Wrong";
    let correctClass = "wrong"
    if(questObj.correct_answer === quiz.answers[index]) {
      answerState = "Correct";
      correctClass = "right"
    } 
    printString += `<div class="single-answer ${correctClass}"> <div class="single-answer--top"> <div><strong> Q${index + 1}:</strong> ${questObj.question} </div> 
    <div><strong> A: </strong>${questObj.correct_answer} </div>
    </div>
    <div class="single-answer--result"> ${answerState}</div>
    </div>`
  });

  answersContainer.html(printString);

}