/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(this.scene, 12, 1);
	this.clockFace = new MyPolygon(this.scene, 12);
	this.hours = new MyClockHand(this.scene, 0.025, 0.5);
	this.minutes = new MyClockHand(this.scene, 0.025, 0.6);
	this.seconds = new MyClockHand(this.scene, 0.0125, 0.8);

	this.hours.setAngle(Math.PI/2);
	this.minutes.setAngle(Math.PI);
	this.seconds.setAngle(3*Math.PI/2);

	this.materialBlackPointer = new CGFappearance(this.scene);
	this.materialBlackPointer.setSpecular(0,0,0,1);
	this.materialBlackPointer.setShininess(1);
	this.materialBlackPointer.setDiffuse(0,0,0,1);

	this.materialYellowPointer = new CGFappearance(this.scene);
	this.materialYellowPointer.setSpecular(1,1,0,1);
	this.materialYellowPointer.setShininess(1);
	this.materialYellowPointer.setDiffuse(1,1,0,1);

	this.materialClockFace = new CGFappearance(this.scene);
	this.materialClockFace.setSpecular(1,1,1,1);
	this.materialClockFace.setShininess(1);
	this.materialClockFace.setDiffuse(1,1,1,1);
	this.materialClockFace.loadTexture("../resources/images/clock.png");
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function() {
	this.cylinder.display();
	this.hours.display();
	this.minutes.display();
	this.seconds.display();

	this.scene.pushMatrix();
		this.materialYellowPointer.apply();
		this.hours.display();
		this.materialBlackPointer.apply();
		this.minutes.display();
		this.seconds.display();
		this.materialClockFace.apply();
		this.clockFace.display();
	this.scene.popMatrix();

}

MyClock.prototype.update = function(deltaTime) {
	this.hours.setAngle(this.hours.getAngle() - (((2*Math.PI)/60)/60)/60*deltaTime);
	this.minutes.setAngle(this.minutes.getAngle() - ((2*Math.PI)/60)/60*deltaTime);
	this.seconds.setAngle(this.seconds.getAngle() - (2*Math.PI)/60*deltaTime);
}
