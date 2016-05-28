/**
 * MyHook
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHook(scene, x, y, z, height) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;
	this.velY = 0;
	this.height = height;
	this.attached = null;

	this.cable = new MyFullCylinder(scene, 3, 5);
	this.grip = new MyGrip(scene);

	this.gripMaterial = new CGFappearance(scene);
	this.gripMaterial.setSpecular(0.1,0.1,0.1,1);
	this.gripMaterial.setShininess(1);
	this.gripMaterial.setDiffuse(1,1,1,1);
	this.gripMaterial.loadTexture("../resources/images/metalicTexture.jpg");

};

MyHook.prototype = Object.create(CGFobject.prototype);
MyHook.prototype.constructor=MyHook;

MyHook.prototype.retract = function() {
	this.velY -= 0.5;
};

MyHook.prototype.extend = function() {
	this.velY += 0.5;
};

MyHook.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(0, -1, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.1, 0.1, this.height/5);
		this.cable.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0, -1-this.height, 0);
		this.scene.rotate(this.angle, 0 ,1,0);
		this.scene.scale(1, 0.5, 1);
		this.gripMaterial.apply();
		this.grip.display();
	this.scene.popMatrix();

	this.scene.defaultMaterial.apply();
};

MyHook.prototype.update = function(deltaTime, x, y, z, angle) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.velY *= (1 - ATTRITION);
	this.height += this.velY*deltaTime;
	this.angle = angle;

	if(this.height < 1)
		this.height = 1;

	for(var i = 0; i < this.scene.weights.length; i++) {
		if(this.attached === null) {
			if(Math.abs(this.scene.weights[i].x - this.x) < TOLERANCE &&
			 Math.abs(this.scene.weights[i].y + this.scene.weights[i].height/2 - this.y + this.height + 1) < TOLERANCE && 
			 Math.abs(this.scene.weights[i].z - this.z) < TOLERANCE && 
			 !this.scene.weights[i].isAtDestination()) {
				this.attached = this.scene.weights[i];
				this.grip.close();
			 }
		} else {
			if(this.attached.isAtDestination()) {
				this.attached = null;
				this.grip.open();
			} else {
				this.attached.setPosition(this.x, this.y-this.height-1, this.z);	
			}
		}			
	}

	this.grip.update(deltaTime);
};