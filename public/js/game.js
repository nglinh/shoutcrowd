// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var gameManager = new GameManager(4, VoiceInputManager, HTMLActuator, LocalStorageManager);


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
});
