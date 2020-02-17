// HTML Elements
var canvasR = document.getElementById("myCanvRem");
var ctxR = canvasR.getContext("2d");
var keyR = document.getElementById("keyRem");
var keytxR = keyR.getContext("2d");
var graphR = document.getElementById("myChartRem");
var gtxR = graphR.getContext("2d");

// Data variables
var removalOrder = [];
var removalTimes = [];
var betweenRemTimes = [];
var colorsR = ["#70C042", "#70C042", "#70C042", "#FFF104", "#FFF104", "#FFF104", "#00ACAC", "#00ACAC", "#00ACAC"];
var coordinatesR = {"peg9": [100, 100], "peg8": [250, 100], "peg7": [400, 100],
                    "peg6": [100, 250], "peg5": [250, 250], "peg4": [400, 250],
                    "peg3": [100, 400], "peg2": [250, 400], "peg1": [400, 400]}
var pegNamesAndTimesR = {};

// Graph
var myChartR = new Chart(gtxR, {
    type: 'bar',
    data: {
        labels: ['First Peg', 'Second Peg', 'Third Peg', 'Fourth Peg', 'Fifth Peg', 'Sixth Peg', 'Seventh Peg', 'Eigth Peg', 'Ninth Peg'],
        datasets: [{
            label: 'Seconds',
            data: [],
            backgroundColor: [
                '#70C042',
                '#70C042',
                '#70C042',
                '#FFF104',
                '#FFF104',
                '#FFF104',
                '#00ACAC',
                '#00ACAC',
                '#00ACAC'
            ],
            borderColor: [
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#000000'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Time Between Peg Removals',
            fontSize: 30
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

db.ref("MostRecent/results").once('value', function(snapshot) {
    readDataR(snapshot.val());
});

async function readDataR(data) {
    removalOrder = data["peg-removal-orders"];
    removalTimes = data["peg-removal-times"];
    betweenRemTimes = data["peg-removal-times-between"];
    console.log(betweenRemTimes);
    console.log(data);
    console.log(removalOrder);
    console.log(removalTimes);
    await(makeDictR())
    getBetweenTimesR();
    drawMapR();
    drawKeyR();
}

function makeDictR() {
    removalTimes.forEach(element => {
        pegNamesAndTimesR[element[1].split(" ")[0]] = element[0];
    });
    console.log(pegNamesAndTimesR);
}

function getBetweenTimesR() {
    myChartR["config"]["data"]["datasets"][0]["data"] = betweenRemTimes;
    myChartR.update();
}

function drawMapR() {
    ctxR.font = "24px Arial";
    for (var i = 0; i < removalOrder.length; i++) {
        var peg = removalOrder[i];
        var coords = coordinatesR[peg];
        var color = colorsR[i];
        var text = pegNamesAndTimesR[peg];
        ctxR.beginPath();
        ctxR.arc(coords[0], coords[1], 50, 0, 2 * Math.PI, false);
        ctxR.fillStyle = color;
        ctxR.closePath();
        ctxR.fill();
        ctxR.stroke();

        // draw connecting line
        if (i < removalOrder.length - 1) {
            var nextCoord = coordinatesR[removalOrder[i + 1]];
            ctxR.beginPath();
            ctxR.moveTo(coords[0],coords[1]);
            ctxR.lineTo(nextCoord[0],nextCoord[1]);
            ctxR.closePath();
            ctxR.stroke();
        }

        ctxR.fillStyle = 'black';
        ctxR.fillText(text, coords[0] - 25, coords[1] - 55);
    }
}

function drawKeyR() {
    var x = 50;
    var y = 50;
    for (var i = 0; i < colorsR.length; i++) {
        keytxR.beginPath();
        keytxR.arc(x, y, 20, 0, 2 * Math.PI, false);
        keytxR.fillStyle = colorsR[i];
        keytxR.closePath();
        keytxR.fill();
        keytxR.stroke();
        x += 50;
    }
    keytxR.font = "18px Arial";
    keytxR.fillStyle = 'black';
    keytxR.fillText("First", 35, 90);
    keytxR.fillText("Last", 435, 90);
    console.log("success")
}

