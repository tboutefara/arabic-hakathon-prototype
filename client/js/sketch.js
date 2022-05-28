let game = new Game(name);
let bubble;
let cars = [];
let tree;
let road;
let cloud;

let wordsxy = [];
let buttons = [];
let questionxy = [];
let carxy = [];
let currentQuestion = 0;
let currentCar = 2;
let playerCarX = 20;
let playerCarSpeed = 2;
let aiCarX = 50;
let aiCarSpeed = 2;
let battlewordsxy = [];
let battlewordsaixy = [];
let movingWord = -1;
let oldMouseX;
let oldMouseY;


function preload(){
	bubble = loadImage('../img/bubble.png');
	for(var i = 1; i < 7; i++){
		cars[i - 1] = loadImage('../img/car0' + i + '.png');
	}
	cloud = loadImage('../img/cloud.jpg');
	road = loadImage('../img/road.png');
	tree = loadImage('../img/tree.jpg');
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('main');
}

function draw() {
  if(game.scene == 0){
  	  prepareStartScene();
  }else if(game.scene == 1){
  	  drawStartScene();
  }else if(game.scene == 2){
  	  prepareFirstScene();
  }else if(game.scene == 3){
  	  drawFirstScene();
  }else if(game.scene == 4){
  	  prepareSecondScene();
  }else if(game.scene == 5){
  	  drawSecondScene();
  }else if(game.scene == 6){
  	  prepareThirdScene();
  }else if(game.scene == 7){
  	  drawThirdScene();
  }else {
  	  // game.scene = 1;
  }
}

function prepareStartScene(){
	var x = 30;
	var y = 300;
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			buttons.push({"x" : x, "y" : y});
			x += 256;
		}
		y += 100;
		x = 30;
	}
	
	loadCategories(game);
	game.scene = 1;
}

function drawStartScene(){
	background(255);
	
	// Creating title
	textSize(72);
	textAlign(CENTER);
	text("التحضير للسباق", 400, 100);
	
	textSize(48);
	textAlign(CENTER);
	text("إختر الميدان الذي تريد تعلمه", 400, 175);
	
	createButtons();
}

function createButtons(){
	var x = 30;
	var y = 300;
	
	textSize(18);
	textAlign(CENTER);
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			rect(x, y, 226, 90);
			text(game.categories[3 * i + j], x + 226/2, y + 90/2);
			
			x += 256;
		}
		y += 100;
		x = 30;
	}	
}

function prepareFirstScene(){
	let x = 100;
	let y = 610;
	
	let rows = game.words.length / 3 - 1;
	console.log(game.words.length);
	console.log(rows);
	
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < 3; j++){
			wordsxy[3 * i + j] = {"x" : x + random(150) + j * 200, "y" : y + random(50)};
		}
		x = 100;
		y += 200;
	}
	
	frameRate(12);
	game.scene = 3;
}

function drawFirstScene(){
	background(255);
	
	// Creating title
	textSize(72);
	textAlign(CENTER);
	text("إختيار الكلمة", 400, 100);
	
	textSize(36);
	imageMode(CENTER);
	
	let rows = game.words.length / 3 - 1;
	
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < 3; j++){
			text(game.words[3 * i + j].word, wordsxy[3 * i + j].x, wordsxy[3 * i + j].y);
			image(bubble, wordsxy[3 * i + j].x, wordsxy[3 * i + j].y - 10, 120, 120);
			
			wordsxy[3 * i + j].y -= 5;
		}
	}
}

function prepareSecondScene(){
	let x = 400;
	let y = 250;
	
	questionxy[0] = {"x" : x, "y" : y};
	y += 50;
	for(var i = 0; i < 3; i++){
		questionxy[i + 1] = {"x" : x, "y" : y};
		y += 100;
	}
	
	x = 90;
	y = 470;
	
	for(var i = 0; i < 5; i++){
		carxy[i] = {"x" : x, "y" : y};
		x += 130;
	}
	
	game.scene = 5;
}

