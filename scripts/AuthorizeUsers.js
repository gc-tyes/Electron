var config = {
    apiKey: "AIzaSyCHhX5PmpsmLQhY95HmLnm2VYc0m81mos0",
    authDomain: "tyes-web-478b4.firebaseapp.com",
    databaseURL: "https://tyes-web-478b4.firebaseio.com",
    projectId: "tyes-web-478b4",
    storageBucket: "tyes-web-478b4.appspot.com",
    messagingSenderId: "496916704132"
};

// Initialize Firebase
firebase.initializeApp(config);
var db = firebase.database();
var auth = firebase.auth();

// Form Handling
function signUp() {
    console.log("called");
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    auth.createUserWithEmailAndPassword(email, psw);
    console.log("done");

    // todo: add to realtime database. turn this react code to vanilla js

    // this.props.firebase
    //   .doCreateUserWithEmailAndPassword(email, passwordOne)
    //   .then(authUser => {
    //     // Create a user in your Firebase realtime database
    //     return this.props.firebase
    //       .user(authUser.user.uid)
    //       .set({
    //         username,
    //         email,
    //       });
    //   })
}

function logIn() {
    console.log("called");
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    auth.signInWithEmailAndPassword(email, psw);
    console.log("done");
}

// *** Auth API ***

doCreateUserWithEmailAndPassword = (email, password) =>
auth.createUserWithEmailAndPassword(email, password);

doSignInWithEmailAndPassword = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

doSignOut = () => auth.signOut();

doPasswordReset = email => auth.sendPasswordResetEmail(email);

doPasswordUpdate = password =>
auth.currentUser.updatePassword(password);

// *** User API ***

User = uid => db.ref(`Users/${uid}`);

Users = () => db.ref('Users');