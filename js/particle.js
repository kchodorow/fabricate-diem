goog.provide('diem.Particle');

goog.require('diem.Fabric');

var restDistance = 1;

var xSegs = 10;
var ySegs = 10;

function plane(width, height) {
  return function(u, v) {

    var x = (u - 0.5) * width;
    var y = (v + 0.5) * height;
    var z = 0;

    return new THREE.Vector3(x, y, z);
  };
}

var clothFunction = plane(restDistance * xSegs, restDistance * ySegs);

diem.Particle = function(x, y, z, fabric) {
  this.position = clothFunction(x, y); // position
  this.previous = clothFunction(x, y); // previous
  this.original = clothFunction(x, y);
  this.a = new THREE.Vector3(0, 0, 0); // acceleration
  this.mass = fabric.getMass();
  this.invMass = 1 / fabric.getMass();
  this.tmp = new THREE.Vector3();
  this.tmp2 = new THREE.Vector3();
};

diem.Particle.DAMPING = 0.1;
diem.Particle.DRAG = 1 - diem.Particle.DAMPING;

// Force -> Acceleration
diem.Particle.prototype.addForce = function(force) {
  this.a.add(
    this.tmp2.copy(force).multiplyScalar(this.invMass)
 );
};

// Performs verlet integration
/**
 * Gets the vector pointing from the previous pos to the current one.
 * Multiplies that by the drag and adds it to the current position.
 * Then adds the
 * Example:
 * prev: (0, 12)
 * pos: (0, 10)
 * newPos = (0, 2)
 *
 */
diem.Particle.prototype.integrate = function(timesq) {
  var velocity = this.tmp.subVectors(this.position, this.previous);
  var newPos = velocity.multiplyScalar(diem.Particle.DRAG).add(this.position);
  newPos.add(this.a.multiplyScalar(timesq));

  this.tmp = this.previous;
  this.previous = this.position;
  this.position = newPos;

  this.a.set(0, 0, 0);
};