function drawSecondScene(){
	background(255);
	
	// Creating title
	textSize(72);
	textAlign(CENTER);
	text("التحضير للسباق", 400, 100);
	
	textSize(48);
	textAlign(CENTER);
	text(game.chosenWord.word, 400, 175);	
	
	textSize(28);
	textAlign(CENTER);
	text(game.questions[currentQuestion].question, questionxy[0].x, questionxy[0].y);
	
	stroke(0, 50, 255);
	strokeWeight(4);
	for(var i = 0; i < 2; i++){
		let q = cleanExplanation(game.questions[currentQuestion].choices[i]);
		if(mouseX > questionxy[i + 1].x - 100 && mouseX < questionxy[i + 1].x + 100 
		&& mouseY > questionxy[i + 1].y - 40 && mouseY < questionxy[i + 1].y){
			rect(questionxy[i + 1].x - textWidth(q) / 2, questionxy[i + 1].y - 30, textWidth(q), 50); // The added or subbed values are to align
		}
	}
	stroke(0);
	strokeWeight(0);
	
	textSize(24);
	textAlign(CENTER);
	for(var i = 0; i < 2; i++){
		let q = cleanExplanation(game.questions[currentQuestion].choices[i]);
		text(q, questionxy[i + 1].x, questionxy[i + 1].y);
	}
	
	stroke(0, 255, 50);
	strokeWeight(4);
	rect(carxy[currentCar].x, carxy[currentCar].y + 10, 100, 60); // The 10 is to align, no math behind the rect to images
	stroke(0);
	strokeWeight(0);
	
	imageMode(CORNER);
	for(var i = 0; i < 5; i++){
		image(cars[i], carxy[i].x, carxy[i].y, 100, 60);
	}
	
}

function prepareThirdScene(){
	x = 90;
	y = 160;
	
	for(var i = 0; i < 6; i++){
		battlewordsxy[i] = {
			"x" : parseInt(x + Math.random() * 220), 
			"y" : parseInt(y + Math.random() * 180)
		};
		
		battlewordsaixy[i] = {
			"x" : parseInt(x + 400 + Math.random() * 220), 
			"y" : parseInt(y + Math.random() * 180)
		};
		
	}
	
	game.scene = 7;
}

function drawThirdScene(){
	background(255);
	
	textSize(72);
	textAlign(CENTER);
	text("بدء السباق", 400, 100);
	
	image(cloud, 20, 130, 360, 240);
	image(cloud, 420, 130, 360, 240);
	
	textSize(14);
	text(game.playerName, 200, 130);
	text(game.aiName, 600, 130);
	
	var treeX = 15; // Just to align, no math behind
	for(var i = 0; i < 8; i++){
		image(tree, treeX, 475, 100, 55);
		treeX += 100;
	}
	image(road, 0, 530, 800, 50);
	
	image(cars[0], aiCarX, 490, 100, 60);
	image(cars[currentCar], playerCarX, 510, 100, 60);
	
	textSize(24);
	rectMode(CENTER);
	
	if(movingWord != -1){
		battlewordsxy[movingWord].x += (mouseX - oldMouseX);
		battlewordsxy[movingWord].y += (mouseY - oldMouseY);
	}
	
	oldMouseX = mouseX;
	oldMouseY = mouseY;
	
	for(var i = 0; i < 3; i++){
		strokeWeight(2);
		stroke(0, 100, 255);
		rect(battlewordsxy[2 * i].x, battlewordsxy[2 * i].y - 10, 80, 40);
		strokeWeight(0);
		text(game.battleWords.related[i], battlewordsxy[2 * i].x, battlewordsxy[2 * i].y);
		strokeWeight(2);
		stroke(0, 100, 255);
		rect(battlewordsaixy[2 * i].x, battlewordsaixy[2 * i].y - 10, 80, 40);
		strokeWeight(0);
		text(game.battleWords.related[i], battlewordsaixy[2 * i].x, battlewordsaixy[2 * i].y);
		strokeWeight(2);
		stroke(0, 100, 255);
		rect(battlewordsxy[2 * i + 1].x, battlewordsxy[2 * i + 1].y - 10, 80, 40);
		strokeWeight(0);
		text(game.battleWords.unrelated[i], battlewordsxy[2 * i + 1].x, battlewordsxy[2 * i + 1].y);
		strokeWeight(2);
		stroke(0, 100, 255);
		rect(battlewordsaixy[2 * i + 1].x, battlewordsaixy[2 * i + 1].y - 10, 80, 40);
		strokeWeight(0);
		text(game.battleWords.unrelated[i], battlewordsaixy[2 * i + 1].x, battlewordsaixy[2 * i + 1].y);
			
	}
	
	strokeWeight(2);
	stroke(0);
	line(20, 400, 20, 470);
	line(20, 470, 190, 470);
	line(190, 470, 190, 400);
	line(210, 400, 210, 470);
	line(210, 470, 380, 470);
	line(380, 470, 380, 400);
	line(420, 400, 420, 470);
	line(420, 470, 590, 470);
	line(590, 470, 590, 400);
	line(620, 400, 620, 470);
	line(620, 470, 780, 470);
	line(780, 470, 780, 400);
	strokeWeight(0);
	
	
	aiCarX = aiCarX >= 720 ? aiCarX : aiCarX + aiCarSpeed;
	playerCarX = playerCarX >= 690 ? playerCarX : playerCarX + playerCarSpeed;
}

