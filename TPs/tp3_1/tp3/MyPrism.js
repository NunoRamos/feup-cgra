/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	//var vertices = new Array();

 	/*this.vertices = [
 	-0.5, -0.5, 0,
 	0.5, -0.5, 0,
 	-0.5, 0.5, 0,
 	0.5, 0.5, 0
 	];*/

 	//this.slices = 8;
	this.vertices = [];
	this.normals = [];
	this.indices = [];

	var ang = 2*Math.PI/this.slices;

	for(var i = 0; i < this.stacks; i++) {
		for(var j = 0; j < this.slices; j++) {
 			this.vertices.push(0.5*Math.cos(ang*j), 0.5*Math.sin(ang*j), i*1);
 			this.vertices.push(0.5*Math.cos(ang*(j+1)), 0.5*Math.sin(ang*(j+1)), i*1);
 			this.normals.push(Math.cos(ang*(j+0.5)), Math.sin(ang*(j+0.5)), 0);
 			this.normals.push(Math.cos(ang*(j+0.5)), Math.sin(ang*(j+0.5)), 0);
 			
 		}	
	}

	for(var i = 0; i < this.stacks; i++){
		for(var j = 0; j < this.slices; j++) {
			this.indices.push(this.slices*i+2*j, this.slices*i+2*j+1, this.slices*(i+1)+2*j);
 			this.indices.push(this.slices*i+2*j+1, this.slices*(i+1)+2*j+1, this.slices*(i+1)+2*j);
		}
	}

 	/*for(var i = 0; i < this.stacks - 1; i++) {
 		for(var j = 0; j < this.slices - 1; j++) {
 			this.indices.push(4*this.slices*i + j, 4*this.slices*i + (j+1), 4*this.slices*(i+1) + j);
 			this.indices.push(4*this.slices*i + (j+1), 4*this.slices*(i+1) + j, 4*this.slices*(i+1) + (j+1));
 		}
 	}*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
