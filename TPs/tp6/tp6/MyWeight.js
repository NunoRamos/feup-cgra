/**
 * MyWeight
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWeight(scene, x, y, z, destination) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;
	this.destination = destination;

	this.height = 0.5;

	this.weight = new MyUnitCubeQuad(scene);
	this.rightArch = new MyDroneLegArch(scene, 10);
	this.leftArch = new MyDroneLegArch(scene, 10);
};

MyWeight.prototype = Object.create(CGFobject.prototype);
MyWeight.prototype.constructor=MyWeight;

MyWeight.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);

		this.scene.pushMatrix();
			this.scene.scale(0.5, this.height, 0.5);
			this.weight.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			//this.scene.translate(0, 0, 0);
			this.scene.scale(0.1, 0.1, 0.5);

			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 0, 0, 1);
				this.scene.translate(6, 0, 0);
				this.rightArch.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.translate(-6, 0, 0);
				this.leftArch.display();
			this.scene.popMatrix();

		this.scene.popMatrix();

	this.scene.popMatrix();

	this.destination.display();
};

MyWeight.prototype.setPosition = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;	
};

MyWeight.prototype.isAtDestination = function(tolerance) {
	return (Math.abs(this.x - this.destination.x) < tolerance &&
			Math.abs(this.y - this.height - this.destination.y) < tolerance &&
			Math.abs(this.z - this.destination.z) < tolerance);
}