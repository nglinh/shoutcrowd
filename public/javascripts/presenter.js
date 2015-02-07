// var firebase = new Firebase("https://fbhack.firebaseio.com");

var socket = io.connect('http://localhost:3000');


window.requestAnimationFrame(function () {

    var isFullyInitialized = false;
    window.gameManager = new GameManager(4, VoiceInputManager, HTMLActuator, LocalStorageManager);
// // listen for changes and use the forceUpdate function on GameManage
    // firebase.child("gameStates").on("value", function(snapshot){
    //     console.log(snapshot.val());
    //     if (!isFullyInitialized) {
    //         window.gameManager.forceUpdate(snapshot.val());
    //     }
    //     isFullyInitialized = true;
    //   }, function (errorObject){
    //     console.log("failed to get new gameState: " + errorObject.code);
    // });


    socket.on('gameStates', function (data) {
        if (!isFullyInitialized) {
            window.gameManager.forceUpdate(data);
        }
        isFullyInitialized = true;
        socket.on('gameStates', null);
    });

    socket.on('serverCommand', function(data) {
        var cmd = data.command;
        if (cmd == "up") {
            window.gameManager.moveUp();
        } else if (cmd == "down") {
            window.gameManager.moveDown();
        } else if (cmd == "left") {
            window.gameManager.moveLeft();
        } else if (cmd == "right") {
            window.gameManager.moveRight();
        }
        socket.emit("gameStates", window.gameManager.toAPIObject());
    });

    // firebase.child("serverCommand").on("child_added", function(command) {
    //     console.log(command.val());
    //     var cmd = command.val();
    //     if (cmd == "up") {
    //         window.gameManager.moveUp();
    //     } else if (cmd == "down") {
    //         window.gameManager.moveDown();
    //     } else if (cmd == "left") {
    //         window.gameManager.moveLeft();
    //     } else if (cmd == "right") {
    //         window.gameManager.moveRight();
    //     }
    //     firebase.child("gameStates").set(window.gameManager.toAPIObject());
    // });


    var bindButtonPress = function (selector, fn) {
      var button = document.querySelector(selector);
      button.addEventListener("click", fn.bind(this));
      button.addEventListener(this.eventTouchend, fn.bind(this));
    };

    bindButtonPress(".restart-button", function() {
      window.gameManager.restart();
      // firebase.child("gameStates").set(window.gameManager.toAPIObject());
      socket.emit("gameStates", window.gameManager.toAPIObject());
    });

});
