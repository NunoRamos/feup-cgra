/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDroneLeg(scene) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.cube = new MyUnitCubeQuad(scene);
	this.arch = new MyDroneLegArch(scene, 20);
};

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor=MyDroneLeg;

MyDroneLeg.prototype.display = function() {
	this.scene.pushMatrix();
 		this.scene.translate(0, 0, 0.1);
 		this.scene.rotate(-Math.PI/2, 0, 1, 0);
 		this.scene.scale(0.1, 0.1, 5);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(2 , 1, 1);
		this.arch.display();
	this.scene.popMatrix();
}