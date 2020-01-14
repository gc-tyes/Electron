var serialport = require('serialport');
const datarate = 9600;
var log = [];

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

// This interval is used to check for the user pressing the sensor that starts the test
var awaitingStartInterval;
// this is a global variable that determines if the user has begun the test
var testHasBegun = false;

function start() {
    setupTimer();
    awaitingStartInterval = setInterval(checkForStart, 10);

    const portText = document.getElementById("portText");
    const startBtn = document.getElementById("startBtn");
    const userDisplay = document.getElementById("userDisplay");
    const prompt = document.getElementById("prompt");
    const mainDiv = document.getElementById("mainDiv");
    var pegArr = ["This is so the peg number aligns with its index"]
    for (var i = 1; i <= 9; i++) {
        pegArr.push(document.getElementById("peg" + i))
    }


    startBtn.classList.add("gone");
    prompt.classList.add("gone");
    userDisplay.classList.remove("gone");

    async function getPort() {
        let portName = '';
        await serialport.list(function (err, ports) {
            ports.forEach(function(port) {
                if (port.comName.includes("usbmodem")) {
                    portName = port.comName;
                }
            });
        });
        return portName;
    }

    function showPortOpen() {
        console.log('port open. Data rate: ' + myPort.baudRate);
    }

    function readSerialData(data) {
        console.log(data);
        log.push(data);
        var pegNum = data.split(',')[1];
        var onOff = data.split(',')[2];

        // CHECK FOR IF THE USER HAS TOUCHED THE START SENSOR, THEN UPDATE testHasBegun IF YOU GET THE SIGNAL

        if (onOff == 1) {
            pegArr[pegNum].classList.add('green-dot');
            pegArr[pegNum].classList.remove('red-dot');
        } else {
            pegArr[pegNum].classList.add('red-dot');
            pegArr[pegNum].classList.remove('green-dot');
        }

    }

    function showPortClose() {
        console.log('port closed.');
    }

    function showError(error) {
        console.log('Serial port error: ' + error);
    }

    async function serialIn() {
        var portName = await getPort();

        if (portName == "") {
            console.log("No usb serial port found");
            portText.innerText = "No usb serial port found";
            mainDiv.classList.add("main-div-no-port");
            document.getElementById("waitingText").innerHTML = "Please Connect Device"
            return;
        } else {
            console.log("Using port: " + portName + " with data rate " + datarate);
            mainDiv.classList.remove("main-div-no-port");
            portText.innerText = ("Using port: " + portName + " with data rate " + datarate)
            document.getElementById("waitingText").innerHTML = "Press Sensor To Begin"
        }
        var myPort = new serialport(portName, datarate);
        var Readline = serialport.parsers.Readline; // make instance of Readline parser
        var parser = new Readline(); // make a new parser to read ASCII lines
        myPort.pipe(parser); // pipe the serial stream to the parser
        // myPort.on('open', showPortOpen);
        parser.on('data', readSerialData);
        myPort.on('close', showPortClose);
        myPort.on('error', showError);
    }

    serialIn();
}

function checkForStart() {

}

function pushData() {
    stopTime();
    db.ref("Data").update({
        log: log
    })
    console.log("successfully pushed " + log);
}