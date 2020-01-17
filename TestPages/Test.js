/* get my html elements that I'll be editing
    1. The peg display board that shows the status of each peg
    2. Finesse button
    3. Finesse button 2
    4. Prompt Text, what tells the user what to do
    5. Return home button, displayed after test is completed
*/
var pegDisplay = document.getElementById("pegs");
var finesseButton = document.getElementById("finesseButton");
var finesseButton2 = document.getElementById("finesseButton2");
var promptText = document.getElementById("prompt");
var homeButton = document.getElementById("returnHomeButton");

/*
    called when user places hand on force sensor to get the test ready, test starts once their hand is off
*/
function goToReadyPhase() {
    // in my css I use the class "gone" to hide any elements
    finesseButton.classList.add("gone");
    finesseButton2.classList.remove("gone");

    // Change prompt text to tell them how to start the test
    promptText.innerText = "Lift your hand from the well to begin the test";
}

/* 
    starts the timer, hides html elements that aren't displayed during the test, "unhides" elements used for the test
*/
function start() {
    pegDisplay.classList.remove("gone");
    finesseButton2.classList.add("gone");
    promptText.classList.add("big-text");
    promptText.innerText = "Go!";
    startTimer();
}

/*
    stops timer, displays final time to user
*/
function end() {
    stopTime();
    promptText.innerText = "Test Complete";
    pegDisplay.classList.add("gone");
    homeButton.classList.remove("gone");
}

/*
    brings user back to home screen
*/
function goToHome() {
    document.location.href = "./TestMain.html"
}