
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

  var gameManager = new GameManager(4, VoiceInputManager, HTMLActuator, LocalStorageManager);

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
    }, 500));
  }, 500);


  recognition.onresult = function(event){

    // delve into words detected results & get the latest
    // total results detected
    // console.log(event.results);
    var resultsLength = event.results.length;
    // get length of latest results
    var resultArrayLength = event.results[resultsLength-1].length;
    // // // get last word detected
    if (event.results[resultsLength-1][resultArrayLength-1].confidence > 0.5) {
      var word = event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ')[event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ').length-1];
      console.log(word + " --- " + event.results[resultsLength-1][resultArrayLength-1].confidence);
      if (word == "dawn" || word == "don" || word == "dan" || word == "dont" || word == "now" || word == "dial" || word == "don't" || word == "dump") word = "down";
      if (word == "op" || word == "app" || word == "pup") word = "up";
      if (word == "rice" || word == "write" || word == "writes" || word == "rights" || word == "rite" || word == "bright") word = "right";
      if (word == "love" || word == "laugh") word = "left";
      if (word == 'up' || word == 'down' || word == 'left' || word == 'right') {
        performMove(word);
      }
    }

  }


  // speech error handling
  recognition.onerror = function(event){
    console.log('error?');
    console.log(event);
  }


  setTimeout(function() {

    var gameDict = {
      'cells': [
        [null, null, null, 4],
        [null, 2, null, null],
        [null, null, 8, null],
        [null, 2, null, 4]
      ],
      'score': 100,
      'over': false,
      'won': false,
      'terminated': false,
      'lastMoveDir': 1,
      'lastRandomTile': {'x': 0, 'y': 2, 'value': 2}
    };
    gameManager.forceUpdate(gameDict);

    gameDict = gameManager.toAPIObject();
    setTimeout(function() {
      gameManager.forceUpdate(gameDict);
    }, 2000);
  }, 2000);

  var performMove = function(dir) {
    console.log("move " + dir);
    if (dir == "up") {
      gameManager.moveUp();
    } else if (dir == "down") {
      gameManager.moveDown();
    } else if (dir == "left") {
      gameManager.moveLeft();
    } else if (dir == "right") {
      gameManager.moveRight();
    }
  };
});


