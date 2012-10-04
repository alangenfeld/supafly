function Ball(pos, dir) {
  this.radius = 8;
  this.pos = pos;
  this.direction = vec3.normalize(dir);

  this.height = this.width = this.radius * 2;
  this.speed = 5;

  this.init();

  this.update = function(){
    var collisions = world.collisions(this);
    if (collisions.length > 0) {
      for (idx in collisions) {
        vec3.add(collisions[idx].vector, this.direction, this.direction);
      }
      this.direction = vec3.normalize(this.direction);
    }

    this.pos = vec3.add(this.pos, vec3.scale(this.direction, this.speed, []));
  };

  this.draw = function() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + this.radius,
      this.pos[1] + this.radius,
      this.radius, 
      0,
      Math.PI*2, 
      true
    ); 
    ctx.closePath();
    ctx.fill();
  };


}
Ball.prototype = new PhysicalGameObject;