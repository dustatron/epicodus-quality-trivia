// import { example } from './example';
import './scss/main.scss';
import $ from 'jquery';
import { Quiz } from './quiz';

let request = new XMLHttpRequest();
const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`;

$(document).ready(function() {
 let quiz = new Quiz()

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
     response.results.forEach(result=>{
      const {type,question,correct_answer,incorrect_answers} = result;
      const tempObj ={
        type,
        question,
        correct_answer,
        incorrect_answers
      }
      quiz.questions.push(tempObj)
     })
     console.log(quiz);
    }
  }

  request.open("GET", url, true);
  request.send();

});



// const refreshId = setInterval(
//   () => {
//     const properID = CheckReload();
//     console.log(properID);
//     if (properID > 0) {
//       clearInterval(refreshId);
//     }
//   },
//   100
// );
// }