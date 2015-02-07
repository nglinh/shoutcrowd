$(document).ready(function (){
			if (annyang){
			 	// Let's define a command.
			 	var commands = {
					'up': function() { alert('up!'); },
					'down': function() { alert('down!'); },
					'left': function() { alert('left!'); },
					'right': function() { alert('right!'); },
					'hello': function() { alert('Hello world!'); }
			 	};

			 	// Add our commands to annyang
			 	annyang.addCommands(commands);

				// Start listening.
				annyang.start();
				console.log("hey");
				// $("#test").text("ready");
			}
		}); 