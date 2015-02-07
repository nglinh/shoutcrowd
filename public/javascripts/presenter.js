var firebase = new Firebase("https://fbhack.firebaseio.com");

window.requestAnimationFrame(function () {



    var isFullyInitialized = false;
    window.gameManager = new GameManager(4, VoiceInputManager, HTMLActuator, LocalStorageManager);
// // listen for changes and use the forceUpdate function on GameManage
    firebase.child("gameStates").on("value", function(snapshot){
        console.log(snapshot.val());
        if (!isFullyInitialized) {
            window.gameManager.forceUpdate(snapshot.val());
        }
        isFullyInitialized = true;
      }, function (errorObject){
        console.log("failed to get new gameState: " + errorObject.code);
    });


    firebase.child("serverCommand").on("value", function(command) {
        console.log(command.val().command);
        var cmd = command.val().command;
        if (cmd == "up") {
            window.gameManager.moveUp();
        } else if (cmd == "down") {
            window.gameManager.moveDown();
        } else if (cmd == "left") {
            window.gameManager.moveLeft();
        } else if (cmd == "right") {
            window.gameManager.moveRight();
        }
        firebase.child("gameStates").set(window.gameManager.toAPIObject());
    });

});
