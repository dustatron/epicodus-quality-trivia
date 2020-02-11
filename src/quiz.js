export class Quiz {
  constructor() {
    this.questions = [];
    this.score = 0;
    this.answers = [];
    this.timer = 30;
  }
//we dont need the timer......
  setScore() {
    this.answers.forEach((ans, i) => {
      if (ans === this.questions[i].correct_answer) {
        this.score += 1;
      }
    });
  }

  //add users answer to this.answer array.
  addAnswers(answer) {
    this.answers.push(answer);
  }

  //create shuffled answer array that includes the right answer. 
  shuffleAnswers() {
    this.questions.forEach(question => {
      let tempArr = [...question.incorrect_answers]
      tempArr.splice(Math.floor(Math.random() * 3), 0, question.correct_answer);

      question.shuffled = tempArr;
    });
  }

  //return percentage of right answers.
  calcPercent() {
    console.log('score', this.score, 'the answers', this.answers, 'the quesitons', this.questions );
    return Math.floor((this.score / this.questions.length) * 100);
  }

} // end class