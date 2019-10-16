var time = 0;
var count = 3;
var display = document.getElementById("timer");
var startBtn = document.getElementById("startTimerBtn");
const pushDataBtn = document.getElementById("pushDataBtn");
var interval = null;

function setupTimer() {
    display.classList.remove("gone");
    startBtn.classList.remove("gone");
}

function startTimer() {
    interval = setInterval(updateTime, 10);
    startBtn.classList.add("gone");
    display.classList.remove("timer-countdown");
    pushDataBtn.classList.remove("gone");
}

function startCountdown() {
    display.classList.add("timer-countdown");
    display.innerText = count;
    interval = setInterval(countDown, 1000);
}

function countDown() {
    count--;
    display.innerText = count;  
    if (count == 0) {
        display.innerText = "Go!"
        clearInterval(interval);
        startTimer();
    }  
}

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

function stopTime() {
    clearInterval(interval);
    if (display.innerText.length() == 3) {
        display.innerText = display.innerText + "0"
    }
}