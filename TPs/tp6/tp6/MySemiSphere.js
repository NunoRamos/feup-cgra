/**
 * MySemiSphere
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySemiSphere(scene, slices, stacks) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.slices = slices;
	this.stacks = stacks;

	this.semiSphere = new MyLamp(scene, slices, stacks);
	this.bottom = new MyCircle(scene, slices);
};

MySemiSphere.prototype = Object.create(CGFobject.prototype);
MySemiSphere.prototype.constructor=MySemiSphere;

MySemiSphere.prototype.display = function() {
	this.semiSphere.display();
	
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.bottom.display();
	this.scene.popMatrix();
}
