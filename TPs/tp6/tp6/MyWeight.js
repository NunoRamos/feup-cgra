/**
 * MyWeight
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWeight(scene, x, y, z, destination) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;
	this.destination = destination;

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

	this.destination.display();
};

MyWeight.prototype.setPosition = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;	
};

MyWeight.prototype.isAtDestination = function() {
	return (Math.abs(this.x - this.destination.x) < TOLERANCE &&
			Math.abs(this.y - this.height - this.destination.y) < TOLERANCE &&
			Math.abs(this.z - this.destination.z) < TOLERANCE);
}