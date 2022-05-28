class Game {
	
	constructor(name){
		this.score = 0;
		this.playerName = name;
		this.scene = 0;
		this.aiName = "لاعب الذكاء الصناعي";
		this.categories = [];
		this.chosenCategory = "";
		this.words = [];
		this.chosenWord = "";
		this.chosenWordIndex = -1;
		this.questions = [];
		
	}
	
}

function loadCategories(game){
	$.getJSON('categories.php', function (data) {
    	game.categories = data;
    });
}

function loadWords(game){
	$.getJSON('words.php?c=' + game.chosenCategory, function (data) {
    	game.words = data;
    	game.scene = 2;
    });
}

function loadQuestions(game){
	// JSON part is delayed
	/*
	$.getJSON('questions.php?c=' + game.chosenWord, function (data) {
    	game.questions = data;
    	game.scene = 4;
    });
    */
    let wordsCount = game.words.length;
    
    let q1 = {
				"question" : "ماهو أحسن تعريف للكلمة المختارة",
				"choices" : [
					game.words[game.chosenWordIndex].explanation,
					game.words[(game.chosenWordIndex + parseInt(Math.random() * wordsCount) - 1) % wordsCount].explanation
				],
				"answer" : 0
			};
	let q2 = {
				"question" : "ماهو أحسن تعريف للكلمة المختارة",
				"choices" : [
					game.words[game.chosenWordIndex].explanation,
					game.words[(game.chosenWordIndex + parseInt(Math.random() * wordsCount) - 1) % wordsCount].explanation
				],
				"answer" : 0
			};
	
	game.questions = [q1, q2];
	game.scene = 4;
}

function loadBattleWords(game){
	$.getJSON('battlewords.php?c=' + game.chosenWord, function (data) {
    	game.battleWords = data;
    	game.scene = 6;
    });
}
