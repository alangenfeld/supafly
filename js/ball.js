function Ball(pos, velocity) {
  this.radius = 8;
  this.pos = pos;
  this.velocity = velocity;
  // coefficient of restitution
  this.cor = .95;

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

    this.pos = vec3.add(this.pos, this.velocity);

    // HACK to stop from falling out of the screen due to persistent gravity
    // We can fix this problem more generally by providing a positionx
    // offset along with every collision impulse
    if (this.getBottomBounds() > world.height) {
      this.pos = [this.pos[0], world.height - this.height, 0]
    }
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