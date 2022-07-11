var questionsArr = [ 
    {question: "A very useful tool used during development and debugging for printing content to the debugger.",
    a: "JavaScript",
    b: "terminal/bash",
    c: "for loops",
    d: "console.log",
    answer: "D"},
    {question: "Commonly used datatypes DO NOT include:",
    a: "strings",
    b: "booleans",
    c: "alerts",
    d: "numbers",
    answer: "C"},
    {question: "The condition of an if / else statement is enclosed in _____.",
    a: "parentheses",
    b: "curly brackets",
    c: "quotes",
    d: "square brackets",
    answer: "A"}
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
var timerCount = 10;
var timer;
var quizContainerEL = document.querySelector(".quiz-container");
var quizContainerQuestionEl = document.querySelector(".quiz-container__question");
var quizContainerAnswersEl = document.querySelector(".quiz-container__answers");
var quizContainerResultEl = document.querySelector(".quiz-container__result");
var highScoresContainer = document.querySelector(".highscore-container");
var highScoresTitle = document.querySelector(".highscores-container__title");
var highScoresList = document.querySelector(".highscore-container__scoreList");
var highScoreBack = document.querySelector(".highscore-container__back");
var highScoreClear = document.querySelector(".highscore-container__clearscores");
var answer1El = document.querySelector(".quiz__answer1");
var answer1E2 = document.querySelector(".quiz__answer2");
var answer1E3 = document.querySelector(".quiz__answer3");
var answer1E4 = document.querySelector(".quiz__answer4");
var scoreCounter = 0;
var isCorrect = false;
var incorrect = false;
var selectedAnswer;
var questionAnswer;

var scoreObj = {initials:"", score:""};


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount > 0 && qCount <= questionsArr.length) {
        // Tests if win condition is met
        if (isCorrect && timerCount > 0) {
          // Clears interval and stops timer
        //   clearInterval(timer);
          isCorrect = false;
          timerCount = timerCount + 15;
          console.log("isCorrect: ", isCorrect);
          correctAnswer();
        } else if (incorrect && timerCount > 0 && qCount <= questionsArr.length) {
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
      } else if (timerCount > 0 && qCount > questionsArr.length) {
        console.log("timerCount: ", timerCount, qCount);
        clearInterval(timer);
      }
    }, 1000);
  }

function freezePane() {
    // quizContainerAnswersEL.removeEventListener;
    for (i = 0; i < quizContainerAnswersEl.children.length; i++) {
        console.log("freezePane() called");
        quizContainerAnswersEl.children[i].removeEventListener("click", isClicked, true);
    }
    setTimeout(() => {clearPane();}, 3000);
}

function clearPane() {
    console.log("clearPane() called");
    quizContainerQuestionEl.textContent = '';
    while (quizContainerAnswersEl.firstChild) {
    quizContainerAnswersEl.removeChild(quizContainerAnswersEl.firstChild);
    }
    quizContainerResultEl.textContent = '';
    if (timerCount > 0) {
        console.log("dQ called by clearPane");
        displayQuestion();
    }
}

function correctAnswer() {
    quizContainerResultEl.textContent = "Correct!";
    scoreCounter++;
    console.log("scoreCounter: ", scoreCounter);
    // setWins();
    freezePane();
}

function incorrectAnswer() {
    quizContainerResultEl.textContent = "Incorrect!";
    console.log("incorrectAnswer() called");
    freezePane();
}

function isClicked() {
    console.log("isClicked() called");
    selectedAnswer = (this).textContent[0];
    console.log("selected answer: ", selectedAnswer);
    checkAnswer();
}

function checkAnswer() {
    console.log("checkAnswer() called");
    if (selectedAnswer == questionAnswer) {
        isWin = true;
        isCorrect = true;
    } else {
        incorrect = true;
    }
 }

function loseGame() {
    console.log("loseGame() called");
    clearPane();
    console.log("clearPane called by loseGame");
    qCount = 0;
    // scoreCounter = 0;
    introEl.textContent = "You lost!";
    introTextEl.textContent = "Would you like to play again?";
    submitButton.textContent = "Yes";
    if (introContainerEl.children.length < 4) {
        playAgain = document.createElement("button");
        playAgain.setAttribute("type","button");
        playAgain.setAttribute("style", "margin-left:5px");
        playAgain.textContent = "Enter Score";
        playAgain.className = "start-quiz_button";
        playAgain.addEventListener("click", highScore);
        introContainerEl.append(playAgain);
    }
    introContainerEl.setAttribute("style", "display:block");
}

var qCount = 0;

