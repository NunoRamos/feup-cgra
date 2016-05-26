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
	this.velY = 0;
	this.height = height;
	this.attached = null;
	this.tolerance = 0.5;

	this.cable = new MyFullCylinder(scene, 3, 5);
};

MyHook.prototype = Object.create(CGFobject.prototype);
MyHook.prototype.constructor=MyHook;

MyHook.prototype.retract = function() {
	this.velY -= 0.5;
};

MyHook.prototype.extend = function() {
	this.velY += 0.5;
};

MyHook.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(0, -1, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.1, 0.1, this.height/5);
		this.cable.display();
	this.scene.popMatrix();
};

MyHook.prototype.update = function(deltaTime, x, y, z, attrition) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.velY *= (1-attrition);
	this.height += this.velY*deltaTime;

	if(this.height < 1)
		this.height = 1;

	for(var i = 0; i < this.scene.weights.length; i++) {
		if(this.attached === null) {
			if(Math.abs(this.scene.weights[i].x - this.x) < this.tolerance &&
			 Math.abs(this.scene.weights[i].y + this.scene.weights[i].height/2 - this.y + this.height) < this.tolerance && 
			 Math.abs(this.scene.weights[i].z - this.z) < this.tolerance) {
				this.attached = this.scene.weights[i];
			 }
		} else {
			if(this.attached.isAtDestination(this.tolerance)) {
				this.attached = null;
			} else {
				this.attached.setPosition(this.x, this.y-this.height, this.z);	
			}
		}			
	}
};