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

db.ref("value").update({
    thing: 'yes'
})