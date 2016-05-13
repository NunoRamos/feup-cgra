/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFullCylinder(scene, slices, stacks) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.slices = slices;
	this.stacks = stacks;

	this.cylinder = new MyCylinder(scene, slices, stacks);
	this.top = new MyCircle(scene, slices);
	this.bottom = new MyCircle(scene, slices);
};

MyFullCylinder.prototype = Object.create(CGFobject.prototype);
MyFullCylinder.prototype.constructor=MyFullCylinder;

MyFullCylinder.prototype.display = function() {
	this.cylinder.display();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.bottom.display();
	this.scene.popMatrix();
}
