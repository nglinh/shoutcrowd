// var firebase = new Firebase("https://fbhack.firebaseio.com");

var socket = io.connect('http://128.199.111.123:3000');


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


    socket.emit("gameStates", {state: window.gameManager.toAPIObject(), choices: {
        "left" : 0,
        "right" : 0,
        "up" : 0,
        "down": 0
    }});
    
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
        socket.emit("gameStates", {state: window.gameManager.toAPIObject(), choices : data.choices});
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
        socket.emit("gameStates", {state: window.gameManager.toAPIObject(), choices: {
        "left" : 0,
        "right" : 0,
        "up" : 0,
        "down": 0
        }});
    });

});
