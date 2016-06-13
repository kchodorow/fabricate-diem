/* global THREE */

goog.provide('diem.Particle');

goog.require('diem.Fabric');

var restDistance = 1;

/**
 * @constructor
 */
diem.Particle = function(x, y, z, fabric) {
  this.position = new THREE.Vector3(x, y, z);
  this.previous = new THREE.Vector3(x, y, z);
  this.original = new THREE.Vector3(x, y, z);
  this.a = new THREE.Vector3(0, 0, 0); // acceleration
  this.mass = fabric.getMass();
  this.invMass = 1 / fabric.getMass();
  this.tmp = new THREE.Vector3();
  this.tmp2 = new THREE.Vector3();
  this.constraints_ = [];
};

diem.Particle.DAMPING = 0.03;
diem.Particle.DRAG = 1 - diem.Particle.DAMPING;

// Force -> Acceleration
diem.Particle.prototype.addForce = function(force) {
  this.a.add(
    this.tmp2.copy(force).multiplyScalar(this.invMass)
 );
};

/**
 * @constructor
 */
diem.Particle.Constraint = function(particle, dist, satisfy) {
  this.particle = particle;
  this.dist = dist;
  this.satisfy = satisfy;
};

diem.Particle.prototype.addConstraint = function(particle, dist, satisfy) {
  this.constraints_.push(new diem.Particle.Constraint(particle, dist, satisfy));
};

diem.Particle.prototype.clearConstraints = function() {
  for (var i = 0; i < this.constraints_.length; ++i) {
    var otherConstraint = this.constraints_[i];
    if (otherConstraint == null) {
      continue;
    }
    var other = otherConstraint.particle;
    for (var j = 0; j < other.constraints_.length; ++j) {
      if (other.constraints_[j] == null) {
        continue;
      }
      if (other.constraints_[j].particle == this) {
        other.constraints_[j] = null;
        break;
      }
    }
    this.constraints_[i] = null;
  }
};

/**
 * Finds the vector from p2 -> p1.
 * Scales that vector by the ratio of the resting distance to the vector's length.
 * Adds half of that to p1, subtracts half of that from p2.
 *
 * Example:
 * p1: (20, 20)
 * p2: (20, 32)
 * rest: 10
 * current: 12
 * diff: (0, 12)
 * correction = (0, 12) * (1 - 5/6 = 1/6) = (0, 2)
 * p1 -> (20, 21)
 * p2 -> (20, 31)
 */
diem.Particle.prototype.satisfyConstraints = function() {
  var diff = new THREE.Vector3();
  for (var i = 0; i < this.constraints_.length; ++i) {
    var constraint = this.constraints_[i];
    if (constraint == null || !constraint.satisfy) {
      // This a duplicate constraint, skip.
      continue;
    }
    var p2 = constraint.particle;
    var restDistance = constraint.dist;
    diff.subVectors(p2.position, this.position);
    var currentDist = diff.length();
    if (currentDist === 0) {
      continue; // prevents division by 0
    }
    var correction = diff.multiplyScalar(1 - (restDistance / currentDist));
    var correctionHalf = correction.multiplyScalar(0.5);
    this.position.add(correctionHalf);
    p2.position.sub(correctionHalf);
  }
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
