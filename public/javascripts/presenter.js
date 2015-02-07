var firebase = new Firebase("https://fbhack.firebaseio.com");

window.requestAnimationFrame(function () {

    window.gameManager = new GameManager(4, VoiceInputManager, HTMLActuator, LocalStorageManager);
// listen for changes and use the forceUpdate function on GameManage
    firebase.child("gameStates").on("value", function(snapshot){
        console.log(snapshot.val());
        window.gameManager.forceUpdate(snapshot.val());
      }, function (errorObject){
        console.log("failed to get new gameState: " + errorObject.code);
    });

    // setTimeout(function() {
    //     window.gameManager.moveUp();
    //     firebase.child("gameStates").set(window.gameManager.toAPIObject());
    // }, 5000);

    firebase.child("serverCommand").on("value", function(command) {
        // console.log(command.val().command);
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
