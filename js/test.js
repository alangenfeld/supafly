// Ball demo

var world = new World(800, 600);

var balls = [];

for (var i=0; i < 100; i++) {
  var posX = Math.random() * 800;
  var posY = Math.random() * 600;
  var vX = (Math.random() * 2) - 1;
  var vY = (Math.random() * 2) - 1;
  balls.push(new Ball([posX, posY, 0], [vX, vY, 0]));
}

game.start();
