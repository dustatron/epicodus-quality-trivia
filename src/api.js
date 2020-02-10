import { thisTypeAnnotation } from "@babel/types";

export class Api {
  constructor(quiz, numQs ) {
    this.quiz = quiz;
    this.numQs =numQs;
    this.return;
  }

  call(){
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=${this.numQs}&category=18&difficulty=easy`;

      request.onload = function() {

      }
    });


    
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
      self.quiz.questions.push(tempObj)
     })
     console.log(self.quiz);
    }
  }
  
  request.open("GET", url, true);
  request.send();
  }

}