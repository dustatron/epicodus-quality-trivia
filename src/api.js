export class Api {
  constructor(quiz, numQs, diff, cat) {
    this.quiz = quiz;
    this.numQs = numQs;
    this.diff = diff;
    this.cat = cat;
  }

  async triviaQs() {
    try {
      let response = await fetch(`https://opentdb.com/api.php?amount=${this.numQs}&category=${this.cat}&difficulty=${this.diff}`);
      let body = await response.json();
      body.results.forEach(result => {
        const { type, question, correct_answer, incorrect_answers } = result;
        const tempObj = {
          type,
          question,
          correct_answer: correct_answer.replace(/&#039;/g, "'"),
          incorrect_answers
        };
        this.quiz.questions.push(tempObj);
      });
      return body;
    } catch (error) {
      console.log("ERROR ERROR!" + error.message);
    }
  }

}
