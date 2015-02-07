// listen for changes and use the forceUpdate function on GameManage
var firebase = new Firebase("https://fbhack.firebaseio.com");
firebase.child("gameStates").on("value", function(snapshot){
    GameManager.prototype.forceUpdate(snapshot.val);
  }, function (errorObject){
    console.log("failed to get new gameState: " + errorObject.code);
});