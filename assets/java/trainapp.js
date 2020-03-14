var currentTime = moment();
console.log("This is my time " + moment(currentTime).format("HH:mm a"));
var config = {
    apiKey: "AIzaSyAdce8DQPobszLvEP-jjpildTG5uNqoVLE",
    authDomain: "train-homework-dfb97.firebaseapp.com",
    databaseURL: "https://train-homework-dfb97.firebaseio.com",
    projectId: "train-homework-dfb97",
    storageBucket: "train-homework-dfb97.appspot.com",
    messagingSenderId: "740724443981",
    appId: "1:740724443981:web:a791501e82fb41efd9c504",
    measurementId: "G-BMH1474BB2"
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var dest = "";
var time = "";
var frequency = "";

$("#add-train").on("click", function (event) {
    event.preventDefault();
    console.log("you've clicked ");
    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    // time = moment($("#time-input").val().trim(), 'HH:mm a').format("X");
    time = $("#time-input").val().trim();
    frequency = $("#freq-input").val().trim();
    database.ref().push({
        name: name,
        dest: dest,
        time: time.valueOf(),
        frequency: frequency
    });
    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(frequency);
});

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().time);

});