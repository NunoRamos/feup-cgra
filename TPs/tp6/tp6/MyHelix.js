/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHelix(scene) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.horizontalBar = new MyUnitCubeQuad(scene);
	this.verticalBar = new MyUnitCubeQuad(scene);
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor=MyHelix;

MyHelix.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(0.05, 0.01, 2);
		this.horizontalBar.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(0.05, 0.01, 2);
		this.verticalBar.display();
	this.scene.popMatrix();
}