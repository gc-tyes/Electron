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

var Chart = require('chart.js');

// Data I want
var numberOfTests = 0;
var avgTotalTime = 0;
var avgPlacementTime = 0;
var avgRemovalTime = 0;
var avgTimeBetweenPlacements = 0;
var avgTimeBetweenRemovals = 0;
var avgPegInsertion = {"first": 0,"second": 0,"third": 0,"fourth": 0,"fifth": 0,"sixth": 0,"seventh": 0,"eighth": 0,"ninth": 0};
var avgPegRemoval = {"first": 0,"second": 0,"third": 0,"fourth": 0,"fifth": 0,"sixth": 0,"seventh": 0,"eighth": 0,"ninth": 0}

// HTML elements
var numTests = document.getElementById("numTests");
var avgTime = document.getElementById("avgTime");
var avgPlace = document.getElementById("avgPlace");
var avgRem = document.getElementById("avgRem");
var avgBetPlace = document.getElementById("avgBetPlace");
var avgBetRem = document.getElementById("avgBetRem");
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['First Peg', 'Second Peg', 'Third Peg', 'Fourth Peg', 'Fifth Peg', 'Sixth Peg', 'Seventh Peg', 'Eigth Peg', 'Ninth Peg'],
        datasets: [{
            label: 'Seconds',
            data: [],
            backgroundColor: [
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)',
                'rgba(56, 177, 189, 0.2)'
            ],
            borderColor: [
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)',
                'rgba(28, 105, 113, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Average Time Per Peg',
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


db.ref("Tests/results").once('value', function(snapshot) {
    readData(snapshot.val())
});

function readData(previousData) {
    console.log(previousData);
    numberOfTests = previousData.length;
    previousData.forEach(element => {
        avgTotalTime += element["total-time"]
        avgPlacementTime += element["average-placement-time"];
        avgRemovalTime += element["average-removal-time"];
        avgTimeBetweenPlacements += element["average-time-between-placements"];
        avgTimeBetweenRemovals += element["average-time-between-removals"];
        addAveragePlacements(element["peg-placement-times"]);
        addAverageRemovals(element["peg-removal-times"]);
    })
    numTests.innerText += (" " + numberOfTests);
    avgTime.innerText += (" " + Math.round(100 * (avgTotalTime / numberOfTests)) / 100.0 + "s");
    avgPlace.innerText += (" " + Math.round(100 * avgPlacementTime / numberOfTests) / 100.0 + "s");
    avgRem.innerText += (" " + Math.round(100 * (avgRemovalTime / numberOfTests)) / 100.0 + "s");
    avgBetPlace.innerText += (" " + Math.round(100 * (avgTimeBetweenPlacements / numberOfTests)) / 100.0 + "s");
    avgBetRem.innerText += (" " + Math.round(100 * (avgTimeBetweenRemovals / numberOfTests)) / 100.0 + "s");
    normalize();
}

function addAveragePlacements(dict) {
    Object.keys(dict).forEach(name => {
        avgPegInsertion[name] += dict[name];
    })
    console.log(avgPegInsertion);
}

function addAverageRemovals(dict) {
    Object.keys(dict).forEach(name => {
        avgPegRemoval[name] += dict[name];
    })
}

function normalize() {
    var data = []
    console.log(avgPegInsertion);
    Object.keys(avgPegInsertion).forEach(name => {
        data.push(avgPegInsertion[name] /= numberOfTests);
    })
    console.log(data);
        
    myChart["config"]["data"]["datasets"][0]["data"] = data;
    myChart.update();
}

function goBack() {
    document.location.href = "./TestMain.html"
}