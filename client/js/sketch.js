let game = new Game(name);
let bubble;

let categories = ["علوم الحاسب", "علوم الطبيعة", "حياة يومية", "تاريخ", "جغرافيا", "ثقافة", "العمل", "أسفار وسياحة", "رياضة"];
let words = ["تشغيل", "أمر", "لغة", "طور", "موقع", "تصفح", "برنامج", "مكتب", "معالجة"];
let wordsx = [];
let wordsy = [];
let buttons = [];


function preload(){
	bubble = loadImage('../img/bubble.png');
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('main');
  noLoop();
}

function draw() {
  if(game.scene == 0){
  	  drawStartScene();
  }else if(game.scene == 1){
  	  prepareFirstScene();
  }else if(game.scene == 2){
  	  drawFirstScene();
  }
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
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			let b = createButton(categories[3 * i + j]);
			b.position(x, y);
			b.size(226, 90);
			b.parent('main');
			b.mouseClicked(function(){
				game.scene = 1;
				loop();
			});
			
			x += 256;
			buttons.push(b);
		}
		y += 100;
		x = 30;
	}	
	
	console.log(buttons);
}

function prepareFirstScene(){
	buttons.forEach(function(item){
		item.remove();
	});
	
	let x = 100;
	let y = 610;
	
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			wordsx[3 * i + j] = x + random(200) + j * 200;
			wordsy[3 * i + j] = y + random(50);
		}
		x = 100;
		y += 200;
	}
	
	frameRate(12);
	game.scene = 2;
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
			text(words[3 * i + j], wordsx[3 * i + j], wordsy[3 * i + j]);
			image(bubble, wordsx[3 * i + j], wordsy[3 * i + j] - 10, 120, 120);
			
			wordsy[3 * i + j] -= 5;
		}
	}
	
}
