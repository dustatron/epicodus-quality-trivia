import { Quiz } from "../src/quiz";


describe('Quiz', () => {
	test('should instantiate empty quiz object', () => {
    let compare = {
      questions: [],
      score: 0,
      answers: [],
      timer: 30000
    }
		let quiz  =new Quiz();
		expect(quiz).toEqual( compare );
  });
});

describe('CheckAnswer', () => {
  let quiz = new Quiz();
  quiz.answers = ["Michael Keaton", "George Clooney", "Val Kilmer"]

  quiz.questions = [
    {
      correct_answer: "Michael Keaton",
      incorrect_answers: [
        "George Clooney",
        "Val Kilmer",
        "Adam West"
      ]
    }, 
    {
      correct_answer: "John John",
      incorrect_answers: [
        "George Clooney",
        "Val Kilmer",
        "Adam West"
      ]
    }, 
    {
      correct_answer: "Billy Bill",
      incorrect_answers: [
        "George Clooney",
        "Val Kilmer",
        "Adam West"
      ]
    }
  ];

  test('should update score by 1', () => {
    expect(quiz.score).toEqual(1);
  });

});

