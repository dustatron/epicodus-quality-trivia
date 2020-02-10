export class Quiz{
  constructor(){
     this.questions = [];
     this.score = 0;
     this.answers = [];
     this.timer = 30000;
  }

  setScore() {
    this.answers.forEach((ans, i)=>{
      if(ans === this.questions[i].correct_answer){
        this.score += 1;
      }
    });
  }

  shuffleAnswers() {
    //retrun answer list with the correct asnwer mixed in. 
    //push to questions object in a new key 'shuffled'
    //once call for all of them. 
    this.questions.forEach(question=>{
      let tempArr = [...question.incorrect_answers]
      tempArr.splice(Math.floor(Math.random()*3), 0, question.correct_answer);

      question.shuffled = tempArr;
    });
  }


  calcPercent() {
    //return this.score divided by this.questions.length 
    // return precentage
    return 12;
  }

  addToAnswers(answer){
    //push users answer to this.answers array.
  }

} // end class