
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

// Firebase database

var trainInfo = firebase.database ();

//  Collects input data

var trainName = $("#trainNameInput").val().trim();
var destination = $("#destinationInput").val().trim();
var firstTrainMoment = moment($("#firstTrainInput").val().trim());
var frequency = $("#frequencyInput").val().trim();

// Add a train button

$("#addTrainBtn").on("click", function(){

// New object from fields

var newTrain = {

	name:  trainName,
	destination: destination,
	firstTrain: firstTrainMoment,
	frequency: frequency
}


trainInfo.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination); 
console.log(firstTrainMoment);
console.log(newTrain.frequency)

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");
return false;

});

});
