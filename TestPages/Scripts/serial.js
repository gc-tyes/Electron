var serialport = require('serialport');
const datarate = 9600;
var log = [];

// This interval is used to check for the user pressing the sensor that starts the test
var awaitingStartInterval;
// this is a global variable that determines if the user has begun the test
var testHasBegun = false;

function startSerial() {
    awaitingStartInterval = setInterval(serialIn, 10);

    const portText = document.getElementById("prompt");
    const mainDiv = document.getElementById("bg");

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
        if (testHasBegun) {
            var pegNum = data.split(":")[0];
            console.log("Peg: " + pegNum);
            updatePeg(parseInt(pegNum));
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
            portText.innerText = "No usb serial port found";
            // mainDiv.classList.remove("test-bg");
            mainDiv.classList.add("test-bg-error");
            // document.getElementById("waitingText").innerHTML = "Please Connect Device"
            return;
        } else {
            clearInterval(awaitingStartInterval);
            console.log("Using port: " + portName + " with data rate " + datarate);
            mainDiv.classList.remove("test-bg-error");
            portText.innerText = ("Place your hand on the well to begin");
            // document.getElementById("waitingText").innerHTML = "Press Sensor To Begin"
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

startSerial();

function beginSerial() {
    testHasBegun = true;
}