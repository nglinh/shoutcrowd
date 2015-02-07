// var recognizer, recorder, callbackManager, audioContext, outputContainer;
// // Only when both recorder and recognizer do we have a ready application
// var recorderReady = recognizerReady = false;
// // A convenience function to post a message to the recognizer and associate
// // a callback to its response
// function postRecognizerJob(message, callback) {
// 	var msg = message || {};
// 	if (callbackManager) msg.callbackId = callbackManager.add(callback);
// 	if (recognizer) recognizer.postMessage(msg);
// };
// // This function initializes an instance of the recorder
// // it posts a message right away and calls onReady when it
// // is ready so that onmessage can be properly set
// function spawnWorker(workerURL, onReady) {
// 	recognizer = new Worker(workerURL);
// 	recognizer.onmessage = function(event) {
// 		onReady(recognizer);
// 	};
// 	recognizer.postMessage('');
// };
// // To display the hypothesis sent by the recognizer
// function updateHyp(hyp) {
// 	var str = hyp.split(' ');
// 	console.log(str[str.length-1]);
// };
// // This updates the UI when the app might get ready
// // Only when both recorder and recognizer are ready do we enable the buttons
// function updateUI() {
// 	if (recorderReady && recognizerReady)
// 		startRecording();
// };
// // This is just a logging window where we display the status
// function updateStatus(newStatus) {
// 	console.log(newStatus);
// };
// // A not-so-great recording indicator
// function displayRecording(display) {
// 	if (display)
// 		document.getElementById('recording-indicator').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
// 	else
// 		document.getElementById('recording-indicator').innerHTML = "";
// };
// // Callback function once the user authorises access to the microphone
// // in it, we instanciate the recorder
// function startUserMedia(stream) {
// 	var input = audioContext.createMediaStreamSource(stream);
// 	// Firefox hack https://support.mozilla.org/en-US/questions/984179
// 	window.firefox_audio_hack = input;
// 	var audioRecorderConfig = {errorCallback: function(x) {
// 		updateStatus("Error from recorder: " + x);
// 	}};
// 	recorder = new AudioRecorder(input, audioRecorderConfig);
// 	// If a recognizer is ready, we pass it to the recorder
// 	if (recognizer)
// 		recorder.consumers = [recognizer];
// 	recorderReady = true;
// 	updateUI();
// 	updateStatus("Audio recorder ready");
// };
// // This starts recording. We first need to get the id of the grammar to use
// var startRecording = function() {
// 	// var id = document.getElementById('grammars').value;
// 	if (recorder && recorder.start(0)) displayRecording(true);
// };
// // Stops recording
// var stopRecording = function() {
// 	recorder && recorder.stop();
// 	displayRecording(false);
// };
// // Called once the recognizer is ready
// // We then add the grammars to the input select tag and update the UI
// var recognizerReady = function() {
// 	// updateGrammars();
// 	recognizerReady = true;
// 	updateUI();
// 	updateStatus("Recognizer ready");
// };
// // We get the grammars defined below and fill in the input select tag
// // var updateGrammars = function() {
// // 	var selectTag = document.getElementById('grammars');
// // 	for (var i = 0 ; i < grammarIds.length ; i++) {
// // 		var newElt = document.createElement('option');
// // 		newElt.value=grammarIds[i].id;
// // 		newElt.innerHTML = grammarIds[i].title;
// // 		selectTag.appendChild(newElt);
// // 	}
// // };
// // This adds a grammar from the grammars array
// // We add them one by one and call it again as
// // a callback.
// // Once we are done adding all grammars, we can call
// // recognizerReady()
// var feedGrammar = function(g, index, id) {
// 	if (id && (grammarIds.length > 0)) grammarIds[0].id = id.id;
// 	if (index < g.length) {
// 		grammarIds.unshift({title: g[index].title})
// 		postRecognizerJob({command: 'addGrammar', data: g[index].g},
// 		                  function(id) {
// 		                  	feedGrammar(grammars, index + 1, {id:id});
// 		              });
// 	} else {
// 		recognizerReady();
// 	}
// };
// // This adds words to the recognizer. When it calls back, we add grammars
// var feedWords = function(words) {
// 	postRecognizerJob({command: 'addWords', data: words},
// 	                  function() {
// 	                  	feedGrammar(grammars, 0);
// 	                  });
// };
// // This initializes the recognizer. When it calls back, we add words
// var initRecognizer = function() {
//   // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
//   postRecognizerJob({command: 'initialize'},
//                     function() {
//                     	if (recorder) recorder.consumers = [recognizer];
//                     	feedWords(wordList);
//                     });
// };
// // When the page is loaded, we spawn a new recognizer worker and call getUserMedia to
// // request access to the microphone
// window.onload = function() {
// 	updateStatus("Initializing web audio and speech recognizer, waiting for approval to access the microphone");
// 	callbackManager = new CallbackManager();
// 	spawnWorker("javascripts/recognizer.js", function(worker) {
//     // This is the onmessage function, once the worker is fully loaded
//     worker.onmessage = function(e) {
//         // This is the case when we have a callback id to be called
//         if (e.data.hasOwnProperty('id')) {
//         	var clb = callbackManager.get(e.data['id']);
//         	var data = {};
//         	if ( e.data.hasOwnProperty('data')) data = e.data.data;
//         	if(clb) clb(data);
//         }
//         // This is a case when the recognizer has a new hypothesis
//         if (e.data.hasOwnProperty('hyp')) {
//         	var newHyp = e.data.hyp;
//         	if (e.data.hasOwnProperty('final') &&  e.data.final) newHyp = "Final: " + newHyp;
//         	updateHyp(newHyp);
//         }
//         // This is the case when we have an error
//         if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
//         	updateStatus("Error in " + e.data.command + " with code " + e.data.code);
//         }
//     };
//     // Once the worker is fully loaded, we can call the initialize function
//     initRecognizer();
// });
// // The following is to initialize Web Audio
// try {
// 	window.AudioContext = window.AudioContext || window.webkitAudioContext;
// 	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// 	window.URL = window.URL || window.webkitURL;
// 	audioContext = new AudioContext();
// } catch (e) {
// 	updateStatus("Error initializing Web Audio browser");
// }
// if (navigator.getUserMedia)
// 	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
// 		updateStatus("No live audio input in this browser");
// 	});
// else updateStatus("No web audio support in this browser");
// // Wiring JavaScript to the UI
// // var startBtn = document.getElementById('startBtn');
// // var stopBtn = document.getElementById('stopBtn');
// // 	startBtn.disabled = true;
// // 	stopBtn.disabled = true;
// // 	startBtn.onclick = startRecording;
// // 	stopBtn.onclick = stopRecording;
// };

