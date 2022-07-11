// Question object
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
// Variables... LOTS of variables...
var highScores = [];
var viewScores = document.querySelector(".view-scores");
var scoreContainer = document.querySelector(".score-container");
var scoreContainerScore = document.querySelector(".score-container__score");
var scoreSubmit = document.querySelector(".score-container__button");
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
var qCount = 0;


// The setTimer function starts and stops the timer and triggers multiple functions
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      // Checks time, question count, and routes app to correctAnswer, incorrectAnswer, loseGame, or just stops the timer
      if (timerCount > 0 && qCount <= questionsArr.length) {
        // Adds net 10 seconds to timer
        if (isCorrect && timerCount > 0) {
          isCorrect = false;
          timerCount = timerCount + 13;
          correctAnswer();
        // Subtracts net 7 seconds from timer
        } else if (incorrect && timerCount > 0 && qCount <= questionsArr.length) {
          incorrect = false;
          timerCount = timerCount - 7;
          incorrectAnswer();
        }
      }
      // Tests if time has run out or if player has navigated away from questions container
      if (timerCount <= 0) {
        clearInterval(timer);
        loseGame();
      } else if (timerCount > 0 && qCount > questionsArr.length) {
        clearInterval(timer);
      }
    }, 1000);
  }

// Removes event listener for answer choices after an answer is selected
function freezePane() {
    for (i = 0; i < quizContainerAnswersEl.children.length; i++) {
        quizContainerAnswersEl.children[i].removeEventListener("click", isClicked, true);
    }
    setTimeout(() => {clearPane();}, 3000);
}

// Clears question container and calls new question
function clearPane() {
    quizContainerQuestionEl.textContent = '';
    while (quizContainerAnswersEl.firstChild) {
    quizContainerAnswersEl.removeChild(quizContainerAnswersEl.firstChild);
    }
    quizContainerResultEl.textContent = '';
    if (timerCount > 0) {
        displayQuestion();
    }
}

// Called if answer is correct
function correctAnswer() {
    quizContainerResultEl.textContent = "Correct!";
    scoreCounter++;
    freezePane();
}

// Called if answer is incorrect
function incorrectAnswer() {
    quizContainerResultEl.textContent = "Incorrect!";
    freezePane();
}

// Called if answer is clicked; calls checkAnswer()
function isClicked() {
    selectedAnswer = (this).textContent[0];
    checkAnswer();
}

// Checks if answer is correct or incorrect
function checkAnswer() {
    if (selectedAnswer == questionAnswer) {
        isCorrect = true;
    } else {
        incorrect = true;
    }
 }

//Called if timer runs out; player loses game. Utilizes intro-container
function loseGame() {
    clearPane();
    qCount = 0;
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


// Displays question; calls a question object from the question object array and appends it to the question container
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
            }
        }
    } else {
        highScore();
    }
    qCount++;
}

// Displays scoreContainer, calls submitScore when button is clicked
function highScore(event) {
    quizContainerEL.setAttribute("style", "display:none");
    introContainerEl.setAttribute("style", "display:none");
    scoreContainerScore.textContent = scoreCounter;
    scoreContainer.setAttribute("style", "display:block");
    scoreSubmit.addEventListener("click", submitScore);
}

// Submits score; parses local storage, appends to highScores array, new score appended, then stringified back to localstorage
function submitScore(event) {
    var initialsInput = document.querySelector(".score-container__input").value;
    scoreObj.initials = initialsInput;
    scoreObj.score = scoreCounter;
    var localCheck = JSON.parse(localStorage.getItem("highScores"));
    if (localCheck == null){
        highScores.push(scoreObj);
    } else {
        highScores = JSON.parse(localStorage.getItem("highScores"));
        highScores.push(scoreObj);
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
    viewScore();
}

// Displays scores to player; calls on localstorage and appends to DOM
function viewScore() {
    qCount = questionsArr.length + 1;
    quizContainerEL.setAttribute("style", "display:none");
    scoreContainer.setAttribute("style", "display:none");
    introContainerEl.setAttribute("style", "display:none");
    highScoresContainer.setAttribute("style", "display:block");
    var scoreVal = JSON.parse(localStorage.getItem("highScores"));
    var scoreListLength = highScores.length - 1;
    if (scoreVal != null) {
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
    }
    highScoresList.setAttribute("style", "list-style-type:none");
    highScoreBack.addEventListener("click", init);
    highScoreClear.addEventListener("click", clearScores);
}

// Clears localstorage and highScores object array; removes it from DOM
function clearScores() {
    localStorage.clear("highScores");
    highScores = [];
    while (highScoresList.firstChild) {
        highScoresList.removeChild(highScoresList.firstChild);
        }
        highScoresList.textContent = '';
}

// Re-initializes game again from intro-container
function init() {
    qCount = 0;
    scoreCounter = 0;
    introEl.textContent = "Coding Quiz Challenge"
    introTextEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
    submitButton.textContent = "Start Quiz";
    if (introContainerEl.children.length > 3) {
        introContainerEl.removeChild(introContainerEl.lastChild);
    }
    highScoresContainer.setAttribute("style", "display:none");
    introContainerEl.setAttribute("style", "display:block");
}

// Clears intro-container and starts game
function intro(event) {
    event.preventDefault();
    introContainerEl.setAttribute("style", "display:none");
    timerCount = 20;
    clearPane();
    startTimer();
}

// Starts game
submitButton.addEventListener("click", intro);

// Views highscores from header element
viewScores.addEventListener("click", viewScore);

