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
    });
}

function loadQuestions(game){
	$.getJSON('questions.php?c=' + game.chosenWord, function (data) {
		console.log(data);
    	game.questions = data;
    });
}