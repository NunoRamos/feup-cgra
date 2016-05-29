var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var ATTRITION = 0.2;
var TOLERANCE = 0.5;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.lastUpdateTime = (new Date()).getTime();

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,-1,2,-1,2);
	this.floor = new MyQuad(this,0,10,0,12);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.defaultMaterial = new CGFappearance(this);

	this.materialC = new CGFappearance(this);
	this.materialC.setDiffuse(0,0.498,1,1);
	this.materialC.setShininess(120);

	this.materialE = new CGFappearance(this);
	this.materialE.setDiffuse(0.627,0.322,0.176,1);	
	this.materialE.setShininess(30);

	this.floorMaterial = new CGFappearance(this);
	this.floorMaterial.loadTexture("../resources/images/floor.png");

	this.wallMaterial = new CGFappearance(this);
	this.wallMaterial.loadTexture("../resources/images/window.png");

	this.leftBoardMaterial = new CGFappearance(this);
	this.leftBoardMaterial.setSpecular(0.1,0.1,0.1,1);
	this.leftBoardMaterial.setShininess(1);
	this.leftBoardMaterial.setDiffuse(1,1,1,1);
	this.leftBoardMaterial.loadTexture("../resources/images/slides.png");

	this.rightBoardMaterial = new CGFappearance(this);
	this.rightBoardMaterial.setSpecular(0.5,0.5,0.5,1);
	this.rightBoardMaterial.setShininess(200);
	this.rightBoardMaterial.setDiffuse(1,1,1,1);
	this.rightBoardMaterial.loadTexture("../resources/images/board.png");

	this.cylinderMaterial = new CGFappearance(this);
	this.cylinderMaterial.setSpecular(0.5,0.5,0.5,1);
	this.cylinderMaterial.setShininess(20);
	this.cylinderMaterial.setDiffuse(1,1,1,1);
	this.cylinderMaterial.loadTexture("../resources/images/marmore.png");

	this.prismMaterial = new CGFappearance(this);
	this.prismMaterial.setSpecular(0.5,0.5,0.5,1);
	this.prismMaterial.setShininess(20);
	this.prismMaterial.setDiffuse(1,1,1,1);
	this.prismMaterial.loadTexture("../resources/images/barrel.png");

	this.prism = new MyPrism(this,8,3);
	this.cylinder = new MyCylinder(this,8,3);
	this.lamp = new MyLamp( this, 8, 20);
	this.clock = new MyClock(this);
	this.airPlane = new MyAirPlane(this, 12, 3.5);
	this.drone = new MyDrone(this, 10, 8, 6);
	this.arch = new MyDroneLegArch(this, 20);
	this.weights = [];

	this.weights.push(new MyWeight(this, 5, 3.8, 8.5, new MyDestination(this, 12, 3.05, 8)));
	this.weights.push(new MyWeight(this, 12, 3.8, 8.5, new MyDestination(this, 5, 3.05, 8)));

	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.clockAnimated = true;

	this.textures = 0;
	this.speed = 1;
	this.setUpdatePeriod(20);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	// Positions for four lights
	this.lights[0].setPosition(4, 10, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[1].setPosition(10.5, 10, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 10, 10.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);

	this.lights[3].setPosition(4, 10, 10.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,1,1);

	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,1,1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[4].setPosition(1, 5, 7.5, 1.0);
	this.lights[4].setVisible(true); // show marker on light position (different from enabled)
	//this.lights[4].setSpecular(1,1,1,1);
	this.lights[4].setDiffuse(1, 1, 1, 1.0);
	this.lights[4].setConstantAttenuation(0);
	this.lights[4].setLinearAttenuation(1);
	this.lights[4].setQuadraticAttenuation(0);
	this.lights[4].enable();

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	if(this.light0)
		this.lights[0].enable();
	else
		this.lights[0].disable();

	if(this.light1)
		this.lights[1].enable();
	else
		this.lights[1].disable();
		
	if(this.light2)
		this.lights[2].enable();
	else
		this.lights[2].disable();
		
	if(this.light3)
		this.lights[3].enable();
	else
		this.lights[3].disable();
		
	if(this.light4)
		this.lights[4].enable();
	else
		this.lights[4].disable();
		
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

	this.defaultMaterial.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorMaterial.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.wallMaterial.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.wallMaterial.apply();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();
	this.defaultMaterial.apply();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialC.apply();
		this.wall.display();
	this.popMatrix();

	this.defaultMaterial.apply();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();   
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.leftBoardMaterial.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.rightBoardMaterial.apply();
		this.boardB.display();
	this.popMatrix();

	this.defaultMaterial.apply();
	
	// Lamp
	this.pushMatrix();
		this.translate(6, 10, 6);
		this.rotate(Math.PI/2,1,0,0);
		this.lamp.display();
	this.popMatrix();
	
	this.pushMatrix();
		this.rotate(-90 * degToRad,1,0,  0);
		this.scale(1,1, 0.1);
		this.translate(2,-2,0);
		this.materialE.apply();
		this.cylinder.display();
	this.popMatrix();

	this.defaultMaterial.apply();

	// 	Prism
	this.pushMatrix();
		this.translate(3,0,3);
		this.rotate(-Math.PI/2,1,0,0);
		this.prismMaterial.apply();
		this.prism.display();
	this.popMatrix();

	// Cylinder
	this.pushMatrix();
		this.translate(0,0,14);
		this.scale(1,3,1);
		this.rotate(-Math.PI/2,1,0,0);
		this.cylinderMaterial.apply();
		this.cylinder.display();
	this.popMatrix();

	this.defaultMaterial.apply();
	
	this.pushMatrix();
		this.scale(1,1,0.4);
		this.translate(7,8,0.4);
		this.clock.display();
	this.popMatrix();

	this.defaultMaterial.apply();

	//Plane
	this.pushMatrix();
		this.translate(this.airPlane.x, this.airPlane.y, 8);
		if(this.airPlane.isFlyingVertical){
			this.rotate(Math.PI/2, 0, 0, 1);
			this.rotate(Math.PI, 1, 0, 0);
		}
	
		this.scale(1, 0.3, 1);
		this.rotate(Math.PI, 0, 1 ,0);
		this.translate(-1.5,0,0);
		this.airPlane.display();
	this.popMatrix();

	//Drone
	this.pushMatrix();
		this.drone.display();
	this.popMatrix();

	for(var i = 0; i < this.weights.length; i++) {
		this.pushMatrix();
			this.weights[i].display();
		this.popMatrix();	
	}

	/*this.pushMatrix();
		this.rotate(Math.PI, 0, 1, 0);
		this.arch.display();
	this.popMatrix();*/

	this.defaultMaterial.apply();

	// ---- END Primitive drawing section
};

LightingScene.prototype.update = function(currTime) {
	deltaTime = (currTime - this.lastUpdateTime)/1000;
	this.lastUpdateTime = currTime;
	if(this.clockAnimated)
		this.clock.update(deltaTime);
	this.airPlane.update(currTime);
	this.drone.update(deltaTime, this.speed);
};

LightingScene.prototype.clockAnimation = function () { 
	this.clockAnimated = !this.clockAnimated;
};
