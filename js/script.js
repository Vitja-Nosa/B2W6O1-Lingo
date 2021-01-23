var input = document.getElementById("input");
var button = document.getElementById("button");
var text = document.getElementById("text");
var results = document.getElementById("results");

var contentBox = document.getElementById("contentBox");
var contentBox2 = document.getElementById("contentBox2");
var title = document.getElementById("title");

var retryButton = document.getElementById("retryButton");

var randomNumber = Math.floor(Math.random()*words.length);
var word = words[randomNumber].split("");

var wordClone = [...word];
var userGuess;

var idOfword = 1;

var attempts = 5;

var shownLetters = [false, false, false, false, false];

createDivs(word.length)

button.onclick = function() {
	userGuess = input.value.toLowerCase().split("");
	if (input.value.length < 5) {
		input.value = "";
		input.classList.add("error");
		setTimeout(function(){
			input.classList.remove("error");
		}, 700)
	}
	else if (input.value == words[randomNumber] || attempts == 1) {
		gameOver();
	}
	else {
		checkLetters();
		createDivs(5);
		attempts--
		text.innerHTML = "Pogingen: " + attempts;
		input.value = "";
	}
}

function createDivs(qty) {
	var createDiv_word = document.createElement("div");
	createDiv_word.id = "word_"+idOfword;
	results.appendChild(createDiv_word);
	for (i=0; i<qty; i++) {
		var createDiv_letter = document.createElement("div");
		var node = document.createTextNode(".");
		createDiv_letter.appendChild(node)
		createDiv_letter.id = idOfword+"_letter_"+(i+1);
		createDiv_word.appendChild(createDiv_letter);
		if (shownLetters[i] == true) {
			document.getElementById(idOfword+"_letter_"+(i+1)).innerHTML = word[i];
		}
	}
	document.getElementById(idOfword+"_letter_"+1).innerHTML = word[0];
	idOfword++;
}

function checkLetters(gameOverCheck) {
	wordClone = [...word];
	for (i=0; i<userGuess.length; i++) {
		document.getElementById((idOfword-1)+"_letter_"+(i+1)).innerHTML = userGuess[i];
		document.getElementById((idOfword-1)+"_letter_"+(i+1)).style.backgroundColor = "red";
		if (wordClone[i] == userGuess[i]) {
			document.getElementById((idOfword-1)+"_letter_"+(i+1)).style.backgroundColor = "green";
			wordClone[i] = "*";
			userGuess[i] = "";
		}
	}
	for (i=0; i<userGuess.length; i++) {
		if (wordClone.includes(userGuess[i])) {
			document.getElementById((idOfword-1)+"_letter_"+(userGuess.indexOf(userGuess[i])+1)).style.backgroundColor = "#FFD700";
			document.getElementById((idOfword-1)+"_letter_"+(userGuess.indexOf(userGuess[i])+1)).style.borderRadius = "50%";
			wordClone[wordClone.indexOf(userGuess[i])] = "-"
			userGuess[i] = "";
			console.log(wordClone)
		}

	}
	if (gameOverCheck != true) {
		for (i=0; i<userGuess.length; i++) {
			if (wordClone[i] == "*") {
				shownLetters[i] = true;
			}
		}
	}	
}
function gameOver() {
	retryButton.style.display = "block";
	retryButton.onclick = function(){
		location.reload();
	}
	contentBox.style.display = "none";
	contentBox2.style.display = "block";
	checkLetters(true);
	if (input.value == words[randomNumber]) {
		title.innerHTML = "Goed gedaan, je hebt het woord geraden!"
	}
	else if (attempts == 1) {
		title.innerHTML = "Helaas, je hebt het woord niet geraden. <br> Het woord was: " + words[randomNumber] + ".";
		title.style.fontSize = "26px"
		title.style.color = "red";
	}
}
