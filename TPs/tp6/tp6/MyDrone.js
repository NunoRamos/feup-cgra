/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
	
	this.scene = scene;

	this.attrition = 0.2;
	this.velX = 0;
	this.velY = 0;
	this.velZ = 0;
	this.x = 4.5;
	this.y = 4.5;
	this.z = 7;
	this.angle = Math.PI;

	this.arms_1= new MyFullCylinder(this.scene,20,3);
	this.arms_2= new MyFullCylinder(this.scene,20,3);

	this.arms_cylinder_1 =	new MyDroneArm(this.scene);
	this.arms_cylinder_2 =	new MyDroneArm(this.scene);
	this.arms_cylinder_3 =	new MyDroneArm(this.scene);
	this.arms_cylinder_4 =	new MyDroneArm(this.scene);

	this.droneBody = new MySemiSphere(this.scene, 80, 200);

	this.leftLeg = new MyDroneLeg(this.scene);
	this.rightLeg = new MyDroneLeg(this.scene);
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function(){
 
	this.scene.pushMatrix();
 		this.scene.translate(0, 0, -3);
 		this.scene.scale(0.2, 0.2, 2);
 		this.arms_1.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI/2, 0, 1, 0);
 		this.scene.translate(0, 0, -3);
 		this.scene.scale(0.2, 0.2, 2);
 		this.arms_2.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	 	this.scene.translate(0, 0.5, 3);
 		this.arms_cylinder_1.display();
 	this.scene.popMatrix();

 	 this.scene.pushMatrix();
 	 	this.scene.translate(0, 0.5, -3);
 		this.arms_cylinder_2.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	 	this.scene.translate(3, 0.5, 0);
 		this.arms_cylinder_3.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	 	this.scene.translate(-3, 0.5, 0);
 		this.arms_cylinder_4.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-Math.PI/2, 1, 0 , 0);
 		this.droneBody.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0, -1, 1);
 		this.leftLeg.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0, -1, -1);
 		this.rightLeg.display();
 	this.scene.popMatrix();
 	
 }

 MyDrone.prototype.movement = function() {
	this.scene.translate(this.x, this.y, this.z);
	this.scene.rotate(this.angle, 0, 1, 0);
 };

 MyDrone.prototype.turnLeft = function() {
	this.angle += Math.PI/32;
 };

 MyDrone.prototype.turnRight = function() {
	this.angle -= Math.PI/32;
 };

 MyDrone.prototype.moveForward = function() {
	this.velX += Math.sin(this.angle);
	this.velZ += Math.cos(this.angle);
	
 };

 MyDrone.prototype.moveBackward = function() {
 	this.velX -= Math.sin(this.angle);
	this.velZ -= Math.cos(this.angle);
 };

 MyDrone.prototype.moveUp = function() {
	this.y += 0.1;
 };

 MyDrone.prototype.moveDown = function() {
	this.y -= 0.1;
 };

 MyDrone.prototype.update = function(deltaTime) {
	this.x += this.velX*deltaTime;
	this.z += this.velZ*deltaTime;

	this.velX *= (1-this.attrition);
	this.velZ *= (1-this.attrition);

	this.arms_cylinder_1.rotate(deltaTime);
	this.arms_cylinder_2.rotate(deltaTime);
	this.arms_cylinder_3.rotate(deltaTime);
	this.arms_cylinder_4.rotate(deltaTime);
 };