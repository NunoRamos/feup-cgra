/**
 * MyDestination
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDestination(scene, x, y, z) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;

	this.square = new MyQuad(scene);

	this.squareMaterial = new CGFappearance(this.scene);
	//this.squareMaterial.loadTexture("../resources/images/floor.png");
	
	this.defaultMaterial = new CGFappearance(this.scene);
};

MyDestination.prototype = Object.create(CGFobject.prototype);
MyDestination.prototype.constructor=MyDestination;

MyDestination.prototype.display = function() {
	this.scene.pushMatrix();
		this.squareMaterial.apply();
		this.square.display();
	this.scene.popMatrix();

	this.defaultMaterial.apply();
};