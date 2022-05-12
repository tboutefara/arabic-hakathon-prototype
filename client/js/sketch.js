function setup() {
  createCanvas(800, 600);
  console.log(game.playerName);
}

function draw() {
  if(game.scene == 0){
  	  game.drawStartScene();
  }
}