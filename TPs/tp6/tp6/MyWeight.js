/**
 * MyWeight
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWeight(scene, x, y, z) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;

	this.height = 0.5;

	this.weight = new MyUnitCubeQuad(scene);
};

MyWeight.prototype = Object.create(CGFobject.prototype);
MyWeight.prototype.constructor=MyWeight;

MyWeight.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.scale(0.5, this.height, 0.5);
		this.weight.display();
	this.scene.popMatrix();
};

MyWeight.prototype.setPosition = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;	
};