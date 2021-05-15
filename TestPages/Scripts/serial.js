var serialport = require('serialport');
const datarate = 9600;
var log = [];
var started = false;
var myPort = null;

// This interval is used to check for the user pressing the sensor that starts the test
var awaitingStartInterval;
// this is a global variable that determines if the user has begun the test
var testHasBegun = false;
var sessionId = new Date().getTime();

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
      if(started) {
        console.log(data);
        log.push(data);
      } else {
        var temp = true;
      }
      if (temp) {
        //showPortClose();
        temp = false;
      }
        // push data to firebase
        // console.log(timestamp)
        // var data = [ raw ]
        // console.log(events);

        // OLD STUFF
        // db.ref(`study/user_${sessionId}`).once('value', function(snapshot) {
        //     pushSampleData(data, snapshot.val(), sessionId)
        // });
        // if (testHasBegun) {
        //     console.log("testbegun")
        //     // var pegNum = data.split(":")[0];
        //     // console.log("Peg: " + pegNum);
        //     // updatePeg(parseInt(pegNum));
        // }

        // TODO: add to array
    }

    function showPortClose() {
        console.log('port closed.');

        // csv stuff

        let csvContent = "data:text/csv;charset=utf-8,";
        // console.log(log);
        // log.forEach(function(rowArray) {
        //     console.log(rowArray);
        //     let row = rowArray.join(",");
        //     csvContent += row + "\r\n";
        // });
        let row = log.join();
        csvContent += row + "\r\n";

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    }

    function showError(error) {
        console.log('Serial port error: ' + error);
    }

    async function serialIn() {
        var portName = await getPort();
        var temp = started;
        startRecording();

        if (portName == "") {
            portText.innerText = "No usb serial port found. Recording should NOT be started";
            // mainDiv.classList.remove("test-bg");
            mainDiv.classList.add("test-bg-error");
            // document.getElementById("waitingText").innerHTML = "Please Connect Device"
            return;
        } else {
            clearInterval(awaitingStartInterval);
            console.log("Using port: " + portName + " with data rate " + datarate);
            mainDiv.classList.remove("test-bg-error");
            // portText.innerText = ("Place your hand on the well to begin");
            // document.getElementById("waitingText").innerHTML = "Press Sensor To Begin"
        }
        myPort = new serialport(portName, datarate);
        var Readline = serialport.parsers.Readline; // make instance of Readline parser
        var parser = new Readline(); // make a new parser to read ASCII line
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
    console.log("test started");
    readSerialData(data);
}

function startRecording() {
    if (!started) {
        console.log("test started");
        started = true;
        document.getElementById("finesseButton").innerHTML = "STOP Recording";
    } else {
        started = false;
        document.getElementById("finesseButton").innerHTML = "START Recording";
    }
}
