/**
 * MyDodecagon
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyDodecagon(scene, sides) {
	CGFobject.call(this,scene);

	this.sides = sides;

	this.initBuffers();
};

MyDodecagon.prototype = Object.create(CGFobject.prototype);
MyDodecagon.prototype.constructor=MyDodecagon;

MyDodecagon.prototype.initBuffers = function () {
	this.texCoords = [ 0.5 + Math.cos(Math.PI/3), 0.5 + Math.sin(Math.PI/3),
						0.5 + Math.cos(2*Math.PI/3), 0.5 + Math.sin(2*Math.PI/3),
						0.5 + Math.cos(3*Math.PI/3), 0.5 + Math.sin(3*Math.PI/3),
						0.5 + Math.cos(4*Math.PI/3), 0.5 + Math.sin(4*Math.PI/3),
						0.5 + Math.cos(5*Math.PI/3), 0.5 + Math.sin(5*Math.PI/3),
						0.5 + Math.cos(6*Math.PI/3), 0.5 + Math.sin(6*Math.PI/3),
						0.5, 0, 0.5	];

	this.vertices = [ Math.cos(Math.PI/3), Math.sin(Math.PI/3), 0,
						Math.cos(2*Math.PI/3), Math.sin(2*Math.PI/3), 0,
						Math.cos(3*Math.PI/3), Math.sin(3*Math.PI/3), 0,
						Math.cos(4*Math.PI/3), Math.sin(4*Math.PI/3), 0,
						Math.cos(5*Math.PI/3), Math.sin(5*Math.PI/3), 0,
						Math.cos(6*Math.PI/3), Math.sin(6*Math.PI/3), 0,
						0, 0, 0];

	this.indices = [0, 1, 6,
					1, 2, 6,
					2, 3, 6,
					3, 4, 6,
					4, 5, 6,
					5, 0, 6];

	this.normals = [0, 0, 1,
					0, 0, 1,
					0, 0, 1,
					0, 0, 1,
					0, 0, 1,
					0, 0, 1,
					0, 0, 1];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};