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
    d: "d"}
]
var timerEl = document.querySelector(".timer-tracker__countdown");
var introEl = document.querySelector(".title-box");
var introTextEl = document.querySelector(".title-box__text");
var submitButton = document.querySelector(".start-quiz_button");
var secondsLeft = 10;


function quizGame() {
    var timeLeft = '';

    // function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function() {
          secondsLeft--;
          timerEl.textContent = secondsLeft;
      
          if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
          //   sendMessage();
          }
        timeLeft = secondsLeft;
        console.log(timeLeft);
        }, 1000);
    // }
    // setTime();
    console.log(secondsLeft);
    console.log(timeLeft);

    while (timeLeft > 0) {
        console.log(timeLeft);
        

    } 
    console.log("time up");
    


    // if (secondsLeft > 0) {
    //     console.log(secondsLeft);
    // } else {
    //     console.log("time up");
    // }

}

function intro(event) {
    event.preventDefault();
    introEl.setAttribute("style", "display:none");
    introTextEl.setAttribute("style", "display:none");
    submitButton.setAttribute("style", "display:none");
    // setTime();
    quizGame();
    return;
}

submitButton.addEventListener("click", intro);
