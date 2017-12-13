// Music exercises for "MUUSIKA KOMPOSITSIOONIÕPETUS"
// TODO: proper credits, copyright


// harjutus  1.3.7. Helikõrgus. Viiulivõti. Antud on helikõrgus tähtnimetusega. Kirjuta helikõrgus silpnimetusega, noodijoonestikul, klaviatuuril. 

//var exercise; should it be declared in the script part of main html?? 
	
function drawNote() { // generates 2 bars in given time, hides barlines, on click draws a line an cecks if it is correct (between right notes)
	// variables
	var answered = false;
	var noteIndex = -1, currentNoteIndex = -1;
	
	var possibleNotes = [   // line - line number in staff: 0 upper, 4 - lower, 5 - lower ledger line. Used to draw the note
		{vtNote:"C@/4", name:"ces1", syllable:"do-bemoll1"},
		{vtNote:"C/4", name:"c1", syllable:"do1", line: 5},
		{vtNote:"C#/4", name:"cis1", syllable:"do-diees1"},
		
		{vtNote:"D@/4", name:"des1", syllable:"re-bemoll1"},
		{vtNote:"D/4", name:"d1", syllable:"re1", line: 4.5},
		{vtNote:"D#/4", name:"dis1", syllable:"re-diees1"},
		
		{vtNote:"E@/4", name:"es1", syllable:"mi-bemoll1"},
		{vtNote:"E/4", name:"e1", syllable:"mi1", line: 4},
		{vtNote:"E#/4", name:"eis1", syllable:"mi-diees1"},
		
		{vtNote:"F@/4", name:"fes1", syllable:"fa-bemoll1"},
		{vtNote:"F/4", name:"f1", syllable:"fa1", line: 3.5},
		{vtNote:"F#/4", name:"fis1", syllable:"fa-diees1"},
		
		{vtNote:"G@/4", name:"ges1", syllable:"sol-bemoll1"},
		{vtNote:"G/4", name:"g1", syllable:"sol1", line: 3},
		{vtNote:"G#/4", name:"gis1", syllable:"sol-bemoll1"},
		
		{vtNote:"A@/4", name:"as1", syllable:"la-bemoll1"},
		{vtNote:"A/4", name:"a1", syllable:"la1", line: 2.5},
		{vtNote:"A#/4", name:"ais1", syllable:"la-diees1"},
		
		{vtNote:"B@/4", name:"b1", syllable:"si-bemoll1"},
		{vtNote:"B/4", name:"h1", syllable:"si1", line: 2},
		{vtNote:"B#/4", name:"his1", syllable:"si-diees1"},
		
		
		{vtNote:"C@/5", name:"ces2", syllable:"do-bemoll2"},
		{vtNote:"C/5", name:"c2", syllable:"do2", line: 1.5},
		{vtNote:"C#/5", name:"cis2", syllable:"do-diees2"},
		
		{vtNote:"D@/5", name:"des2", syllable:"re-bemoll2"},
		{vtNote:"D/5", name:"d2", syllable:"re2", line: 1},
		{vtNote:"D#/5", name:"dis2", syllable:"re-diees2"},
		
		{vtNote:"E@/5", name:"es2", syllable:"mi-bemoll2"},
		{vtNote:"E/5", name:"e2", syllable:"mi2", line: 0.5},
		{vtNote:"E#/5", name:"eis2", syllable:"mi-diees2"},
		
		{vtNote:"F@/5", name:"fes2", syllable:"fa-bemoll2"},
		{vtNote:"F/5", name:"f2", syllable:"fa2", line: 0},
		{vtNote:"F#/5", name:"fis2", syllable:"fa-diees2"},
		
		{vtNote:"G@/5", name:"ges2", syllable:"sol-bemoll2"},
		{vtNote:"G/5", name:"g2", syllable:"sol2", line: -0.5},
		{vtNote:"G#/5", name:"gis2", syllable:"sol-bemoll2"},
		
		{vtNote:"A@/5", name:"as2", syllable:"la-bemoll2"},
		{vtNote:"A/5", name:"a2", syllable:"la2", line: -1},
		{vtNote:"A#/5", name:"ais2", syllable:"la-diees2"},
		
		{vtNote:"B@/5", name:"b2", syllable:"si-bemoll2"},
		{vtNote:"B/5", name:"h2", syllable:"si2", line: -1.5},
		{vtNote:"B#/5", name:"his2", syllable:"si-diees2"},
		
		{vtNote:"C@/6", name:"ces3", syllable:"do-bemoll3"},
		{vtNote:"C/6", name:"c3", syllable:"do3", line: -2},
		{vtNote:"C#/6", name:"cis3", syllable:"do-diees3"},
		
		
	];
	
	// Create or set necessary HTML elements
	document.getElementById("exerciseTitle").innerHTML = "Kirjuta helikõrgus";
	document.getElementById("description").innerHTML = "Antud on helikõrgus tähtnimetusega. Kirjuta helikõrgus silpnimetusega, noodijoonestikul [, klaviatuuril].<br>Alteratsioonimärkide lisamiseks vajuta + või - nupule või kasuta vatavaid klahve arvutklaviatuuril."; 
	//TODO: luba ka pause, mitte ainult noodid -  kas vaja?
	document.getElementById("question").innerHTML =	"See noot on silpnimetusega: / Kliki noodijoonestukul kohale, kus peaks asuma noot. Kasuta +/- nuppe, et lisada diees või bemoll";
	
	// set necessary methods in exercise
	exercise = new MusicExercise("mainCanvas",150,10,10,1.5); // bigger scale for note input
 	exercise.time = "";
 	exercise.key = "";
	exercise.timeToThink = 30; // more time for doing the test
	
	// add diesis and bemoll button to mainCanvas
	
	function handleAccidental(plusMinus) {  // -1 to lower half tone, +1 to raise halftone
		console.log("handleAccidental", plusMinus, );
		if (currentNoteIndex > 0) {
			currentNoteIndex += plusMinus;
			if (currentNoteIndex>=possibleNotes.length-1)
				currentNoteIndex = possibleNotes.length-1;
			if (currentNoteIndex<0)
				currentNoteIndex = 0;
			console.log(currentNoteIndex, possibleNotes[currentNoteIndex].vtNote)
			exercise.notes = possibleNotes[currentNoteIndex].vtNote;
			exercise.draw();
		} else {
			alert("Klõpsa esmalt noodi asukohale noodijoonestikul!")
		}
		
	}
	
	document.body.addEventListener('keypress', function (e) { // TODO: how to remove when this function is not used? 
		// TODO: redo on keypressed -  otherwise different reults in different browsers
		e = e || window.event;
		var charCode = e.keyCode || e.which;
		
		if ( charCode === 45 && currentNoteIndex >= 0) { // minus key
			handleAccidental(-1);
		}
		if (charCode === 43 && currentNoteIndex >= 0 ) { // plus key
			handleAccidental(1);
		}
		
	}, false);
	
	var diesisButton = document.createElement("button");
    diesisButton.innerHTML = "+";
    diesisButton.onclick = function(){handleAccidental(1)};
    exercise.canvas.appendChild(diesisButton);
	
	var bemolleButton = document.createElement("button");
    bemolleButton.innerHTML = "-";
    bemolleButton.onclick = function(){handleAccidental(-1)};
    exercise.canvas.appendChild(bemolleButton);
	
	
	
	exercise.generate = function() {
				
		noteIndex = Math.floor(Math.random()*possibleNotes.length); 
		console.log("Selected", possibleNotes[noteIndex].name, possibleNotes[noteIndex].syllable);
		
		document.getElementById("question").innerHTML =	'<br>Sisesta noodijoonestikule <b>' +possibleNotes[noteIndex].name + '</b><br>Noot <b><big>' + possibleNotes[noteIndex].name.slice(0, -1)  + '</b></big> on silpnimetusega: <select id="syllable"></select><br>Kui oled noodi sisetanud noodijoonestikule, vajuta Vasta:' ;
		
		var select = document.getElementById('syllable');
		for(var i = 0; i < 7*3; i++) {
			var option = document.createElement('option');
			var syllable = possibleNotes[i].syllable.slice(0,-1); // remove octave (1 or 2)
			option.innerHTML = syllable;
			option.value = syllable;
			select.appendChild(option);
		}
		
		
		
		exercise.notes = ""; // nothing drawn	
		currentNoteIndex = -1; 	
		answered = false; // necessary to set a flag to check if the quetion has answered already in checkResponse
	
	}
	
	
	
	exercise.clickActions = function(x,y) {
		// console.log(x,y);		

		var line = exercise.artist.staves[0].note.getLineForY(y);
		
		// find note by line
		line =  Math.round(line*2)/2; // round to neares 0.5
		for (var i= 0; i<possibleNotes.length;i++) {
			if (possibleNotes[i].hasOwnProperty("line") ) {
				//console.log(i, possibleNotes[i].line, line)
				if (possibleNotes[i].line === line) {
					console.log("FOUND ", i, possibleNotes[i].vtNote);
					// TODO: add # or bemoll, then check if correct note
					exercise.notes =  possibleNotes[i].vtNote;
					currentNoteIndex = i;
					exercise.draw();
					break;
					
				}
			}
			
		}
	}
	
	exercise.renew();		
	
	exercise.responseFunction = function() {
		if (currentNoteIndex < 0) {
			alert("Sisesta noot noodijoonestikule!")
			return;
		}
		
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}
		
		exercise.attempts += 1;
		var feedback = "";
		var correct = false;
		
		// TODO: eemalda silbilt oktavinumber
		
		if (document.getElementById("syllable").value === possibleNotes[noteIndex].syllable.slice(0,-1) ) { 
			feedback += "Silpnimetus õige! "
			correct = true;
		} else {
			feedback += "Silpnimetus vale! See on hoopis " + possibleNotes[noteIndex].syllable.slice(0,-1) + ". ";			
			correct = false;
		}
		
		if (currentNoteIndex === noteIndex) {
			feedback += "Noot noodijoonestikul on õige!"
			correct = correct && true;;
		} else {
			feedback += "Noot noodijoonestikul valesti!"; 
			exercise.notes += " " + possibleNotes[noteIndex].vtNote;
			exercise.draw(); // redraw with right note
			correct = correct && false;
		}
		
		if (correct) {
			exercise.score += 1;
		}
		
		document.getElementById("attempts").innerHTML = exercise.attempts;
		document.getElementById("score").innerHTML = exercise.score;
		document.getElementById("feedback").innerHTML = feedback; 		
		answered = true;
		
	}
	

}
