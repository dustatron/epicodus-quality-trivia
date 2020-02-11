    //API CALL
    let promise = new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        const url = `https://opentdb.com/api.php?amount=${numQs}&category=18&difficulty=easy`;
        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      }); // end promise
      promise.then(function (response) {
        let body = JSON.parse(response);
        body.results.forEach(result => {
          const { type, question, correct_answer, incorrect_answers } = result;
          const tempObj = {
            type,
            question,
            correct_answer,
            incorrect_answers
          }
          quiz.questions.push(tempObj); 
        });
        quiz.shuffleAnswers();
        countDown()
        nextTurn();
      });