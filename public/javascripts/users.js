var firebase = new Firebase("https://fbhack.firebaseio.com"); // firebase ref
// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
var shouldPickUpCommand = true;
// set params
recognition.continuous = true;
recognition.interimResults = true;
recognition.start();

var started = true;
setInterval(function(){
    if (!started) {
      recognition.start();
      started = true;
    }
}, 500);
setTimeout(function() {
    setInterval((function(){
      recognition.stop();
      started = false;
    }, 600));
}, 600);


recognition.onresult = function(event){

    // delve into words detected results & get the latest
    // total results detected
    // console.log(event.results);
    var resultsLength = event.results.length;
    // get length of latest results
    var resultArrayLength = event.results[resultsLength-1].length;
    // // // get last word detected
    console.log(word + " --- " + event.results[resultsLength-1][resultArrayLength-1].confidence);
    if (event.results[resultsLength-1][resultArrayLength-1].confidence > 0.5) {
      var word = event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ')[event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ').length-1];

      if (word == "dawn" || word == "don" || word == "dan" || word == "dont" || word == "now" || word == "dial" || word == "don't" || word == "dump") word = "down";
      if (word == "op" || word == "app" || word == "pup") word = "up";
      if (word == "rice" || word == "write" || word == "writes" || word == "rights" || word == "rite" || word == "bright") word = "right";
      if (word == "love" || word == "laugh") word = "left";
      if (word == 'up' || word == 'down' || word == 'left' || word == 'right') {
        // pushing the command to the server
        firebase.child("commands").push(word);
        console.log(word + " --- " + event.results[resultsLength-1][resultArrayLength-1].confidence);
      }
    }
}

// console.log("AK");
// speech error handling
recognition.onerror = function(event){
    console.log('error?');
    console.log(event);
}

// listen for changes and use the forceUpdate function on GameManage
firebase.child("gameStates").on("value", function(snapshot){
    GameManager.prototype.forceUpdate(snapshot.val);
  }, function (errorObject){
    console.log("failed to get new gameState: " + errorObject.code);
});
