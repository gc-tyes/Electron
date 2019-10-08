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

function start() {
    const portText = document.getElementById("portText");
    const startBtn = document.getElementById("startBtn");
    const pegs = document.getElementById("pegs");
    const prompt = document.getElementById("prompt");
    const pushDataBtn = document.getElementById("pushDataBtn");
    var pegArr = ["This is so the peg number aligns with its index"]
    for (var i = 1; i <= 9; i++) {
        pegArr.push(document.getElementById("peg" + i))
    }
    console.log(pegArr)


    startBtn.classList.add("gone");
    prompt.classList.add("gone");
    pushDataBtn.classList.remove("gone");
    pegs.classList.remove("gone");

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
            portText.innerText = "No usb serial port found"
            return;
        } else {
            console.log("Using port: " + portName + " with data rate " + datarate);
            portText.innerText = ("Using port: " + portName + " with data rate " + datarate)
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

function pushData() {
    db.ref("Data").update({
        log: log
    })
    console.log("successfully pushed " + log);
}