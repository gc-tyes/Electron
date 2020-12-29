// firebase configuration
var config = {
    apiKey: "AIzaSyCHhX5PmpsmLQhY95HmLnm2VYc0m81mos0",
    authDomain: "tyes-web-478b4.firebaseapp.com",
    databaseURL: "https://tyes-web-478b4.firebaseio.com",
    projectId: "tyes-web-478b4",
    storageBucket: "tyes-web-478b4.appspot.com",
    messagingSenderId: "496916704132"
};
firebase.initializeApp(config);
var db = firebase.database();

// timer variables
var time = 0;
var count = 3;
var lastEvent = 0;

// HTML element variables
var display = document.getElementById("timer");
const pushDataBtn = document.getElementById("pushDataBtn");
var promptText = document.getElementById("prompt");
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

// variables that keep track of state of test
var statusArr = [0,0,0,0,0,0,0,0,0];
var totalOn = 0;
var allIn = false;
var interval = null;

// results data
var placementBetweenTimes = [];
var removalBetweenTimes = [];
var placementTimes = [];
var removalTimes = [];
var events = {};

/* Starts the actual test timer */
function startTimer() {
    display.classList.remove("gone");
    interval = setInterval(updateTime, 10);
    //pushDataBtn.classList.remove("gone");
}

/* 
    Loops 100 times per second to update time by 0.01, then display the proper time.
    Also changes positioning of time label depending on size of the number (1 -> 10 -> 100) 
*/
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
    console.log("updatePeg called");
    console.log(pegArr);
    if (!statusArr[peg - 1] && !allIn) {
        statusArr[peg - 1] = 1;
        pegArr[peg - 1].classList.remove("red-dot");
        pegArr[peg - 1].classList.add("green-dot");
        totalOn += 1;
        events[("peg" + peg + " insertion")] = (time / 100.0);
        events[("peg" + peg + " between insertion")] = (time / 100.0) - lastEvent;
        lastEvent = (time / 100.0);
        checkForHalfway();
    } else if (statusArr[peg - 1]) {
        statusArr[peg - 1] = 0;
        pegArr[peg - 1].classList.add("red-dot");
        pegArr[peg - 1].classList.remove("green-dot");
        totalOn -= 1;
        events[("peg" + peg + " removal")] = (time / 100.0);
        events[("peg" + peg + " between removal")] = (time / 100.0) - lastEvent;
        lastEvent = (time / 100.0);
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

async function checkForDone() {
    if (allIn && totalOn == 0) {
        // ENDS TEST
        end();
        console.log(events);
        await(putDataInArr());
        getDataAnalytics();
    }
}

async function putDataInArr() {
    Object.keys(events).forEach( event => {
        if (event.includes("between insertion")) {
            placementBetweenTimes.push(events[event]);
        } else if (event.includes("between removal")) {
            removalBetweenTimes.push(events[event]);
        } else if (event.includes("insert")) {
            placementTimes.push([events[event], event]);
        } else {
            removalTimes.push([events[event], event]);
        }
    })
}

function getDataAnalytics() {
    var data = {};
    data["total-time"] = time / 100;
    data["peg-placement-times"] = placementTimes;
    data["peg-removal-times"] = removalTimes;
    data["peg-placement-orders"] = getOrder(placementTimes);
    data["peg-removal-orders"] = getOrder(removalTimes);
    data["peg-placement-times-between"] = placementBetweenTimes;
    data["peg-removal-times-between"] = removalBetweenTimes;
    data["average-time-between-placements"] = getAvg(placementBetweenTimes);
    data["average-time-between-removals"] = getAvg(removalBetweenTimes);
    db.ref("Tests/results").once('value', function(snapshot) {
        pushData(data, snapshot.val())
    });
}

function pushData(data, list) {
    console.log("push data called");
    if (list) {
        list.push(data);
        db.ref("Tests").update({
            results: list
        })
    } else {
        db.ref("Tests").update({
            results: [data]
        })
    }
    db.ref("MostRecent").update({
        results: data
    })
    console.log(data);
}

function pushSampleData(data, list, sessionId) {
    // console.log("push data called");
    var timestamp = new Date().getTime();
    
    if (list) {
        // console.log(list)
        // list.push(data);
        db.ref(`study/user_${sessionId}/${timestamp}`).update({
            results: data
        })
    } else {
        db.ref(`study/user_${sessionId}/${timestamp}`).update({
            results: [data]
        })
    }
    // db.ref("MostRecent").update({
    //     results: data
    // })
    // console.log(data);
}