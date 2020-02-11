import './scss/main.scss';
import $ from 'jquery';
import { Quiz } from './quiz';

let first = true;
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
    //API CALL
    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=${numQs}&category=18&difficulty=easy`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    }); // end promise
    promise.then(function (response) {
      let body = JSON.parse(response);
      body.results.forEach(result => {
        const { type, question, correct_answer, incorrect_answers } = result;
        const tempObj = {
          type,
          question,
          correct_answer,
          incorrect_answers
        }
        quiz.questions.push(tempObj); 
      });
      quiz.shuffleAnswers();
      countDown()
      nextTurn();
    });
    
  });
  //button clicks
  $('.btn-container').on('click', 'button', event=>{
    quiz.addAnswers(event.target.name)
    nextTurn();
  });

  function nextTurn(){
    if(first){
      console.log(quiz.qIndex);
      showQuestion(quiz.qIndex);
      counter = quiz.timer;
      first = false 
    } else if (quiz.questions.length-1 > quiz.qIndex ) {
      console.log(quiz.qIndex);
      showQuestion(quiz.qIndex);
      counter = quiz.timer;
      quiz.qIndex ++;
    } else {
      quiz.setScore();
      let percent = quiz.calcPercent();
      $('.end-game').html(percent);
      console.log('END GAME');
    }
  }
});
