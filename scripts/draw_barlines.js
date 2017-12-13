// Music exercises for "MUUSIKA KOMPOSITSIOONIÕPETUS"
// TODO: proper credits, copyright


// harjutus  1.2.4. Helivältus. Lisa taktijooned. Antud on taktimõõt ja rida helivältusi. Kirjuta taktijooned vastavalt taktimõõdule õigesse kohta. (Column + MusGen)

//var exercise; should it be declared in the script part of main html?? 
	
function drawBarlines() { // generates 2 bars in given time, hides barlines, on click draws a line an cecks if it is correct (between right notes)
	// variables
	var answered = false;
	var time = "3/4"; // later random or  set by user, better random
	//var previousX = 0, nextX = 0; // position of notes before and after barline
	var barlineObject;
	var bar1 = {}, bar2 = {};
	
	// Create or set necessary HTML elements
	document.getElementById("exerciseTitle").innerHTML = "Lisa taktijoon";
	document.getElementById("description").innerHTML = "Antud taktimõõt, taktijoon on peidetud. Kus see peaks asuma?"; 
	//TODO: luba ka pause, mitte ainult noodid -  kas vaja?
	document.getElementById("question").innerHTML =	"Kliki noodijoonestukul kohale, kus peaks asuma taktijoon.";
	
	// set necessary methods in exercise
	exercise = new MusicExercise("mainCanvas");
	exercise.timeToThink = 20
	
	function generateBar(numerator, denomenator) { // return vextab string
		
		// pitches -  take random pitches??
		var totalDuration = 0; 
		var barLength = numerator/denomenator * 4; // barLength in beats, 6/8 -> 3 beats
		var durations;
		
		do {  // create a rhythm that equals to barLength
			totalDuration = 0;
			durations = [];
			var allowedDurations = [2, 1, 0.5, 0.25];  // TODO: if 3/8, avoid 2-beats etc
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
		
		var parseString = "";
		var possibleNotes = ["C","D","E","F","G"]; // etc all 12
		for (let duration of durations) {
			var flexDuration = (4/duration).toString();
			//console.log(_duration,flexDuration);
			parseString += " :"+flexDuration + " " + possibleNotes[Math.floor(Math.random()*possibleNotes.length)] +"/4 ";
			
		}
		console.log("Generated notes: ", parseString);
		return {vtNotes: parseString, count: durations.length}; 
		
	}
	
	
	exercise.generate = function() {
	
		// generate time signatur first
		var beats = Math.floor(Math.random()*4 + 4); //3/4 .. 7/4
		var time =  beats.toString() +  "/4"
		exercise.time = time;
		
		
		
		//TODO: ühtlane paigutus 
		//exercise.notes = generateBar(beats,4) + " | "  + generateBar(beats,4);
		
		bar1 = generateBar(beats,4);
		bar2 = generateBar(beats,4);
		
		exercise.notes =  bar1.vtNotes +  bar2.vtNotes;
		answered = false; // necessary to set a flag to check if the quetion has answered already in checkResponse
	
	}
	
	exercise.clickActions = function(x,y) {
		console.log(x,y);
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}
		
		exercise.attempts += 1;
		var feedback = "";
		var color = "black";
		
		var notes = exercise.getNotes(0);
		previousX = notes[bar1.count-1].getAbsoluteX() + notes[bar1.count-1].width; // last note of first bar
		nextX = notes[bar1.count].getAbsoluteX() + notes[bar1.count].width;
		//var comparableX = x*exercise.canvasScale + exercise.canvasX;
		var drawX = x - exercise.canvasX; // <- fixed in baseclass
		console.log(drawX, previousX, "next: ", nextX)
		if (drawX>= previousX && drawX<=nextX) { // +10 note width
			feedback = "Õige!"
			exercise.score += 1;
			color = "green";
		} else {
			feedback = "Vale koht!";
			color = "red";
		}
		
		
		// add other staff with rendered barline
		var vt1 = exercise.createVexTabString();
		exercise.notes = bar1.vtNotes + " | " + bar2.vtNotes;
		var vt2 = exercise.createVexTabString(); // second staff
		exercise.draw(vt1 + "\n" + vt2)
		
		
		// draw barline where it was clicked with green or red color
		var context = exercise.renderer.getContext();
		var note = exercise.artist.staves[0].note;
		var drawY = note.getYForLine(0); 
		var height = note.getYForLine(4) - note.getYForLine(0)  
		context.rect(drawX, drawY, 2, height, { stroke: color,  fill: color});
		
		document.getElementById("attempts").innerHTML = exercise.attempts;
		document.getElementById("score").innerHTML = exercise.score;
		document.getElementById("feedback").innerHTML = feedback; 

		answered = true;
		
		if (exercise.testIsRunning() ) {
			exercise.nextQuestion(); 
		}
	}
	
	exercise.generate();		
	exercise.draw();
	
	document.getElementById("renewButton").onclick = function() {
		document.getElementById("feedback").innerHTML = "";
		exercise.generate(); 
		exercise.draw();
	}
	
	exercise.checkResponse = function() {
		//TODO: kontrolli, kas uuendatud, muidu tõstab ainult skoori...
		alert("Kliki noodijoonestikul kohele, kus peaks olema taktijoon");
	
	}
	

}
