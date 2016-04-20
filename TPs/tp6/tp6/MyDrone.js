/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
	
	this.scene = scene;

	this.attrition = 0.1;

	this.velX = 0;
	this.velY = 0;
	this.velZ = 0;
	this.x = 4.5;
	this.y = 4.5;
	this.z = 7;
	this.angle = Math.PI;

 	this.initBuffers();
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.initBuffers = function() {
	this.vertices = [ 0.5, 0.3, 0,
					-0.5, 0.3, 0,
					0, 0.3, 2 ];

	this.indices = [0, 1, 2];

	this.normals = [0, 1, 0,
					0, 1, 0,
					0, 1, 0];
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyDrone.prototype.print = function() {
 		if(this.velX > 0)
 			this.velX -= this.attrition;
 		else if(this.velX < 0) 
 			this.velX += this.attrition;	

 		if(this.velZ > 0)
 			this.velZ -= this.attrition;
 		else if(this.velZ < 0) 
 			this.velZ += this.attrition;	
 			
 		this.x += this.velX;
		this.y += this.velZ;
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.angle, 0, 1, 0);1
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
 	this.velX += Math.sin(this.angle);
	this.velZ += Math.cos(this.angle);
 };

 MyDrone.prototype.moveUp = function() {
	this.y += 0.1;
 };

 MyDrone.prototype.moveDown = function() {
	this.y -= 0.1;
 };