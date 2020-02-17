//HTML elements
var stacks = document.getElementById("stacked");
var stackx = stacks.getContext("2d");
var totalTimeText = document.getElementById("totalTime");
var avgRemText = document.getElementById("avgRem");
var avgPlacText = document.getElementById("avgPlac");

// Data variables
var totalTime;
var averagePlacementTime;
var averageRemovalTime;
var timeToPlace;
var timeToRemove;

var stackedBar = new Chart(stackx, {
    type: 'bar',
    data: {
        labels: ["Your Results","Average"],
        datasets: [{
            label: "Placement Time",
            data: [1,5],
            backgroundColor: [
                '#70C042',
                '#70C042'
            ],
            borderColor: [
                '#000000',
                '#000000'
            ],
            borderWidth: 1,
            stack: 1
        },{
            label: 'RemovalTime',
            data: [2,5.5],
            backgroundColor: [
                '#00ACAC',
                '#00ACAC'
            ],
            borderColor: [
                '#000000',
                '#000000'
            ],
            borderWidth: 1,
            stack: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    suggestedMax: 20
                }
            }]
        }
    }
});
stackedBar.update();

db.ref("MostRecent/results").once('value', function(snapshot) {
    getNumbers(snapshot.val());
});

function getNumbers(data) {
    totalTime = data["total-time"];
    averagePlacementTime = data["average-time-between-placements"];
    averageRemovalTime = data["average-time-between-removals"];
    timeToPlace = data["peg-placement-times"][8][0];
    timeToRemove = totalTime - timeToPlace;
    displayData();
}

function displayData() {
    totalTimeText.innerText += " " + Math.round(totalTime * 100) / 100 + "s";
    avgPlacText.innerText += " " + Math.round(averagePlacementTime * 100) / 100 + "s";
    avgRemText.innerText += " " + Math.round(averageRemovalTime * 100) / 100 + "s";
    stackedBar["config"]["data"]["datasets"][0]["data"] = [timeToPlace,7];
    stackedBar["config"]["data"]["datasets"][1]["data"] = [timeToRemove,7];
    stackedBar.update();
}