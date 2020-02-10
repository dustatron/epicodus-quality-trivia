export class Api {
  constructor(quiz) {
    this.quiz = quiz
  }

  call(){
    let request = new XMLHttpRequest();
    const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`;
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
      this.quiz.questions.push(tempObj)
     })
     console.log(this.quiz);
    }
  }
  
  request.open("GET", url, true);
  request.send();
  }

}