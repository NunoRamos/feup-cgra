/**
 * MyHook
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHook(scene, x, y, z, height) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;
	this.height = height;
	this.attached = null;
	this.tolerance = 0.2;

	this.cable = new MyFullCylinder(scene, 3, 5);
};

MyHook.prototype = Object.create(CGFobject.prototype);
MyHook.prototype.constructor=MyHook;

MyHook.prototype.retract = function() {
	this.height -= 0.1;

	if(this.height < 1)
		this.height = 1;
};

MyHook.prototype.extend = function() {
	this.height += 0.1;
};

MyHook.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(0, -1, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.1, 0.1, this.height/5);
		this.cable.display();
	this.scene.popMatrix();
};

MyHook.prototype.update = function(deltaTime, x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	if(this.attached === null) {
		if(Math.abs(this.scene.weight.x - this.x) < this.tolerance &&
		 Math.abs(this.scene.weight.y + this.scene.weight.height/2 - this.y + this.height) < this.tolerance && 
		 Math.abs(this.scene.weight.z - this.z) < this.tolerance) {
		 	this.attached = this.scene.weight;
		 }
	} else {
		this.scene.weight.setPosition(this.x, this.y-this.height, this.z);
	}		
};
