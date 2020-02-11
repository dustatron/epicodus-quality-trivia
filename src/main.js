import './scss/main.scss';
import $ from 'jquery';
import { Quiz } from './quiz';
import { Api} from './api';


let quiz = new Quiz();

const showQuestion = (qIndex) => {
  let index = parseInt(qIndex);

  $('#question').html(quiz.questions[index].question);
  $('#answer1+span').html(quiz.questions[index].shuffled[0]);
  $('#answer1').attr('name',quiz.questions[index].shuffled[0]);
  $('#answer2+span').html(quiz.questions[index].shuffled[1]);
  $('#answer2').attr('name',quiz.questions[index].shuffled[1]);
  $('#answer3+span').html(quiz.questions[index].shuffled[2]);
  $('#answer3').attr('name',quiz.questions[index].shuffled[2]);
  $('#answer4+span').html(quiz.questions[index].shuffled[3]);
  $('#answer4').attr('name',quiz.questions[index].shuffled[3]);
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

    (async () => {
      let api = new Api(quiz, numQs);
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
    let correctClass = "bg-danger"
    if(questObj.correct_answer === quiz.answers[index]) {
      answerState = "Correct";
      correctClass = "bg-success"
    } 
    printString += `<div class="single-answer ${correctClass}"> <div> Q: ${questObj.question} </div> 
    <div> A: ${questObj.correct_answer} </div>
    <div class="single-answer--result"> ${answerState}</div>
    </div>`
  });

  answersContainer.html(printString);

}