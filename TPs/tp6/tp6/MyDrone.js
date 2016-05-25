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

	this.speed = [0.2, 1, 10];
	this.inclination = 0;
	this.maxInclination = Math.PI/5;
	this.movingForward = false;
	this.movingBackward = false;

	this.arms_1= new MyFullCylinder(this.scene,20,3);
	this.arms_2= new MyFullCylinder(this.scene,20,3);

	this.droneArms = [new MyDroneArm(this.scene), 
						new MyDroneArm(this.scene),
						new MyDroneArm(this.scene),
						new MyDroneArm(this.scene) ];

	this.resetMovement();

	this.droneBody = new MySemiSphere(this.scene, 80, 200);

	this.leftLeg = new MyDroneLeg(this.scene);
	this.rightLeg = new MyDroneLeg(this.scene);

	this.hook = new MyHook(this.scene, this.x, this.y, this.z, 1);
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function(){
 
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.rotate(this.inclination, 1, 0, 0);

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
			this.droneArms[0].display();
		this.scene.popMatrix();

		 this.scene.pushMatrix();
			this.scene.translate(0, 0.5, -3);
			this.droneArms[1].display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(3, 0.5, 0);
			this.droneArms[2].display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3, 0.5, 0);
			this.droneArms[3].display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 1, 0 , 0);
			this.droneBody.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, -1, 1);
			this.leftLeg.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, -1, -1);
			this.rightLeg.display();
		this.scene.popMatrix();

	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.hook.display();
	this.scene.popMatrix();
 };

 MyDrone.prototype.movement = function() {
	
 };

 MyDrone.prototype.resetMovement = function() {
 	this.droneArms[0].setVelocity(this.speed[1]);
	this.droneArms[1].setVelocity(this.speed[1]);
	this.droneArms[2].setVelocity(-this.speed[1]);
	this.droneArms[3].setVelocity(-this.speed[1]);
 };

 MyDrone.prototype.startTurnLeft = function() {
	this.droneArms[0].setVelocity(this.speed[2]);
	this.droneArms[1].setVelocity(this.speed[2]);
	this.droneArms[2].setVelocity(-this.speed[0]);
	this.droneArms[3].setVelocity(-this.speed[0]);

	this.angle += Math.PI/32;
 };

 MyDrone.prototype.startTurnRight = function() {
	this.droneArms[0].setVelocity(this.speed[0]);
	this.droneArms[1].setVelocity(this.speed[0]);
	this.droneArms[2].setVelocity(-this.speed[2]);
	this.droneArms[3].setVelocity(-this.speed[2]);

	this.angle -= Math.PI/32;
 };

 MyDrone.prototype.startMoveForward = function() {
	this.droneArms[0].setVelocity(this.speed[0]);
	this.droneArms[1].setVelocity(this.speed[2]);
	this.droneArms[2].setVelocity(-this.speed[1]);
	this.droneArms[3].setVelocity(-this.speed[1]);

	this.movingForward = true;
 };

 MyDrone.prototype.startMoveBackward = function() {
	this.droneArms[0].setVelocity(this.speed[2]);
	this.droneArms[1].setVelocity(this.speed[0]);
	this.droneArms[2].setVelocity(-this.speed[1]);
	this.droneArms[3].setVelocity(-this.speed[1]);

	this.movingBackward = true;
 };

 MyDrone.prototype.startMoveUp = function() {
	this.droneArms[0].setVelocity(this.speed[2]);
	this.droneArms[1].setVelocity(this.speed[2]);
	this.droneArms[2].setVelocity(-this.speed[2]);
	this.droneArms[3].setVelocity(-this.speed[2]);

	this.y += 0.1;
 };

 MyDrone.prototype.startMoveDown = function() {
	this.droneArms[0].setVelocity(this.speed[0]);
	this.droneArms[1].setVelocity(this.speed[0]);
	this.droneArms[2].setVelocity(-this.speed[0]);
	this.droneArms[3].setVelocity(-this.speed[0]);

	this.y -= 0.1;
 };

  MyDrone.prototype.stopTurnLeft = function() {
	this.resetMovement();

	this.angle += Math.PI/32;
 };

 MyDrone.prototype.stopTurnRight = function() {
	this.resetMovement();

	this.angle -= Math.PI/32;
 };

 MyDrone.prototype.stopMoveForward = function() {
	this.resetMovement();

	this.movingForward = false;
 };

 MyDrone.prototype.stopMoveBackward = function() {
	this.resetMovement();
	
	this.movingBackward = false;
 };

 MyDrone.prototype.stopMoveUp = function() {
 	this.resetMovement();

	this.y += 0.1;
 };

 MyDrone.prototype.stopMoveDown = function() {
	this.resetMovement();

	this.y -= 0.1;
 };

 MyDrone.prototype.retractHook = function() {
	 this.hook.retract();
 };

 MyDrone.prototype.extendHook = function() {
	 this.hook.extend();
 };

 MyDrone.prototype.update = function(deltaTime, helixSpeed) {
	this.x += this.velX*deltaTime;
	this.z += this.velZ*deltaTime;

	this.velX *= (1-this.attrition);
	this.velZ *= (1-this.attrition);

	if(this.movingForward) {
		this.velX += 1.5*Math.sin(this.angle);
		this.velZ += 1.5*Math.cos(this.angle);

		if(this.inclination < this.maxInclination)
			this.inclination += this.maxInclination*deltaTime*1.5;
	} else if(this.movingBackward) {
		this.velX -= 1.5*Math.sin(this.angle);
		this.velZ -= 1.5*Math.cos(this.angle);

		if(this.inclination > -this.maxInclination)
			this.inclination -= this.maxInclination*deltaTime*1.5;
	} else {
		this.inclination -= this.inclination*0.125;
	}

	for(var i = 0; i < this.droneArms.length; i++) {
		this.droneArms[i].update(deltaTime, helixSpeed);
	}
	
	this.hook.update(deltaTime, this.x, this.y, this.z);
 };