function displayQuestion() {
    quizContainerEL.setAttribute("style", "display:block");
    if (qCount < questionsArr.length) {
        quizContainerQuestionEl.textContent = questionsArr[qCount].question;
        for (i = 0; i < Object.keys(questionsArr[qCount]).length; i++) {
            var answerEl = document.createElement("li");
            if (i == 1){
                quizContainerAnswersEl.append(answerEl);
                quizContainerAnswersEl.children[0].textContent = "A) " + questionsArr[qCount].a;
                quizContainerAnswersEl.children[0].addEventListener('click', isClicked, true);
            } else if (i == 2) {
                quizContainerAnswersEl.append(answerEl);
                quizContainerAnswersEl.children[1].textContent = "B) " + questionsArr[qCount].b;
                quizContainerAnswersEl.children[1].addEventListener('click', isClicked, true);
            } else if (i == 3) {
                quizContainerAnswersEl.append(answerEl);
                quizContainerAnswersEl.children[2].textContent = "C) " + questionsArr[qCount].c;
                quizContainerAnswersEl.children[2].addEventListener('click', isClicked, true);
            } else if (i == 4) {
                quizContainerAnswersEl.append(answerEl);
                quizContainerAnswersEl.children[3].textContent = "D) " + questionsArr[qCount].d;
                quizContainerAnswersEl.children[3].addEventListener('click', isClicked, true);
            } else if (i==5) {
                questionAnswer = questionsArr[qCount].answer;
                console.log("questionAnswer: ", questionAnswer);
            }
            
        }
    } else {
        highScore();
    }
    qCount++;
    console.log("displayQuestion() called");
}

function highScore(event) {
    console.log("highScore() called");
    quizContainerEL.setAttribute("style", "display:none");
    introContainerEl.setAttribute("style", "display:none");
    scoreContainerScore.textContent = scoreCounter;
    scoreContainer.setAttribute("style", "display:block");
    scoreSubmit.addEventListener("click", submitScore);
}

function submitScore(event) {
    console.log("submitScore() called");
    var initialsInput = document.querySelector(".score-container__input").value;
    scoreObj.initials = initialsInput;
    scoreObj.score = scoreCounter;
    var localCheck = JSON.parse(localStorage.getItem("highScores"));
    console.log("localCheck: ", localCheck);
    if (localCheck == null){
        highScores.push(scoreObj);
    } else {
        highScores = JSON.parse(localStorage.getItem("highScores"));
        highScores.push(scoreObj);
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
    viewScore();
    console.log("highscores: ", highScores);
}

function viewScore() {
    console.log("viewScore() called");
    qCount = questionsArr.length + 1;
    quizContainerEL.setAttribute("style", "display:none");
    scoreContainer.setAttribute("style", "display:none");
    introContainerEl.setAttribute("style", "display:none");
    highScoresContainer.setAttribute("style", "display:block");
    var scoreVal = JSON.parse(localStorage.getItem("highScores"));
    console.log("scoreVal: ", scoreVal);
    var scoreListLength = highScores.length - 1;
    if (highScoresList.children.length === 0) {
        for (i = 0; i < scoreVal.length; i++) {
            var scoreEL = document.createElement("li");
            scoreEL.textContent = (i + 1) + ")  " + scoreVal[i].initials + " - " + scoreVal[i].score;
            highScoresList.append(scoreEL);
        }
    } else if (highScores.length > highScoresList.children.length && highScoresList.children.length > 0) {
            var scoreEL = document.createElement("li");
            scoreEL.textContent = (highScoresList.children.length + 1) + ") " + scoreVal[scoreListLength].initials + " - " + scoreVal[scoreListLength].score;
            highScoresList.append(scoreEL);
    } else {
        window.alert("All scores up to date");
    }
    highScoresList.setAttribute("style", "list-style-type:none");
    highScoreBack.addEventListener("click", init);
    highScoreClear.addEventListener("click", clearScores);
}

function clearScores() {
    console.log("clearScores() called");
    localStorage.clear("highScores");
    while (highScoresList.firstChild) {
        highScoresList.removeChild(highScoresList.firstChild);
        }
        highScoresList.textContent = '';
}

function init() {
    qCount = 0;
    scoreCounter = 0;
    console.log("init() called");
    introEl.textContent = "Coding Quiz Challenge"
    introTextEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
    submitButton.textContent = "Start Quiz";
    if (introContainerEl.children.length > 3) {
        introContainerEl.removeChild(introContainerEl.lastChild);
    }
    highScoresContainer.setAttribute("style", "display:none");
    introContainerEl.setAttribute("style", "display:block");
    // submitButton.addEventListener("click", intro);
}

function intro(event) {
    event.preventDefault();
    introContainerEl.setAttribute("style", "display:none");
    timerCount = 10;
    clearPane();
    // displayQuestion();
    startTimer();
    console.log("intro() called");
    return;
}

submitButton.addEventListener("click", intro);
viewScores.addEventListener("click", viewScore);

//TODO: figure out bug when navigating from highscores to intro
//TODO: figure out why local storage is clearing after refresh
