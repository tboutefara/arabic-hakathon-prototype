let game = new Game(name);

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('main');
  console.log(game.playerName);
}

function draw() {
  if(game.scene == 0){
  	  game.drawStartScene();
  }
}