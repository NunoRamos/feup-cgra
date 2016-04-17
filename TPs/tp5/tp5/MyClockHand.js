/**
 * MyClockHand
 * @constructor
 */
 function MyClockHand(scene, width, height) {
 	CGFobject.call(this,scene);

	this.scene = scene;
	this.quad = new MyQuad(scene);
	this.angle = 0;
	this.height = height;
	this.width = width;
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.display = function () {
	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(this.width, this.height/2, 1);
		this.scene.translate(0, 0.5, 0);
		this.quad.display();
	this.scene.popMatrix();
 };

 MyClockHand.prototype.setAngle = function(angle) {
 	this.angle = Math.PI*angle/180;
 };

 MyClockHand.prototype.getAngle = function() {
 	console.log(this.angle);
 	return this.angle;
 };