function PhysicalGameObject() {
  // must provide
  this.isPhysical = true;
//  this.pos = null;
//  this.width = null;
//  this.height = null;

  this.parentInit = this.init;
  this.init = function() {
    this.parentInit();
    world.add(this);
  };

  this.parentShutdown = this.shutdown;
  this.shutdown = function() {
    world.remove(this);
    this.parentShutdown();
  };

  this.getRightBounds = function() {
    return this.pos[0] + this.width;
  };

  this.getLeftBounds = function() {
    return this.pos[0];
  };

  this.getTopBounds = function() {
    return this.pos[1];
  };

  this.getBottomBounds = function() {
    return this.pos[1] + this.height;
  };
}
PhysicalGameObject.prototype = new GameObject;

function World(width, height) {
  this.width = width;
  this.height = height;
  
  this.objects = new Array();
  this.collisionMap = new Array();

  this.init();

  this.add = function(obj) {
    this.objects[obj.getID()] = true;
  };

  this.remove= function(obj) {
    delete this.objects[obj.getID()];
  };

  this.update = function() {
    // build collision map
    this.collisionMap = new Array();
    for (idx in this.objects) {
      var object1 = objectManager.getByID(idx);
      var collisions = new Array();

      // boundary collision
      if (object1.getRightBounds() >= this.width) {
        collisions.push(new Collision(this.getID(), [-1, 0, 0]));
      }
      if (object1.getLeftBounds() <= 0) {
        collisions.push(new Collision(this.getID(), [1, 0, 0]));
      }
      if (object1.getTopBounds() <= 0) {
        collisions.push(new Collision(this.getID(), [0, 1, 0]));
      }

      if (object1.getBottomBounds() >= this.height) {
        collisions.push(new Collision(this.getID(), [0, -1, 0]));
      }

      // object collisions      
      for (idx2 in this.objects) {
        if (idx === idx2) {
          continue;
        }
        var object2 = objectManager.getByID(idx2);

        var right_intersect = 
          object1.getRightBounds() >= object2.getLeftBounds() &&
          object1.getRightBounds() <= object2.getRightBounds();

        var left_intersect = 
          object1.getLeftBounds() <= object2.getRightBounds() &&
          object1.getLeftBounds() >= object2.getLeftBounds();

        var top_intersect = 
          object1.getTopBounds() <= object2.getBottomBounds() &&
          object1.getTopBounds() >= object2.getTopBounds();

        var bottom_intersect = 
          object1.getBottomBounds() >= object2.getTopBounds() &&
          object1.getBottomBounds() <= object2.getBottomBounds();

        var vertical_intersect = top_intersect || bottom_intersect;
        var horizontal_intersect = left_intersect || right_intersect;

        if (vertical_intersect && horizontal_intersect) {
          collisions.push(
            new Collision(
              object2.getID(), 
              vec3.subtract(object2.pos, object1.pos, [])
            )
          );
        }
      }
      this.collisionMap[object1.getID()] = collisions;
    }
  };

  this.collisions = function(obj) {
    return this.collisionMap[obj.getID()] || [];
  };

}
World.prototype = new GameObject;

function Collision(id, vector) {
  this.id = id;
  this.vector = vector;
}
