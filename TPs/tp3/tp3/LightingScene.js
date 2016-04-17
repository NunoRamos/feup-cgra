var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.prism = new MyPrism(this, 8, 20);
	this.cilinder = new MyCilinder(this, 8, 20);
	this.lamp = new MyLamp(this, 8, 20);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	// Positions for four lights
	this.lights[0].setPosition(0, 6, 0, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lights[0].setDiffuse(1, 1, 1, 1);
	this.lights[0].enable();
		
	this.lights[1].setPosition(4, 6, 0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[1].setDiffuse(1, 1, 1, 1);
	this.lights[1].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	/*this.prism.display();

	this.pushMatrix();
	this.translate(4, 0, 0);
	this.cilinder.display();
	this.popMatrix();*/

	this.lamp.display();
	// ---- END Primitive drawing section
};
