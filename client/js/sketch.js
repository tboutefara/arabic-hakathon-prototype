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
let currentCar = 0;
let playerCarX = 20;
let playerCarSpeed = 10;
let aiCarX = 50;
let aiCarSpeed = 10;


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
  	  game.scene = 1;
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
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			wordsxy[3 * i + j] = {"x" : x + random(150) + j * 200, "y" : y + random(50)};
		}
		x = 100;
		y += 200;
	}
	
	frameRate(12);
	loadWords(game);
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
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			text(game.words[3 * i + j], wordsxy[3 * i + j].x, wordsxy[3 * i + j].y);
			image(bubble, wordsxy[3 * i + j].x, wordsxy[3 * i + j].y - 10, 120, 120);
			
			wordsxy[3 * i + j].y -= 5;
		}
	}
}

function prepareSecondScene(){
	let x = 400;
	let y = 250;
	
	questionxy[0] = {"x" : x, "y" : y};
	y += 100;
	for(var i = 0; i < 3; i++){
		questionxy[i + 1] = {"x" : x, "y" : y};
		y += 50;
	}
	
	x = 25;
	y = 470;
	
	for(var i = 0; i < 7; i++){
		carxy[i] = {"x" : x, "y" : y};
		x += 130;
	}
	
	loadQuestions(game);
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
	text(game.chosenWord, 400, 175);	
	
	textSize(28);
	textAlign(CENTER);
	text(game.questions[currentQuestion].question, questionxy[0].x, questionxy[0].y);
	
	stroke(0, 50, 255);
	strokeWeight(4);
	for(var i = 0; i < 3; i++){
		if(mouseX > questionxy[i + 1].x - 100 && mouseX < questionxy[i + 1].x + 100 
		&& mouseY > questionxy[i + 1].y - 40 && mouseY < questionxy[i + 1].y){
			rect(questionxy[i + 1].x - 100, questionxy[i + 1].y - 30, 200, 50); // The added or subbed values are to align
		}
	}
	stroke(0);
	strokeWeight(0);
	
	textSize(24);
	textAlign(CENTER);
	for(var i = 0; i < 3; i++){
		text(game.questions[currentQuestion].choices[i], questionxy[i + 1].x, questionxy[i + 1].y);
	}
	
	stroke(0, 255, 50);
	strokeWeight(4);
	rect(carxy[currentCar].x, carxy[currentCar].y + 10, 100, 60); // The 10 is to align, no math behind the rect to images
	stroke(0);
	strokeWeight(0);
	
	imageMode(CORNER);
	for(var i = 0; i < 6; i++){
		image(cars[i], carxy[i].x, carxy[i].y, 100, 60);
	}
	
}

function prepareThirdScene(){
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
		game.scene = 2;
		game.chosenCategory = game.categories[choice];
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
		game.scene = 4;
		game.chosenWord = game.words[choice];
	}
}

function answerAQuestion(){
	var choice = -1;
	var choiceFound = false;
	var i = 0;
	
	while(!choiceFound && i < 3){ // We always have 3 choices, if changed, this value must be updated
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
			game.scene = 6;
		}
	}
}
