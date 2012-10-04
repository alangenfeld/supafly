/**
 * Base game object class
 */
var objectID = 0;
function GameObject() {
  this.render = true;
  this.shadow = true;
  this.enabled = true;

  this.getID = function() {
    return this.id;    
  };

  this.init = function() {
    this.id = objectID++;
    objectManager.add(this);
  };

  this.update = function() {
    return;
  };

  this.draw = function() {
    return;
  };

  this.shutdown = function() {
    objectManager.remove(this);
  };
}

/**
 * Ye Olde Manager of Objects
 */
function ObjectManager() {
  this.objects = new Array();

  this.add = function(obj) {
    this.objects[obj.getID()] = obj;
  };

  this.updateAll = function() {
    for (idx in this.objects) {
      if (this.objects[idx].enabled) {
        this.objects[idx].update();	
      }
    }
  };

  this.drawAll = function() {
    for (idx in this.objects) {
      if (shadowPass >= 0 && this.objects[idx].shadow && this.objects[idx].enabled) {
	      this.objects[idx].draw();
      } else if (shadowPass < 0 && this.objects[idx].render && this.objects[idx].enabled) {
	      this.objects[idx].draw();
      }
    }
  };

  this.remove = function(obj) {
    delete this.objects[obj.getID()];
  };

  this.clear = function() {
    this.objects = new Array();
  };

  this.getObjects = function() {
    return this.objects;
  };
  
  this.getByID = function(id) {
    return this.objects[id];
  };
};
var objectManager = new ObjectManager;

/**
 * Ye Olde Manager of Objects
 */
function ResourceManager() {
  this.images = {"null":null};
  
  this.addImage = function(name, src) {
    var newImg = new Image;
    newImg.src = src;
    this.images[name] = newImg;
  };
  this.getImage = function(name) {
    return this.images[name];
  };
}
var resourceManager = new ResourceManager;
