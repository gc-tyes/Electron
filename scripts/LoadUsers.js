var config = {
    apiKey: "AIzaSyCHhX5PmpsmLQhY95HmLnm2VYc0m81mos0",
    authDomain: "tyes-web-478b4.firebaseapp.com",
    databaseURL: "https://tyes-web-478b4.firebaseio.com",
    projectId: "tyes-web-478b4",
    storageBucket: "tyes-web-478b4.appspot.com",
    messagingSenderId: "496916704132",
    appId: "1:496916704132:web:c313edfb1c7b1a41a40bd1"
};
// Initialize Firebase
firebase.initializeApp(config);
var db = firebase.database();
var data = [];

const interval = setInterval(getData, 10);

db.ref("Users").on('value', function(snapshot) {
    data = snapshot.val();
});

function getData() {
    if (data.length != 0) {
        clearInterval(interval);
        setupDisplay();
    }
}

function setupDisplay() {
    const usersDiv = document.getElementById("patients-list");
    const fragment = document.getElementById("user");
    for (var i = 0; i < Object.keys(data).length; i++) { 
        const instance = document.importNode(fragment.content, true);
        instance.querySelector('.name').innerHTML = data[i][0];
        var thing = ["0","1","2","3","4","5","6","7","8","9"];
        var id = "#";
        for (var x = 0; x < 5; x++) {
            id += thing[Math.floor(Math.random() * 10)];
        }
        instance.querySelector('.patient-id').innerHTML = id;
        usersDiv.appendChild(instance);
    }
}

function changePage(word) {
    var patientName = word.getElementsByTagName("*")[0].innerHTML
    sessionStorage.currentPatient = patientName
    document.location.href = "../pages/ViewPatient.html"
}