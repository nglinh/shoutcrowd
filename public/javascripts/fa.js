window.requestAnimationFrame(function () {

    window.gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);

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
    }, 400);
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
        if (event.results[resultsLength-1][resultArrayLength-1].confidence > 0.5) {
          var word = event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ')[event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ').length-1];
          if (["dawn", "don", "dan", "dont", "now", "dial", "don't", "dump"].indexOf(word) != -1) word = "down";
          else if (["op", "app", "pup"].indexOf(word) != -1) word = "up";
          else if (["rice", "write", "writes", "rights", "rite", "bright"].indexOf(word) != -1) word = "right";
          else if (["love", "laugh"].indexOf(word) != -1) word = "left";
          if (["up", "down", "right", "left"].indexOf(word) != -1) {
            makeMove(word);
          }
        }
    }

    // speech error handling
    recognition.onerror = function(event){
        console.log('error?');
        console.log(event);
    };

    var makeMove = function(dir) {
        if (dir == "up") {
            window.gameManager.moveUp();
        } else if (dir == "down") {
            window.gameManager.moveDown();
        } else if (dir == "left") {
            window.gameManager.moveLeft();
        } else if (dir == "right") {
            window.gameManager.moveRight();
        }
    };

    // var bindButtonPress = function (selector, fn) {
    //   var button = document.querySelector(selector);
    //   // button.addEventListener("click", fn.bind(this));
    //   // button.addEventListener(this.eventTouchend, fn.bind(this));
    // };

    // bindButtonPress(".restart-button", window.gameManager.restart());
    // bindButtonPress(".retry-button", window.gameManager.restart());
    // bindButtonPress(".keep-playing-button", window.gameManager.keepPlaying());

});
