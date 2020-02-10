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



} // end class