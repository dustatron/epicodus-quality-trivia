import './scss/main.scss';
import $ from 'jquery';
import { Quiz } from './quiz';
import { Api } from './api';
import Gify from './gify'


let quiz = new Quiz();

const showQuestion = (qIndex) => {
  let index = parseInt(qIndex);

  let btnContainer = $('.btn-container');
  let printString = "";

  printString += `<div> <strong> Q${index + 1}: </strong> ${quiz.questions[index].question} </div>`;

  quiz.questions[index].shuffled.forEach((answer, index) => {

    printString += `<div><button class='btn btn-info' name="${answer}">${String.fromCharCode(index + 65)}</button> <span>${answer}</span> </div>`;
  });
  btnContainer.html(printString);
};

$(document).ready(function () {
  $('.container').attr('style', '');
  let questionIndex = -1;
  let numQs;
  let counter = quiz.timer;
  let interval;
  function countDown() {
    interval = setInterval(() => {
      $('#counter').text(counter);
      counter--;
      if (counter === 0) {
        clearInterval(interval);
        quiz.addAnswers(' ');
        countDown();
        nextTurn();
      } else if (questionIndex === quiz.questions.length - 1) {
        clearInterval(interval);
        quiz.addAnswers(' ');
        nextTurn();
      }
    }, 1000);
  }
  $('form').submit(e => {
    e.preventDefault();
    numQs = $('#input-1').val();
    let cat = $('#trivia_category').val();
    let diff = $('#diff').val().toLowerCase();

    (async () => {
      let api = new Api(quiz, numQs, diff, cat);
      if(await api.triviaQs()){

        quiz.shuffleAnswers();
        countDown();
        nextTurn();
        $('.box-decore').slideUp(); //input box
        $('#question-display').slideDown(); //question box
      } else {
        $('.sorry').slideDown();
        $('.box-decore').slideUp(); //input box
      }
      
    })();
  });

  //button clicks
  $('.btn-container').on('click', 'button', event => {
    quiz.addAnswers(event.target.name);
    nextTurn();
  });

  $('.reset').click(function () {
    location.reload();
  });
  function nextTurn() {
    if (quiz.questions.length > quiz.qIndex) {
      showQuestion(quiz.qIndex);
      counter = quiz.timer;
      quiz.qIndex++;
    } else {
      quiz.setScore();
      let percent = quiz.calcPercent();
      endDisplay(percent);
      (async () => {
        let gify = new Gify();
        let image = await gify.getGif(percent);
        console.log(image);
        $('.end-gif').attr('src', image );
      })();
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
    let correctClass = "wrong";
    if (questObj.correct_answer === quiz.answers[index]) {
      answerState = "Correct";
      correctClass = "right";
    }
    printString += `<div class="single-answer ${correctClass}"> <div class="single-answer--top"> <div><strong> Q${index + 1}:</strong> ${questObj.question} </div> 
    <div><strong> A: </strong>${questObj.correct_answer} </div>
    </div>
    <div class="single-answer--result"> ${answerState}</div>
    </div>`;
  });

  answersContainer.html(printString);

}