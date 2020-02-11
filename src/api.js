export class Api {
  constructor(quiz, numQs ) {
    this.quiz = quiz;
    this.numQs =numQs;
    this.return;
  }

  async triviaQs() {
    try {
      let response = await fetch(`https://opentdb.com/api.php?amount=${this.numQs}&category=18&difficulty=easy`);
      let body = await response.json();
      body.results.forEach(result => {
        const { type, question, correct_answer, incorrect_answers } = result;
        const tempObj = {
          type,
          question,
          correct_answer,
          incorrect_answers
        }
        this.quiz.questions.push(tempObj); 
      });
          return body;
    } catch(error) {
       console.log("ERROR ERROR!" + error.message);
    }
  }
}
