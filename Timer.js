var time = 0;
var count = 3;
var display = document.getElementById("timer");
var startBtn = document.getElementById("startTimerBtn");
const pushDataBtn = document.getElementById("pushDataBtn");
var interval = null;

/* Called when you first press start, makes time and button visible */
function setupTimer() {
    display.classList.remove("gone");
    startBtn.classList.remove("gone");
}

/* Starts the actual test timer */
function startTimer() {
    interval = setInterval(updateTime, 10);
    startBtn.classList.add("gone");
    display.classList.remove("timer-countdown");
    pushDataBtn.classList.remove("gone");
}

/* Called when you first press begin test, kicks off the 3, 2, 1 counter */
function startCountdown() {
    display.classList.add("timer-countdown");
    display.innerText = count;
    interval = setInterval(countDown, 1000);
}

/* Loops once per second, performs the actual countdown then calls startTimer once it finishes */
function countDown() {
    count--;
    display.innerText = count;  
    if (count == 0) {
        display.innerText = "Go!"
        clearInterval(interval);
        startTimer();
    }  
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
    if (display.innerText.length() == 3) {
        display.innerText = display.innerText + "0"
    }
}