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
var db = firebase.database();   // imports realtime database
var auth = firebase.auth();

document.getElementById("signUpBtn").addEventListener("click", function () {
    auth.onAuthStateChanged
})

// Form Handling
async function signUp() {
    console.log("called");
    var email = document.getElementById("exampleInputEmail1").value;
    var psw = document.getElementById("psw").value;
    await auth.createUserWithEmailAndPassword(email, psw);

    await auth.onAuthStateChanged(function (authUser) {
        if (authUser) {
            user(authUser.uid)
                .once('value')
                .then(snapshot => {
                    const dbUser = snapshot.val();
                    console.log(snapshot.val());
                    console.log(authUser.uid);
                    console.log(authUser.email);

                    // merge auth and db user
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    };
                    user(authUser.uid).update({
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    })
                }); 
                console.log("done");
        } else {
            // No user is signed in.
        }
    });

    //     await (authUser => {
    //     console.log("reached");
    //     // vanilla equiv of adding to db
    //     return firebase
    //         .user(authUser.user.uid)
    //         .set({
    //             username,
    //             email,
    //         });
    // })
    
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

user = uid => db.ref(`Users/${uid}`);

users = () => db.ref('Users');