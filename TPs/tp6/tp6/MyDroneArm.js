/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDroneArm(scene) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.angle = 0;
	this.velocity = 1;
	
	this.helix = new MyHelix(scene);
	this.cylinder = new MyFullCylinder(scene, 20, 1);
	this.top = new MySemiSphere(scene, 80, 200);
};

MyDroneArm.prototype = Object.create(CGFobject.prototype);
MyDroneArm.prototype.constructor=MyDroneArm;

MyDroneArm.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.25, 0.25, 0.75);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0, 1, 0);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.rotate(-Math.PI/2, 1, 0 , 0);
		this.top.display();
	this.scene.popMatrix();
}

MyDroneArm.prototype.setVelocity = function(velocity) {
	this.velocity = velocity;
}

MyDroneArm.prototype.update = function(deltaTime, helixSpeed) {
	this.angle += 2*Math.PI*deltaTime*this.velocity*helixSpeed;
}

