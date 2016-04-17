/**
 * MyClock
 * @constructor
 */
 function MyClock(scene) {
 	CGFobject.call(this,scene);
	
	this.lastUpdateTime = (new Date()).getTime();

	this.defaultAppearance = new CGFappearance(this.scene);

	this.clockFaceMaterial = new CGFappearance(this.scene);
	this.clockFaceMaterial.loadTexture("../resources/images/clock.png");
	
	this.blackPointerAppearance = new CGFappearance(this.scene);
	this.blackPointerAppearance.setDiffuse(0, 0, 0, 1);
	this.blackPointerAppearance.setSpecular(0, 0, 0, 1);

	this.yellowPointerAppearance = new CGFappearance(this.scene);
	this.yellowPointerAppearance.setDiffuse(1, 1, 0.2, 1);
	this.yellowPointerAppearance.setSpecular(1, 1, 0.2, 1);

	this.scene = scene;
 	this.clockBody = new MyCylinder(scene, 12, 1);
 	this.clockFace = new MyPolygon(scene, 12);
 	this.hourPointer = new MyClockHand(scene, .05, 1);
 	this.minutePointer = new MyClockHand(scene, .05, 1.5);
 	this.secondPointer = new MyClockHand(scene, 0.025, 1.5);

	this.hourPointer.setAngle(90);
	this.minutePointer.setAngle(180);
	this.secondPointer.setAngle(270);
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
	this.clockBody.display();
	
	this.clockFaceMaterial.apply();
	this.clockFace.display();

	this.scene.pushMatrix();
		this.blackPointerAppearance.apply();
		this.hourPointer.display();
		this.blackPointerAppearance.apply();
		this.minutePointer.display();
		this.yellowPointerAppearance.apply();
		this.secondPointer.display();
	this.scene.popMatrix();
 };

 MyClock.prototype.update = function(currTime) {
 	deltaTimeSeconds = (currTime - this.lastUpdateTime)/1000;
	this.secondPointer.setAngle(this.secondPointer.getAngle() - 6*deltaTimeSeconds);
	this.minutePointer.setAngle(this.minutePointer.getAngle() - deltaTimeSeconds/10);
	this.hourPointer.setAngle(this.hourPointer.getAngle() - deltaTimeSeconds/600);
 };