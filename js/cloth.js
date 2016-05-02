/* Globals:  THREE */

/*
 * Cloth Simulation using a relaxed constrains solver
 */

// Suggested Readings

// Advanced Character Physics by Thomas Jakobsen Character
// http://freespace.virgin.net/hugo.elias/models/m_cloth.htm
// http://en.wikipedia.org/wiki/Cloth_modeling
// http://cg.alexandra.dk/tag/spring-mass-system/
// Real-time Cloth Animation http://www.darwin3d.com/gamedev/articles/col0599.pdf

goog.provide('diem.Cloth');

goog.require('diem.Particle');
goog.require('diem.Fabric');

diem.Cloth = function(camera) {
  this.raycaster_ = new THREE.Raycaster();
  this.camera_ = camera;
  this.person_ = null;
  this.lastTime_ = 0;
  this.w = 10;
  this.h = 10;
  this.pins_ = [0, Math.floor(this.w/2), this.w];

  this.fabric_ = new diem.Fabric();

  var particles = [];
  var constrains = [];

  var u, v;

  // Create particles
  for (v = 0; v <= this.h; v++) {
    for (u = 0; u <= this.w; u++) {
      particles.push(
	new diem.Particle(u / this.w, v / this.h, 0, this.fabric_)
     );
    }
  }

  // Structural
  for (v = 0; v < this.h; v ++) {
    for (u = 0; u < this.w; u ++) {
      constrains.push([
	particles[this.index_(u, v) ],
	particles[this.index_(u, v + 1) ],
	this.fabric_.getRestDistance()
      ]);

      constrains.push([
	particles[this.index_(u, v) ],
	particles[this.index_(u + 1, v) ],
	this.fabric_.getRestDistance()
      ]);
    }
  }

  for (u = this.w, v = 0; v < this.h; v ++) {
    constrains.push([
      particles[this.index_(u, v) ],
      particles[this.index_(u, v + 1) ],
      this.fabric_.getRestDistance()
    ]);
  }

  for (v = this.h, u = 0; u < this.w; u ++) {
    constrains.push([
      particles[this.index_(u, v) ],
      particles[this.index_(u + 1, v) ],
      this.fabric_.getRestDistance()
    ]);
  }

  this.particles = particles;
  this.constrains = constrains;
};

diem.Cloth.prototype.index_ = function(u, v) {
  return u + v * (this.w + 1);
};

var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

var tmpForce = new THREE.Vector3();
var diff = new THREE.Vector3();
var FLOOR = 0;

function satisifyConstrains(p1, p2, distance) {
  diff.subVectors(p2.position, p1.position);
  var currentDist = diff.length();
  if (currentDist === 0) return; // prevents division by 0
  var correction = diff.multiplyScalar(1 - distance / currentDist);
  var correctionHalf = correction.multiplyScalar(0.5);
  p1.position.add(correctionHalf);
  p2.position.sub(correctionHalf);
}

diem.Cloth.prototype.setPerson = function(person) {
  this.person_ = person;
};

diem.Cloth.prototype.simulate = function(time) {
  if (this.lastTime_ == 0) {
    this.lastTime_ = time;
    return;
  }

  // Aerodynamics forces
  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles[i];
    particle.addForce(this.fabric_.getGravity());
    particle.integrate(TIMESTEP_SQ);
  }

  // Start Constrains
  for (i = 0; i < this.constrains.length; i++) {
    var constrain = this.constrains[i];
    satisifyConstrains(constrain[0], constrain[1], constrain[2]);
  }

  // Floor Constains
  for (i = 0; i < this.particles.length; i++) {
    particle = this.particles[i];
    var pos = particle.position;
    if (pos.y < FLOOR) {
      pos.y = FLOOR;
    }
  }

  // Human
  if (this.person_ != null) {
    for (i = 0; i < this.particles.length; i++) {
      particle = this.particles[i];
      pos = particle.position;
      // Look at the camera from this particle of fabric.
      this.raycaster_.set(pos, this.camera_.getWorldDirection().negate());
      // children[0] is the whole body.
      var intersections = this.raycaster_.intersectObject(this.person_.children[0]);
      if (intersections.length % 2 == 1) {
        // We're inside a body.
        pos.copy(intersections[0].point);
      }
    }
  }

  // Pin Constrains
  for (i = 0; i < this.pins_.length; i++) {
    var xy = this.pins_[i];
    var p = this.particles[xy];
    p.position.copy(p.original);
    p.previous.copy(p.original);
  }
};
