/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDroneArm(scene) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.angle = 0;

	this.helix = new MyHelix(scene);
	this.cylinder = new MyFullCylinder(scene, 20, 1);
};

MyDroneArm.prototype = Object.create(CGFobject.prototype);
MyDroneArm.prototype.constructor=MyDroneArm;

MyDroneArm.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.5, 0.5, 1);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0, 1, 0);
		this.helix.display();
	this.scene.popMatrix();
}

MyDroneArm.prototype.rotate = function(deltaTime) {
	this.angle += deltaTime*50;
}

