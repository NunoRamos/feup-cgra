/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,	//0
            -0.5, -0.5, 0.5,	//1
            0.5, -0.5, -0.5,	//2
            0.5, -0.5, 0.5,		//3
            -0.5, 0.5, -0.5,	//4
            -0.5, 0.5, 0.5,		//5
            0.5, 0.5, 0.5,		//6
            0.5, 0.5, -0.5		//7
			];

	this.indices = [
			2, 1, 0,
			3, 1, 2,
			0, 1, 5,
			0, 5, 4,
			1, 3, 6,
			5, 1, 6,
			6, 3, 2,
			2, 7, 6,
			6, 7, 5,
			4, 5, 7,
			0, 7, 2,
			4, 7, 0
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
