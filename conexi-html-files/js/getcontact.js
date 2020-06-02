// Initialize Firebase
// The copied and pasted code from the app page
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDJ3aem6_QfiasT1NLr4ZQhiHpBL6hmYIs",
    authDomain: "cheapdrive-e23d8.firebaseapp.com",
    databaseURL: "https://cheapdrive-e23d8.firebaseio.com/",
    projectId: "cheapdrive-e23d8",
    storageBucket: "cheapdrive-e23d8.appspot.com",
    messagingSenderId: "816831106715",
    appId: "1:816831106715:web:879056942248b0f2ec803e",
    measurementId: "G-P636VZKVLD"
};

firebase.initializeApp(firebaseConfig);

// references the database
var database = firebase.database();
document.getElementById("getmessages").addEventListener("click", update);

function update() {
    database.ref('messages').then(function (Snapshot) {

        // console.log the value of snapshot
        console.log(childSnapshot.val());

        // change the html associated with the number.
        var name = Snapshot.val().name;
        var phone = Snapshot.val().phone;
        var mail = Snapshot.val().mail;
        var subject = Snapshot.val().subject;
        var message = Snapshot.val().message;
        

        console.log(name);
        console.log(phone);
        console.log(mail);
        console.log(subject);
        console.log(message);
       


        // update the clickCounter variable with data from the database.
        $("#messages > tbody").append("<tr><td>" + name + "</td><td>" + phone + "</td><td>" +
            mail + "</td><td>" + subject + "</td><td>" + message + "</td><tr>");
    });

}



