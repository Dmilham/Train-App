
$( document ).ready(function() {

  // Initialize Firebase

  var config = {
  	apiKey: "AIzaSyCqr5LhcwBal36rbZs6IW1mP3M39jlWc3A",
  	authDomain: "train-app-9e55d.firebaseapp.com",
  	databaseURL: "https://train-app-9e55d.firebaseio.com",
  	storageBucket: "train-app-9e55d.appspot.com",
  	messagingSenderId: "126052170047"
  };

  firebase.initializeApp(config);

// Firebase database reference

var trainInfo = firebase.database ();


// Create an add train button with on click action

$("#addTrainBtn").on("click", function(){

//  Collect input data

var trainName = $("#trainNameInput").val().trim();
var destination = $("#destinationInput").val().trim();
var firstTime = $("#firstTrainInput").val().trim();
var firstTrainMoment = moment(firstTime, "HH:mm").format('HH:mm');
var frequency = $("#frequencyInput").val().trim();

console.log(firstTrainMoment);
// New object from input fields

var newTrain = {

	name:  trainName,
	destination: destination,
	firstTrain: firstTrainMoment,
	frequency: frequency,
}

// Push object to Firebase database

trainInfo.ref().push(newTrain);

// Alert for sucess

alert("Train added to list");

// Log for safety

console.log(newTrain.name);
console.log(newTrain.destination); 
console.log(newtrain.firstTrain);
console.log(newTrain.frequency);

// Clear form input fields

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false;

});

// Adds newTrain to Firebase database

trainInfo.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

// Creates variables for snaphot info

	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;

// Arrival minutes and Modulus

	var timeDiff = moment().diff(moment.unix(trainFirst), "minutes");
	var remainTime = moment().diff(moment.unix(trainFirst), "minutes") % trainFreq ;
	var trainMins = trainFreq - remainTime;

// Calculate the arrival time

	var arrivalTime = moment().add(trainMins, "m").format("HH:mm"); 
	console.log(trainMins);
	console.log(arrivalTime);
	console.log(moment().format("HH:mm"));


	
// Append each train's info into the table

$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + arrivalTime +"</td><td>"+ trainMins + "</td></tr>");

});

});


