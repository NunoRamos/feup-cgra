/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene, x, y, z) {
 	CGFobject.call(this,scene);
	
	this.scene = scene;

	this.attrition = 0.2;
	this.velX = 0;
	this.velY = 0;
	this.velZ = 0;
	this.velRot = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.angle = Math.PI;

	this.speed = [0.2, 1, 10];
	this.inclination = 0;
	this.maxInclination = Math.PI/5;
	this.movingForward = false;
	this.movingBackward = false;
	this.movingLeft = false;
	this.movingRight = false;
	this.movingUp = false;
	this.movingDown = false;
	this.extendingHook = false;
	this.retractingHook = false;

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

	//creating all the materials for the first texture
	this.bodyMaterial_text1 = new CGFappearance(this.scene);
	this.bodyMaterial_text1.setDiffuse(1,1,1,1);
	this.bodyMaterial_text1.setSpecular(0.1,0.1,0.1,1);
	this.bodyMaterial_text1.setShininess(1);
	this.bodyMaterial_text1.loadTexture("../resources/images/yellowTexture.jpg")

	this.legMaterial_text1 = new CGFappearance(this.scene);
	this.legMaterial_text1.setDiffuse(1,1,1,1);
	this.legMaterial_text1.setSpecular(0.1,0.1,0.1,1);
	this.legMaterial_text1.setShininess(1);
	this.legMaterial_text1.loadTexture("../resources/images/test.jpg")

	this.armMaterial_text1 = new CGFappearance(this.scene);
	this.armMaterial_text1.setDiffuse(1,1,1,1);
	this.armMaterial_text1.setSpecular(0.1,0.1,0.1,1);
	this.armMaterial_text1.setShininess(1);
	this.armMaterial_text1.loadTexture("../resources/images/test.jpg")

	this.armMaterial_2_text1 = new CGFappearance(this.scene);
	this.armMaterial_2_text1.setDiffuse(1,1,1,1);
	this.armMaterial_2_text1.setSpecular(0.1,0.1,0.1,1);
	this.armMaterial_2_text1.setShininess(1);
	this.armMaterial_2_text1.loadTexture("../resources/images/yellowTexture.jpg")
	//finished loading all the materials for the first texture

	//creating all the materials for the second texture
	this.bodyMaterial_text2 = new CGFappearance(this.scene);
	this.bodyMaterial_text2.setDiffuse(1,1,1,1);
	this.bodyMaterial_text2.setSpecular(0.1,0.1,0.1,1);
	this.bodyMaterial_text2.setShininess(1);
	this.bodyMaterial_text2.loadTexture("../resources/images/redTexture.jpg")

	this.legMaterial_text2 = new CGFappearance(this.scene);
	this.legMaterial_text2.setDiffuse(1,1,1,1);
	this.legMaterial_text2.setSpecular(0.1,0.1,0.1,1);
	this.legMaterial_text2.setShininess(1);
	this.legMaterial_text2.loadTexture("../resources/images/redAndWhiteTexture_2.png")

	this.armMaterial_text2 = new CGFappearance(this.scene);
	this.armMaterial_text2.setDiffuse(1,1,1,1);
	this.armMaterial_text2.setSpecular(0.1,0.1,0.1,1);
	this.armMaterial_text2.setShininess(1);
	this.armMaterial_text2.loadTexture("../resources/images/redAndWhiteTexture.jpg")

	this.armMaterial_2_text2 = new CGFappearance(this.scene);
	this.armMaterial_2_text2.setDiffuse(1,1,1,1);
	this.armMaterial_2_text2.setSpecular(0.1,0.1,0.1,1);
	this.armMaterial_2_text2.setShininess(1);
	this.armMaterial_2_text2.loadTexture("../resources/images/redTexture.jpg")
	//finished loading all the materials for the second texture

	//creating all the materials for the third texture
	this.bodyMaterial_text3 = new CGFappearance(this.scene);
	this.bodyMaterial_text3.setDiffuse(1,1,1,1);
	this.bodyMaterial_text3.setSpecular(0.1,0.1,0.1,1);
	this.bodyMaterial_text3.setShininess(1);
	this.bodyMaterial_text3.loadTexture("../resources/images/fcporto.jpeg")

	this.legMaterial_text3 = new CGFappearance(this.scene);
	this.legMaterial_text3.setDiffuse(1,1,1,1);
	this.legMaterial_text3.setSpecular(0.1,0.1,0.1,1);
	this.legMaterial_text3.setShininess(1);
	this.legMaterial_text3.loadTexture("../resources/images/blueTexture.jpg")

	this.armMaterial_text3 = new CGFappearance(this.scene);
	this.armMaterial_text3.setDiffuse(1,1,1,1);
	this.armMaterial_text3.setSpecular(0.1,0.1,0.1,1);
	this.armMaterial_text3.setShininess(1);
	this.armMaterial_text3.loadTexture("../resources/images/blueAndWhiteTexture.jpg")

	this.armMaterial_2_text3 = new CGFappearance(this.scene);
	this.armMaterial_2_text3.setDiffuse(1,1,1,1);
	this.armMaterial_2_text3.setSpecular(0.1,0.1,0.1,1);
	this.armMaterial_2_text3.setShininess(1);
	this.armMaterial_2_text3.loadTexture("../resources/images/blueTexture.jpg")
	//finished loading all the materials for the third texture

	this.hookMaterial = new CGFappearance(this.scene);
	this.hookMaterial.setDiffuse(1,1,1,1);
	this.hookMaterial.setSpecular(0.1,0.1,0.1,1);
	this.hookMaterial.setShininess(1);
	this.hookMaterial.loadTexture("../resources/images/ropeTexture.jpg")

	this.bodyMaterial = [this.bodyMaterial_text1, this.bodyMaterial_text2, this.bodyMaterial_text3];
	this.legMaterial = [this.legMaterial_text1, this.legMaterial_text2, this.legMaterial_text3];
	this.armMaterial = [this.armMaterial_text1, this.armMaterial_text2, this.armMaterial_text3];
	this.armMaterial_2 = [this.armMaterial_2_text1, this.armMaterial_2_text2, this.armMaterial_2_text3];

 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function(){

	this.scene.pushMatrix();

		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.rotate(this.inclination, 1, 0, 0);
		this.scene.scale(0.5, 0.5, 0.5);

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
 			this.scene.translate(0, 0, -3);
 			this.scene.scale(0.2, 0.2, 2);
 			this.armMaterial[this.scene.textures].apply();
 			this.arms_1.display();
 		this.scene.popMatrix();

 		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, 0, -3);
			this.scene.scale(0.2, 0.2, 2);
 			this.armMaterial[this.scene.textures].apply();
			this.arms_2.display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.translate(0, 0.5, 3);
 	 		this.armMaterial_2[this.scene.textures].apply();
			this.droneArms[0].display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		 this.scene.pushMatrix();
			this.scene.translate(0, 0.5, -3);
 	 		this.armMaterial_2[this.scene.textures].apply();
			this.droneArms[1].display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.translate(3, 0.5, 0);
 	 		this.armMaterial_2[this.scene.textures].apply();
			this.droneArms[2].display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.translate(-3, 0.5, 0);
 	 		this.armMaterial_2[this.scene.textures].apply();
			this.droneArms[3].display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 1, 0 , 0);
 			this.bodyMaterial[this.scene.textures].apply();
			this.droneBody.display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, -1, 1);
 			this.legMaterial[this.scene.textures].apply();
			this.leftLeg.display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, -1, -1);
 			this.legMaterial[this.scene.textures].apply();
			this.rightLeg.display();
		this.scene.popMatrix();

	this.scene.popMatrix();

	this.scene.materialDefault.apply();

	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y + 1, this.z);
		this.hookMaterial.apply();
		this.hook.display();
	this.scene.popMatrix();

	this.scene.materialDefault.apply();
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

	this.movingLeft = true;
 };

 MyDrone.prototype.startTurnRight = function() {
	this.droneArms[0].setVelocity(this.speed[0]);
	this.droneArms[1].setVelocity(this.speed[0]);
	this.droneArms[2].setVelocity(-this.speed[2]);
	this.droneArms[3].setVelocity(-this.speed[2]);

	this.movingRight = true;
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

	//this.y += 0.1;
	this.movingUp = true;
 };

 MyDrone.prototype.startMoveDown = function() {
	this.droneArms[0].setVelocity(this.speed[0]);
	this.droneArms[1].setVelocity(this.speed[0]);
	this.droneArms[2].setVelocity(-this.speed[0]);
	this.droneArms[3].setVelocity(-this.speed[0]);

	//this.y -= 0.1;
	this.movingDown = true;
 };

 MyDrone.prototype.startRetractHook = function() {
	this.retractingHook = true;

	//this.hook.retract();
 };

 MyDrone.prototype.startExtendHook = function() {
 	this.extendingHook = true;
	// this.hook.extend();
 };

  MyDrone.prototype.stopTurnLeft = function() {
	this.resetMovement();

	this.movingLeft = false;
 };

 MyDrone.prototype.stopTurnRight = function() {
	this.resetMovement();

	this.movingRight = false;
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

	//this.y += 0.1;
	this.movingUp = false;
 };

 MyDrone.prototype.stopMoveDown = function() {
	this.resetMovement();

	//this.y -= 0.1;
	this.movingDown = false;
 };

 MyDrone.prototype.stopRetractHook = function() {
	this.retractingHook = false;
	// this.hook.retract();
 };

 MyDrone.prototype.stopExtendHook = function() {
 	this.extendingHook = false;
	//this.hook.extend();
 };

 MyDrone.prototype.update = function(deltaTime, helixSpeed) {
	this.x += this.velX*deltaTime;
	this.z += this.velZ*deltaTime;
	this.y += this.velY*deltaTime;
	this.hook.updateY(deltaTime);
	this.angle += this.velRot*deltaTime;

	this.velX *= (1-this.attrition);
	this.velZ *= (1-this.attrition);
	this.velY *= (1-this.attrition);
	this.velRot *= (1- this.attrition);
	this.hook.velY *= (1-this.attrition);

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

	if(this.movingLeft){
		this.velRot += 4*Math.PI/32;
	}
	else if(this.movingRight){
		this.velRot -= 4*Math.PI/32; 
	}

	if(this.movingUp){
		this.velY += 0.5;
	}
	else if(this.movingDown){
		this.velY -= 0.5;
	}

	if(this.retractingHook){
		this.hook.retract();
	}
	else if(this.extendingHook){
		this.hook.extend();
	}

	for(var i = 0; i < this.droneArms.length; i++) {
		this.droneArms[i].update(deltaTime, helixSpeed);
	}
	
	this.hook.update(deltaTime, this.x, this.y, this.z);
 };
