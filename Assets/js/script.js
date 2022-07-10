var questionsArr = [ 
    {question: "question 1",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "b"},
    {question: "question 2",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "c"},
    {question: "question 3",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    answer: "d"}
]
var highScores = [];
var viewScores = document.querySelector(".view-scores");
var scoreContainer = document.querySelector(".score-container");
var scoreContainerScore = document.querySelector(".score-container__score");
var scoreSubmit = document.querySelector(".score-container__button");
// var initialsInput = document.querySelector(".score-container__input").value;
var initialsVar = '';
var timerEl = document.querySelector(".timer-tracker__countdown");
var introContainerEl = document.querySelector(".intro-container");
var introEl = document.querySelector(".intro-box");
var introTextEl = document.querySelector(".intro-box__text");
var submitButton = document.querySelector(".start-quiz_button");
var timerCount;
var timer;
var quizContainerEL = document.querySelector(".quiz-container");
var quizContainerQuestionEl = document.querySelector(".quiz-container__question");
var quizContainerAnswersEl = document.querySelector(".quiz-container__answers");
var quizContainerResultEl = document.querySelector(".quiz-container__result");
var answer1El = document.querySelector(".quiz__answer1");
var answer1E2 = document.querySelector(".quiz__answer2");
var answer1E3 = document.querySelector(".quiz__answer3");
var answer1E4 = document.querySelector(".quiz__answer4");
var scoreCounter = 0;
var isCorrect = false;
var incorrect = false;
var selectedAnswer;
var questionAnswer;


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isCorrect && timerCount > 0) {
          // Clears interval and stops timer
        //   clearInterval(timer);
          isCorrect = false;
          timerCount = timerCount + 15;
          console.log("isCorrect: ", isCorrect);
          correctAnswer();
        } else if (incorrect && timerCount > 0) {
          incorrect = false;
          timerCount = timerCount - 5;
          console.log("incorrect: ", incorrect);
          incorrectAnswer();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }

function freezePane() {
    // quizContainerAnswersEL.removeEventListener;
    for (i = 0; i < quizContainerAnswersEl.children.length; i++) {
        console.log("freezePane() called");
        quizContainerAnswersEl.children[i].removeEventListener("click", isClicked, true);
    }
    setTimeout(() => {clearPane();}, 5000);
}

function clearPane() {
    console.log("clearPane() called");
    // quizContainerEL.setAttribute("style", "display:none");
    quizContainerQuestionEl.textContent = '';
    // for (i = 0; i < quizContainerEL.children.length; i++) {
    //     quizContainerAnswersEl.children[0].remove();
    // }
    while (quizContainerAnswersEl.firstChild) {
    quizContainerAnswersEl.removeChild(quizContainerAnswersEl.firstChild);
    }
    quizContainerResultEl.textContent = '';
    // quizContainerEL.remove();
    if (timerCount > 0) {
        console.log("dQ called by clearPane");
        displayQuestion();
    }
}

function correctAnswer() {
    quizContainerResultEl.textContent = "Correct!";
    scoreCounter++;
    console.log("scoreCounter: ", scoreCounter);
    // isCorrect = true;
    setWins();
    freezePane();
    // displayQuestion();
}

function incorrectAnswer() {
    quizContainerResultEl.textContent = "Incorrect!";
    console.log("incorrectAnswer() called");
    // incorrect = true;
    freezePane();
    // displayQuestion();
}

// Updates win count on screen and sets win count to client storage
function setWins() {
    // win.textContent = winCounter;
    console.log("setWins() called");
    localStorage.setItem("scoreCount", scoreCounter);
  }

function isClicked() {
    console.log("isClicked() called");
    selectedAnswer = (this).textContent;
    console.log("selected answer: ", selectedAnswer);
    checkAnswer();
}

function assignAnswer() {
    // selectedAnswer = 
}

function checkAnswer() {
    console.log("checkAnswer() called");
    if (selectedAnswer == questionAnswer) {
        // console.log('checkAnswer() works!');
        isWin = true;
        isCorrect = true;
        // correctAnswer();
    } else {
        incorrect = true;
        // incorrectAnswer();
    }
 }

function loseGame() {
    console.log("loseGame() called");
    // quizContainerQuestionEl.textContent = '';
    // // for (i = 0; i < quizContainerEL.children.length; i++) {
    // //     quizContainerAnswersEl.children[0].remove();
    // // }
    // while (quizContainerAnswersEl.firstChild) {
    // quizContainerAnswersEl.removeChild(quizContainerAnswersEl.firstChild);
    // }
    clearPane();
    console.log("clearPane called by loseGame");
    // quizContainerResultEl.textContent = '';
    introEl.textContent = "You lost!";
    introTextEl.textContent = "Would you like to play again?";
    submitButton.textContent = "Yes";
    introContainerEl.setAttribute("style", "display:block");
}

function displayQuestion() {
    // timerCount = 60;
    quizContainerEL.setAttribute("style", "display:block");
    quizContainerQuestionEl.textContent = questionsArr[0].question;
    // console.log("dQ object: ", Object.keys(questionsArr[0]).length);
    for (i = 0; i < Object.keys(questionsArr[0]).length; i++) {
        // console.log("i ", i);
        var answerEl = document.createElement("li");
        if (i == 1){
            quizContainerAnswersEl.append(answerEl);
            quizContainerAnswersEl.children[0].textContent = questionsArr[0].a;
            quizContainerAnswersEl.children[0].addEventListener('click', isClicked, true);
        } else if (i == 2) {
            quizContainerAnswersEl.append(answerEl);
            quizContainerAnswersEl.children[1].textContent = questionsArr[0].b;
            quizContainerAnswersEl.children[1].addEventListener('click', isClicked, true);
        } else if (i == 3) {
            quizContainerAnswersEl.append(answerEl);
            quizContainerAnswersEl.children[2].textContent = questionsArr[0].c;
            quizContainerAnswersEl.children[2].addEventListener('click', isClicked, true);
        } else if (i == 4) {
            quizContainerAnswersEl.append(answerEl);
            quizContainerAnswersEl.children[3].textContent = questionsArr[0].d;
            quizContainerAnswersEl.children[3].addEventListener('click', isClicked, true);
        } else if (i==5) {
            questionAnswer = questionsArr[0].answer;
        }
    }
    
    console.log("displayQuestion() called");
}

function highScore(event) {
    // event.preventDefault();
    console.log("highScore() called");
    introContainerEl.setAttribute("style", "display:none");
    scoreContainerScore.textContent = scoreCounter;
    scoreContainer.setAttribute("style", "display:block");
    scoreSubmit.addEventListener("click", submitScore);
    // initialsVar = initialsInput;
    // console.log("initialsInput: ", initialsInput);
    // event.preventDefault();
}

//todo: add/update scoreobj in local storage
function submitScore(event) {
    // event.preventDefault();
    console.log("submitScore() called");
    var initialsInput = document.querySelector(".score-container__input").value;
    var scoreObj = {initials:"", score:""};
    scoreObj.initials = initialsInput;
    scoreObj.score = scoreCounter;
    highScores.push(scoreObj);
    console.log("highscores: ", highScores);
}

//todo: add function to display initials & high score
//with buttons to return to start or clear high scores

function intro(event) {
    event.preventDefault();
    introContainerEl.setAttribute("style", "display:none");
    timerCount = 60;
    displayQuestion();
    startTimer();
    console.log("intro() called");
    return;
}

submitButton.addEventListener("click", intro);
viewScores.addEventListener("click", highScore);
