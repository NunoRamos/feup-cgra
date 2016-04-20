/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyAirPlane(scene, x, y) {
	CGFobject.call(this,scene);
	
	this.x = x;
	this.y = y;

	this.isFlyingVertical = false;

	this.rectangle =  new MyPolygon(this.scene, 4);
	this.triangle = new MyPolygon(this.scene, 3);
	
};

MyAirPlane.prototype = Object.create(CGFobject.prototype);
MyAirPlane.prototype.constructor=MyAirPlane;

MyAirPlane.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/4, 0, 0, 1);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 1, 0);
		this.rectangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.5, 1.5, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.triangle.display();
	this.scene.popMatrix();

}

MyAirPlane.prototype.update = function(currTime) {

		if(this.x>=0.4){
			this.x -= 0.2;
		}
		else{ 
			if(this.y>=0.4){
				this.isFlyingVertical = true;
				this.y -= 0.2;
			}
			else {
				this.isFlyingVertical = false;
			}
		}
}
