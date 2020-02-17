var Chart = require('chart.js');

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

// HTML Elements
var canvas = document.getElementById("myCanv");
var ctx = canvas.getContext("2d");
var key = document.getElementById("key");
var keytx = key.getContext("2d");
var graph = document.getElementById("myChart");
var gtx = graph.getContext("2d");

// Data variables
var placementOrder = [];
var placementTimes = [];
var betweenTimes = [];
var colors = ["#70C042", "#70C042", "#70C042", "#FFF104", "#FFF104", "#FFF104", "#00ACAC", "#00ACAC", "#00ACAC"];
var coordinates = {"peg9": [100, 100], "peg8": [250, 100], "peg7": [400, 100],
                    "peg6": [100, 250], "peg5": [250, 250], "peg4": [400, 250],
                    "peg3": [100, 400], "peg2": [250, 400], "peg1": [400, 400]}
var pegNamesAndTimes = {};

// Graph
var myChart = new Chart(gtx, {
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
            text: 'Time Between Peg Placements',
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
    readData(snapshot.val());
});

async function readData(data) {
    placementOrder = data["peg-placement-orders"];
    placementTimes = data["peg-placement-times"];
    // console.log(data);
    // console.log(placementOrder);
    // console.log(placementTimes);
    await(makeDict())
    getBetweenTimes();
    drawMap();
    drawKey();
}

function makeDict() {
    placementTimes.forEach(element => {
        pegNamesAndTimes[element[1].split(" ")[0]] = element[0];
    });
    console.log(pegNamesAndTimes);
}

function getBetweenTimes() {
    betweenTimes.push(pegNamesAndTimes[placementOrder[0]]);
    for (var i = 1; i < placementOrder.length; i++) {
        betweenTimes.push(pegNamesAndTimes[placementOrder[i]] - pegNamesAndTimes[placementOrder[i - 1]])
    }
    myChart["config"]["data"]["datasets"][0]["data"] = betweenTimes;
    myChart.update();
}

function drawMap() {
    ctx.font = "24px Arial";
    for (var i = 0; i < placementOrder.length; i++) {
        var peg = placementOrder[i];
        var coords = coordinates[peg];
        var color = colors[i];
        var text = pegNamesAndTimes[peg];
        ctx.beginPath();
        ctx.arc(coords[0], coords[1], 50, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // draw connecting line
        if (i < placementOrder.length - 1) {
            var nextCoord = coordinates[placementOrder[i + 1]];
            ctx.beginPath();
            ctx.moveTo(coords[0],coords[1]);
            ctx.lineTo(nextCoord[0],nextCoord[1]);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.fillStyle = 'black';
        ctx.fillText(text, coords[0] - 25, coords[1] - 55);
    }
}

function drawKey() {
    var x = 50;
    var y = 50;
    for (var i = 0; i < colors.length; i++) {
        keytx.beginPath();
        keytx.arc(x, y, 20, 0, 2 * Math.PI, false);
        keytx.fillStyle = colors[i];
        keytx.closePath();
        keytx.fill();
        keytx.stroke();
        x += 50;
    }
    keytx.font = "18px Arial";
    keytx.fillStyle = 'black';
    keytx.fillText("First", 35, 90);
    keytx.fillText("Last", 435, 90);
}

