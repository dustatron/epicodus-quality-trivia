import { Quiz } from "../src/quiz";


describe('Quiz', () => {
	test('should instanscite empty quiz object', () => {
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