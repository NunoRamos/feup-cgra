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

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];
	
	var patchLengthx = 1 / this.slices;
 	var patchLengthy = 1 / this.stacks;
 	var xCoord =0;
 	var yCoord =0;
	var ang=(2*Math.PI)/this.slices;

	for(i = 0; i <= this.stacks; i++) {
		for(j = 0; j < this.slices; j++) {
			this.vertices.push(Math.cos(ang*j),Math.sin(ang*j),i);
			this.vertices.push(Math.cos(ang*(j+1)),Math.sin(ang*(j+1)),i);
			this.normals.push(Math.cos(ang*(j+0.5)),Math.sin(ang*(j+0.5)),0);
			this.normals.push(Math.cos(ang*(j+0.5)),Math.sin(ang*(j+0.5)),0);
			this.texCoords.push(xCoord, yCoord);
			xCoord += patchLengthx;
			this.texCoords.push(xCoord, yCoord);
		}
		xCoord = 0;
		yCoord += patchLengthy;
	}
		
	for(i = 0; i < this.stacks; i++) {
		for(j = 0; j < this.slices; j++) {
			this.indices.push(i*this.slices*2 + j*2, i*this.slices*2 + j*2+1, (i+1)*this.slices*2 + j*2);
			this.indices.push(i*this.slices*2 + j*2+1, (i+1)*this.slices*2 + j*2+1, (i+1)*this.slices*2 + j*2);
		}
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