// // This is the list of words that need to be added to the recognizer
// // This follows the CMU dictionary format


// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
// set params
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
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
  var saidWord = event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ')[event.results[resultsLength-1][resultArrayLength-1].transcript.split(' ').length-1];

  console.log(saidWord);

  // // loop through links and match to word spoken
  // for (i=0; i<allLinks.length; i++) {

  //   // get the word associated with the link
  //   var dataWord = allLinks[i].dataset.word;

  //   // if word matches chenge the colour of the link
  //   if (saidWord.indexOf(dataWord) != -1) {
  //     allLinks[i].style.color = 'red';
  //   }
  // }

  // // append the last word to the bottom sentence
  // console.log(saidWord);
}

// speech error handling
recognition.onerror = function(event){
  console.log('error?');
  console.log(event);
}



var myFirebaseRef = new Firebase("https://fbhack.firebaseio.com/");

var templateMessage = {
		cells: [
			[0, 0, 0, 4],
			[0, 2, 0, 0],
			[0, 0, 8, 0],
			[0, 2, 0, 4]
			],
		score: 100,
		over: false,
		won: false,
		terminated: false,
		lastMoveDir: 1,
		lastRandomTile: {x: 0, y: 2, value: 2}
    };


var templateMessage2 = {
		cells: [
			[0, 0, 0, 4],
			[0, 2, 0, 0],
			[0, 0, 8, 0],
			[0, 2, 0, 4]
			],
		score: 90,
		over: false,
		won: false,
		terminated: false,
		lastMoveDir: 1,
		lastRandomTile: {x: 0, y: 2, value: 2}
    };

var gameStateRef = myFirebaseRef.child("gameStates");
gameStateRef.set(templateMessage);
// myFirebaseRef.set({
// 	gameState: {
// 		cells: [
// 			[null, null, null, 4],
// 			[null, 2, null, null],
// 			[null, null, 8, null],
// 			[null, 2, null, 4]
// 			],
// 		score: 100,
// 		over: false,
// 		won: false,
// 		terminated: false,
// 		lastMoveDir: 1,
// 		lastRandomTile: {x: 0, y: 2, value: 2}
// 		}
//     });
