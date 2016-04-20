/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, width, height) {
	CGFobject.call(this,scene);
	
	this.pointer = new MyQuad(this.scene, 0, 1, 0, 1);

	this.width=width;

	this.height=height;

	this.angle = 0;
	
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.setAngle = function(angle) {
	this.angle=angle;
}

 MyClockHand.prototype.getAngle = function() {
 	return this.angle;
 };
 
MyClockHand.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0, 0 , 1);
		this.scene.scale(this.width, this.height, 1);
		this.scene.translate(0,0.5,0);
		this.pointer.display();
	this.scene.popMatrix();

}