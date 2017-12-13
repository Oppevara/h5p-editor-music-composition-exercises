// Music exercises for "MUUSIKA KOMPOSITSIOONIÕPETUS"
// TODO: proper credits, copyright


// Exercise: Helivältus. Harjutus. Lisa puuduv vältus

    //var exercise; should it be declared in the script part of main html?? 
	
function findMissingDuration() { // Harjutus 1.2.3 Lisa puuduv helivältus
	// variables
	var hiddenNote = -1, hiddenDuration = -1;
	var answered = false;
	
	// Create or set necessary HTML elements
	document.getElementById("exerciseTitle").innerHTML = "Lisa puuduv helivältus";
	document.getElementById("description").innerHTML = "Antud on teatud taktimõõdus takt, milles on peidetud üks helivältus (noot või paus). Lisa puuduv helivältus (noot või paus) // VÕI: arva ära peidetud vältus."; 
	//TODO: luba ka pause, mitte ainult noodid -  kas vaja?
	document.getElementById("question").innerHTML =	"Mis on peidetud noodi vältus?";

		
	// set necessary methods in exercise
	exercise = new MusicExercise("mainCanvas"); // must be defined before filling response with elements
	
	var oldResponse = document.getElementById("response");
	var response = document.createElement("select"); 
	
	response.id = "response";
	response.innerHTML ='<option value="0" selected>----</option>' +
		'<option value="2">Poolnoot</option>' +
		'<option value="1">Veerandnoot</option>' +
		'<option value="0.5">Kaheksandiknoot</option>' +
		'<option value="0.25">Kuueteistkümnendiknoot</option>';
		
	if (oldResponse === null) {
		console.log("Creating new response element");
		document.getElementById("responseDiv"). appendChild(response)
	} else {
		console.log("Replacing response element");
		document.getElementById("responseDiv").replaceChild(response, oldResponse);
	}

	
	
	exercise.generate = function() {
	
		var totalDuration = 0, barLength = 4; // barLength in beats
		var durations;
		
		do {  // create a rhythm that equals to barLength
			totalDuration = 0;
			durations = [];
		var allowedDurations = [2, 1, 0.5, 0.25]; 
			while (totalDuration<=barLength) {                                
				var duration = allowedDurations[Math.floor(Math.random()*allowedDurations.length)];
				
				if ((totalDuration + duration)>barLength) {
					break;
				}
				//console.log("Duration: ", duration);
				durations.push(duration);
				totalDuration += duration;
			}
		} while (totalDuration!=barLength);  // bad code, avoid loop, rather add up random notes and fill the rest with suitable values
		console.log("Generted durations:", durations); // BETTER: create separate function for creating rhytms for a bar
		
		
		// create VexFlow string of notes
		hiddenNote = Math.floor(Math.random()*durations.length);
		hiddenDuration = durations[hiddenNote];
		console.log("Hide the note (index), with duration", hiddenNote, hiddenDuration);
		var parseString = "";
		for (let duration of durations) {
			var flexDuration = (4/duration).toString();
			//console.log(_duration,flexDuration);
			parseString += " :"+flexDuration + " B/4 ";
			// better probably artist.addNote(), but it is unclear how to use it
			
		}
		console.log("Generated notes: ", parseString);
		exercise.notes = parseString;
		answered = false; // necessary to set a flag to check if the quetion has answered already in checkResponse
	
	}
	
	exercise.hide = function() {
		
		var notes = exercise.getNotes(0); // millegipärast 0???
		if (hiddenNote>notes.length) {
			console.log("There is not that many notes!", hiddenNote)
			return;
		}
		var note = exercise.artist.staves[0].note_notes[hiddenNote];
		var context = exercise.renderer.getContext();
		//context.setFillStyle("darkgreen"); // <- for canvas
		//context.fillRect(note.getAbsoluteX()-10, note.stave.getYForTopText()-10, note.width+20, note.stave.height+10);
		context.rect(note.getAbsoluteX()-10, note.stave.getYForTopText()-10, note.width+20, note.stave.height+10, { fill: 'darkgreen' });
	}
	
	exercise.renew = function() {
		document.getElementById("feedback").innerHTML = "";
		exercise.generate();		
		exercise.draw();
		exercise.hide();
	}
	
	exercise.renew();
	
	exercise.responseFunction = function() {
		//TODO: kontrolli, kas uuendatud, muidu tõstab ainult skoori...
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}
		exercise.attempts += 1;
		var feedback = "";
		if (parseFloat(document.getElementById("response").value)===hiddenDuration) {
			feedback = "Õige!"
			exercise.score += 1;
		} else {
			var durationString = "";
			switch (hiddenDuration) {
				case 2:  durationString = "Poolnoot"; break;
				case 1:  durationString = "Veerandnoot"; break;
				case 0.5:  durationString = "Kaheksandiknoot"; break;
				case 0.25:  durationString = "Kuueteistkümnendiknoot"; break;
				default: durationString = "?"; break;
			}
			feedback = "Vale! Õige oli: "+durationString; // TODO 0.25-> Kuueteistkümnendik jne
		}
		
		
		document.getElementById("attempts").innerHTML = exercise.attempts;
		document.getElementById("score").innerHTML = exercise.score;
		document.getElementById("feedback").innerHTML = feedback; 
		exercise.draw(); // redraw without rectangle
		answered = true;
	
	}
	

}
