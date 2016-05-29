/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyDroneLegArch(scene, slices) {
	CGFobject.call(this,scene);

	this.slices = slices;

	this.initBuffers();
};

MyDroneLegArch.prototype = Object.create(CGFobject.prototype);
MyDroneLegArch.prototype.constructor=MyDroneLegArch;

MyDroneLegArch.prototype.initBuffers = function () {
	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

 	var patchLengthx = 1 / this.slices;
 	var patchLengthy = 1;
 	var xCoord =0;
 	var yCoord =0;
	var ang=Math.PI/this.slices + Math.PI/16/this.slices;

	for(i = 0; i <= 2; i++) {
		for(j = 0; j < this.slices; j++) {
			this.vertices.push(Math.cos(ang*j),Math.sin(ang*j),i * 0.1);
			this.normals.push(Math.cos(ang*j),Math.sin(ang*j),0);
			this.texCoords.push(xCoord, yCoord);
			xCoord += patchLengthx;
		}
		xCoord =0;
		yCoord += patchLengthy;
	}

	for(i = 0; i < 2; i++) {
		for(j = 0; j < this.slices - 1  ; j++) {
			this.indices.push(i*this.slices + j, i*this.slices + j+1, (i+1)*this.slices + j);
			this.indices.push(i*this.slices + j+1, (i+1)*this.slices + j+1, (i+1)*this.slices + j);

			this.indices.push(i*this.slices + j+1, i*this.slices + j, (i+1)*this.slices + j);
			this.indices.push((i+1)*this.slices + j+1, i*this.slices + j+1, (i+1)*this.slices + j);
		}
		
	}

	this.indices.push()

		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};