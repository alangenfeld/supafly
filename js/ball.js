function Ball(pos, velocity) {
  this.radius = 8;
  this.pos = pos;
  this.velocity = velocity;

  this.height = this.width = this.radius * 2;

  this.init();

  this.update = function(){
    vec3.add(this.velocity, world.getGravityVDelta(), this.velocity);

    var collisions = world.collisions(this);
    if (collisions.length > 0) {
      for (idx in collisions) {
        vec3.add(collisions[idx].vector, this.velocity, this.velocity);
      }
    }

    // TODO: account for collision position correction

    this.pos = vec3.add(this.pos, this.velocity);
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