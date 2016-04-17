/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
	
	var ang = (2*Math.PI)/this.slices;
	var angVer = (Math.PI/2)/this.stacks;
	var shrinkPerStack = 1/this.stacks;

	for(i = 0; i <= this.stacks; i++) {
		for(j = 0; j < this.slices; j++) {
			this.vertices.push(Math.cos(angVer*i)*Math.cos(ang*j),Math.cos(angVer*i)*Math.sin(ang*j),Math.sin(angVer*i));
			this.normals.push(Math.cos(angVer*i)*Math.cos(ang*j),Math.cos(angVer*i)*Math.sin(ang*j),Math.sin(angVer*i));
		}
	}
		
	for(i = 0; i < this.stacks; i++) {
		for(j = 0; j < this.slices - 1; j++) {
			this.indices.push(i*this.slices + j, i*this.slices + j+1, (i+1)*this.slices + j);
			this.indices.push(i*this.slices + j+1, (i+1)*this.slices + j+1, (i+1)*this.slices + j);
		}

		this.indices.push(i*this.slices + this.slices - 1, i*this.slices, (i+1)*this.slices + this.slices - 1);
		this.indices.push(i*this.slices, i*this.slices + this.slices, (i+1)*this.slices + this.slices - 1);
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
