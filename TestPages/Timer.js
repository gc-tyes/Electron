var time = 0;
var count = 3;
var display = document.getElementById("timer");
const pushDataBtn = document.getElementById("pushDataBtn");
var promptText = document.getElementById("prompt");
var interval = null;

var pegArr = [
    document.getElementById("peg1"),
    document.getElementById("peg2"),
    document.getElementById("peg3"),
    document.getElementById("peg4"),
    document.getElementById("peg5"),
    document.getElementById("peg6"),
    document.getElementById("peg7"),
    document.getElementById("peg8"),
    document.getElementById("peg9")
];

var statusArr = [0,0,0,0,0,0,0,0,0];
var totalOn = 0;
var allIn = false;

var events = {};

/* Starts the actual test timer */
function startTimer() {
    display.classList.remove("gone");
    interval = setInterval(updateTime, 10);
    //pushDataBtn.classList.remove("gone");
}

/* Loops 100 times per second to update time by 0.01, then display the proper time.
        Also changes positioning of time label depending on size of the number (1 -> 10 -> 100) */
function updateTime() {
    time++;
    if (time / 100 == 10) {
        display.classList.remove("timer-one");
        display.classList.add("timer-ten");
        console.log("changed");
    } else if (time / 100 == 100) {
        display.classList.remove("timer-ten");
        display.classList.add("timer-hundred");
    }
    display.innerText = (time / 100.0);
}

/* Stops the timer loop */
function stopTime() {
    clearInterval(interval);
    display.innerText = "Your Time: " + display.innerText + " second(s)";
}

/* 
    Tells test that the passed in peg # has been interacted with
*/
function updatePeg(peg) {
    if (!statusArr[peg - 1]) {
        statusArr[peg - 1] = 1;
        pegArr[peg - 1].classList.remove("red-dot");
        pegArr[peg - 1].classList.add("green-dot");
        totalOn += 1;
        events[("peg" + peg + " insertion")] = (time / 100.0);
        checkForHalfway();
    } else {
        statusArr[peg - 1] = 0;
        pegArr[peg - 1].classList.add("red-dot");
        pegArr[peg - 1].classList.remove("green-dot");
        totalOn -= 1;
        events[("peg" + peg + " removal")] = (time / 100.0);
        checkForDone();
    }
}

function checkForHalfway() {
    if (totalOn == 9) {
        allIn = true;
        promptText.classList.remove("big-text");
        promptText.innerText = "Now remove all the pegs!";
    }
}

function checkForDone() {
    if (allIn && totalOn == 0) {
        end();
        console.log(events);
    }
}