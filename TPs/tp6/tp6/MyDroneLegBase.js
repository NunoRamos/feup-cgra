/**
 * MyDroneLegBase
 * @constructor
 */
 function MyDroneLegBase(scene) {
 	CGFobject.call(this,scene);
	
	this.scene = scene;

	this.legBase = new MyUnitCubeQuad(scene);
 };

 MyDroneLegBase.prototype = Object.create(CGFobject.prototype);
 MyDroneLegBase.prototype.constructor = MyDroneLegBase;

 MyDroneLegBase.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(0.05, 0.05, 2);
		this.legBase.display();
	this.scene.popMatrix();
 };