function mouseClicked(){
	if(game.scene == 1){
		chooseACategory();
	}else if(game.scene == 3){
		chooseAWord();
	}else if(game.scene == 5){
		answerAQuestion();
	}
}

function chooseACategory(){
	var choice = -1;
	var choiceFound = false;
	var i = 0;
	
	while(!choiceFound && i < buttons.length){
		if(mouseX > buttons[i].x && mouseX < buttons[i].x + 226 
		&& mouseY > buttons[i].y && mouseY < buttons[i].y + 90){
			choice = i;
			choiceFound = true;
		}else{
			i++;
		}
	}
	
	if(choice != -1){
		game.scene = -1;
		game.chosenCategory = game.categories[choice];
		loadWords(game);
	}
}

function chooseAWord(){
	var choice = -1;
	var choiceFound = false;
	var i = 0;
	
	while(!choiceFound && i < game.words.length){
		if(mouseX > wordsxy[i].x - 40 && mouseX < wordsxy[i].x + 40 
		&& mouseY > wordsxy[i].y - 40 && mouseY < wordsxy[i].y + 40){
			choice = i;
			choiceFound = true;
		}else{
			i++;
		}
	}
	
	if(choice != -1){
		game.scene = -1;
		game.chosenWord = game.words[choice];
		game.chosenWordIndex = choice;
		loadQuestions(game);
	}
}

function answerAQuestion(){
	var choice = -1;
	var choiceFound = false;
	var i = 0;
	
	while(!choiceFound && i < 2){ // We always have 2 choices, if changed, this value must be updated
		if(mouseX > questionxy[i + 1].x - 100 && mouseX < questionxy[i + 1].x + 100 // We suppose
		&& mouseY > questionxy[i + 1].y - 40 && mouseY < questionxy[i + 1].y){
			choice = i;
			choiceFound = true;
		}else{
			i++;
		}
	}
	
	if(choice != -1){
		if(choice == game.questions[currentQuestion].answer){
			currentCar++;
		}else{
			currentCar = currentCar == 0 ? 0 : currentCar - 1;
		}
		currentQuestion++;
		
		if(currentQuestion == game.questions.length){
			game.scene = -1;
			loadBattleWords(game);
		}
	}
}

function mousePressed(){
	if(game.scene == 7){
		if(movingWord == -1){
			for(var i = 5; i >= 0; i--){
				if(mouseX > battlewordsxy[i].x - 40 && mouseX < battlewordsxy[i].x + 40 
				&& mouseY > battlewordsxy[i].y - 35 && mouseY < battlewordsxy[i].y + 15){
					movingWord = i;
					break;
				}
			}
		}
	}
}

function mouseReleased(){
	
	if(game.scene == 7 && movingWord != -1){
		if(movingWord % 2 == 0){
			if(battlewordsxy[movingWord].x > 60 && battlewordsxy[movingWord].x < 150 &&
			   battlewordsxy[movingWord].y > 400 && battlewordsxy[movingWord].y < 450){
				   playerCarSpeed = (playerCarSpeed == 6) ? 6 : playerCarSpeed + 1;
			}
			
			if(battlewordsxy[movingWord].x > 250 && battlewordsxy[movingWord].x < 340 &&
			   battlewordsxy[movingWord].y > 400 && battlewordsxy[movingWord].y < 450){
				   playerCarSpeed = (playerCarSpeed == 0) ? 0 : playerCarSpeed - 1;
			}
		}
		
		if(movingWord % 2 == 1){
			if(battlewordsxy[movingWord].x > 250 && battlewordsxy[movingWord].x < 340 &&
			   battlewordsxy[movingWord].y > 400 && battlewordsxy[movingWord].y < 450){
				   playerCarSpeed = (playerCarSpeed == 6) ? 6 : playerCarSpeed + 1;
			}
			
			if(battlewordsxy[movingWord].x > 60 && battlewordsxy[movingWord].x < 150 &&
			   battlewordsxy[movingWord].y > 400 && battlewordsxy[movingWord].y < 450){
				   playerCarSpeed = (playerCarSpeed == 0) ? 0 : playerCarSpeed - 1;
			}
		}
	}
	
	movingWord = -1;
}
		
	
