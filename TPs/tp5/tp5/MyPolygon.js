/**
 * MyPolygon
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPolygon(scene, sides) {
	CGFobject.call(this,scene);

	this.sides = sides;

	this.initBuffers();
};

MyPolygon.prototype = Object.create(CGFobject.prototype);
MyPolygon.prototype.constructor=MyPolygon;

MyPolygon.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	for(var i = 0; i < this.sides; i++) {
		this.vertices.push(Math.cos(2*i*Math.PI/this.sides), Math.sin(2*i*Math.PI/this.sides), 0);
	}

	this.vertices.push(0, 0, 0);

	for(var i = 0; i < this.sides - 1; i++) {
		this.indices.push(i, i + 1, this.sides);
	}

	this.indices.push(this.sides - 1, 0, this.sides);

	for(var i = 0; i <= this.sides; i++) {
		this.normals.push(0, 0, 1);
	}

	for(var i = 0; i < this.sides; i++) {
		this.texCoords.push(0.5 + Math.cos(2*i*Math.PI/this.sides)/2, 0.5 - Math.sin(2*i*Math.PI/this.sides)/2);
	}
	this.texCoords.push(0.5, 0.5);

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};