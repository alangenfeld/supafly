function Ball(pos, velocity) {
  this.radius = 10;
  this.pos = pos;
  this.velocity = velocity;

  // coefficient of restitution
  this.cor = .9;

  this.height = this.width = this.radius * 2;

  this.init();

  this.update = function() {
    vec3.add(this.pos, this.velocity);

    var collisions = world.collisions(this);
    if (!collisions.length) {
      vec3.add(this.velocity, world.getGravityVDelta(), this.velocity);
    }
    var collisionDeltaX = [0, 0, 0];
    if (collisions.length > 0) {
      for (idx in collisions) {
        var collision = collisions[idx];
        vec3.add(collisions[idx].vector, this.velocity, this.velocity);
        if (collision.deltaX) {
          vec3.add(collisionDeltaX, collision.deltaX);
        }
      }
    }

    this.pos = vec3.add(this.pos, collisionDeltaX);

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