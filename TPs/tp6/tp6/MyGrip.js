/**
 * MyGrip
 * @constructor
 */
 function MyGrip(scene) {
 	CGFobject.call(this,scene);

 	this.angle = 0;
 	this.vel = 0;
 	this.opening = false;
 	this.closing = false;
 	this.scene = scene;

	this.gripParts = [ new MyDroneLegArch(scene, 20),
						new MyDroneLegArch(scene, 20),
						new MyDroneLegArch(scene, 20),
						new MyDroneLegArch(scene, 20)];

	this.topGrip =  new MyFullCylinder(scene, 20, 1);	
 };

 MyGrip.prototype = Object.create(CGFobject.prototype);
 MyGrip.prototype.constructor = MyGrip;

MyGrip.prototype.open = function() {
	this.opening = true;
};

MyGrip.prototype.close = function() {
	this.closing = true;
};

MyGrip.prototype.update = function(deltaTime) {
	//this.angle += this.vel*deltaTime;
//	this.vel *= (1 - ATTRITION);

	if(this.opening) {
	//	this.vel -= 0.2
		this.angle -= 1*deltaTime;
	} else if(this.closing) {
	//	this.vel += 0.2
		this.angle += 1*deltaTime;
	}

	if(this.angle <= 0){
		this.angle = 0;
		this.opening = false;
	} else if(this.angle >= Math.PI/3) {
		this.angle = Math.PI/3;
		this.closing = false;
	}
};

 MyGrip.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(0, -1, -0.05);
		this.scene.scale(0.5, 1, 0.5);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.gripParts[0].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0 ,-1, -0.05);
		this.scene.scale(0.5 , 1 , 0.5);
		this.scene.rotate(-this.angle, 0, 0, 1);
		this.gripParts[1].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.05 ,-1, -0.05);
		this.scene.scale(0.5 , 1 , 0.5);
		this.scene.rotate(Math.PI/2, 0, 1,0);
		this.scene.rotate(-this.angle, 0, 0, 1);
		this.gripParts[2].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.05 ,-1, -0.05);
		this.scene.scale(0.5 , 1 , 0.5);
		this.scene.rotate(Math.PI/2, 0, 1,0);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.gripParts[3].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.1, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.1, 0.2, 0.2);
		this.topGrip.display();
	this.scene.popMatrix();
 };

