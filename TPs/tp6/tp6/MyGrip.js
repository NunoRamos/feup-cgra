/**
 * MyGrip
 * @constructor
 */
 function MyGrip(scene) {
 	CGFobject.call(this,scene);

 	this.angle = 0;
 	this.vel = 0;
 	this.open = true;
	
	this.part1_grip = new MyDroneLegArch(scene, 20);
	this.part2_grip = new MyDroneLegArch(scene, 20);
	this.top_grip =  new MyFullCylinder(scene, 20, 1);
	
 };

 MyGrip.prototype = Object.create(CGFobject.prototype);
 MyGrip.prototype.constructor = MyGrip;

 MyGrip.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(0, -1, -0.05);
		this.scene.scale(0.5, 1, 0.5);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.part1_grip.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0 ,-1, -0.05);
		this.scene.scale(0.5 , 1 , 0.5);
		this.scene.rotate(-this.angle, 0, 0, 1);
		this.part2_grip.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.25, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 0.5);
		this.top_grip.display();
	this.scene.popMatrix();
 };

