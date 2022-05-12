let game = new Game("Ahmed");

function setup() {
  createCanvas(800, 600);
}

function draw() {
  if(game.scene == 0){
  	  game.drawStartScene();
  }
}