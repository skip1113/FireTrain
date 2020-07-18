//current time
let currentTime = moment();
// console.log("This is my time " + moment(currentTime).format("hh:mm"));
//Firebase APIKey to store obeject
let config = {
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
//Database 
let database = firebase.database();
var name = "";
var dest = "";
var time = "";
var frequency = "";
//event for submit button
$("#add-train").on("click", function (event) {
    event.preventDefault();
    console.log("you've clicked ");
    //takes the value of what's typed in the form box
    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = moment($("#time-input").val().trim(), 'HH:mm');
    // time = $("#time-input").val().trim();
    frequency = $("#freq-input").val().trim();
    //pushes data to firebase
    database.ref().push({
        name: name,
        dest: dest,
        time: time.valueOf(),
        frequency: frequency
    });
    // console.log(name);
    // console.log(dest);
    // console.log(time);
    // console.log(frequency);
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    var tName = childSnapshot.val().name;
    var tDest = childSnapshot.val().dest;
    var tTime = childSnapshot.val().time;
    var tFrequency = childSnapshot.val().frequency;
    console.log(childSnapshot.val());
    console.log(tName);
    console.log(tDest);
    console.log(tTime);
    console.log(tFrequency);
    //First train input to convert 1 year before 
    var firstConverted = moment(time, "HH:mm").subtract(1, "years");
    // console.log("First Converted for first train " + firstConverted);
    //current time
    // var realTime = moment();
    //difference between times
    var diffTime = moment().diff(moment(firstConverted), "minutes");
    console.log("This is the difference in time: " + diffTime);
    //Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("Time apart: " + tRemainder);
    //Minutes untill Train
    var minTillTrain = frequency - tRemainder;
    console.log("Mins until Train: " + minTillTrain);
    //next train
    var nextTrain = moment().add(minTillTrain, "minutes");
    console.log("arrival Time: " + moment(nextTrain).format("hh:mm"));
    var newTrain = nextTrain.format("hh:mm");
    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDest),
        $("<td>").text(tFrequency),
        $("<td>").text(newTrain),
        $("<td>").text(minTillTrain)
    );
    $("#train-table > tbody").append(newRow);
});