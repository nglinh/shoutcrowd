// var firebase = new Firebase('https://fbhack.firebaseio.com'); // firebase ref

var socket = io.connect('http://128.199.111.123:3000');

// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
var shouldPickUpCommand = true;
// set params
recognition.continuous = true;
recognition.interimResults = true;
recognition.start();

// var started = true;
// setInterval(function(){
//     if (!started) {
//       recognition.start();
//       started = true;
//     }
// }, 400);
// setTimeout(function() {
//     setInterval((function(){
//       recognition.stop();
//       started = false;
//     }, 600));
// }, 600);

var batchCommands = [];


recognition.onresult = function(event){
    // delve into words detected results & get the latest
    // total results detected
    // console.log(event.results);
    var resultsLength = event.results.length;
    // get length of latest results
    var resultArrayLength = event.results[resultsLength-1].length;
    // // // get last word detected
    if (event.results[resultsLength-1][resultArrayLength-1].confidence < 0.2) {
      var word = event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ')[event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ').length-1];
      if (["dawn", "don", "dan", "dont", "now", "dial", "don't", "dump"].indexOf(word) != -1) word = "down";
      else if (["op", "app", "pup"].indexOf(word) != -1) word = "up";
      else if (["rice", "write", "writes", "rights", "rite", "bright"].indexOf(word) != -1) word = "right";
      else if (["love", "laugh"].indexOf(word) != -1) word = "left";
      if (["up", "down", "right", "left"].indexOf(word) != -1) {
        console.log(word + " --- " + event.results[resultsLength-1][resultArrayLength-1].confidence);
        // if (batchCommands.length < 7 && event.results[resultsLength-1][resultArrayLength-1].confidence > 0.7)
        batchCommands.push(word);
      }
    }
}
var commandCnt = 0;

var compressCommand = function() {
  if (batchCommands.length == commandCnt) {
    batchCommands = [];
    commandCnt = 0;
    return;
  }
  batchCommands = batchCommands.sort();
  var i;
  var maxCnt = 0;
  var cnt = 0;
  var maxCommand = batchCommands[0];
  for (var i = 0; i < batchCommands.length; i++){
    if (i == 0 || batchCommands[i] != batchCommands[i-1]){
      cnt = 1;
    }else {
      cnt++;
    }
    if (cnt > maxCnt){
      maxCnt = cnt;
      maxCommand = batchCommands[i];
    }
  }
  batchCommands = [];
  commandCnt = batchCommands.length;

  //push to the server
  // firebase.child("commands").push(maxCommand);
  // console.log(maxCommand);
  socket.emit("clientCommand", {command: maxCommand, timestamp: Date.now()});

  return maxCommand;
}

setInterval(compressCommand, 1000);

// console.log("AK");
// speech error handling
recognition.onerror = function(event){
    console.log('error?');
    console.log(event);
}


window.requestAnimationFrame(function () {

    window.gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);

// listen for changes and use the forceUpdate function on GameManage
    // firebase.child("gameStates").on("value", function(snapshot){
    //     console.log(snapshot.val());
    //     window.gameManager.forceUpdate(snapshot.val());
    //   }, function (errorObject){
    //     console.log("failed to get new gameState: " + errorObject.code);
    // });

    socket.on("gameStates", function(data){
      console.log(data);
      window.gameManager.forceUpdate(data.state);
    });

    // socket.on("serverCommand", function(data){
    //   console.log(data);
    // });

});
