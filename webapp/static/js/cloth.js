/* global THREE */

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

goog.require('diem.Globals');
goog.require('diem.Part');
goog.require('diem.Particle');
goog.require('diem.Pin');
goog.require('diem.Fabric');

goog.require('goog.asserts');

/**
 * @constructor
 */
diem.Cloth = function() {
  this.diff_ = new THREE.Vector3();
  this.raycaster_ = new THREE.Raycaster();
  this.person_ = null;
  this.lastTime_ = 0;
  this.w = 10;
  this.h = 7;
  this.fabric_ = new diem.Fabric();
  this.particles = [];

  var neg = -0.1;
  for (var v = 0; v < this.h; ++v) {
    neg = v % 2 == 0 ? 0.1 : -0.1;
    for (var u = 0; u < this.w; ++u) {
      neg = -neg;
      this.particles.push(
	new diem.Particle(u, v, neg, this.fabric_)
     );
    }
  }

  this.pins_ = [
    new diem.Pin(this.particles[this.index_(0, this.h - 1)]),
    new diem.Pin(this.particles[this.index_(this.w - 1, this.h - 1)])];
  // this.handle_ = this.particles[this.index_(this.w, this.h)];
  this.handle_ = null;

  // Structural
  for (v = 0; v < this.h - 1; ++v) {
    for (u = 0; u < this.w - 1; ++u) {
      this.addConstraint(
	this.particles[this.index_(u, v)],
	this.particles[this.index_(u, v + 1)],
	this.fabric_.getRestDistance());

      this.addConstraint(
	this.particles[this.index_(u, v)],
	this.particles[this.index_(u + 1, v)],
	this.fabric_.getRestDistance());
    }
  }

  for (v = 0; v < this.h - 1; ++v) {
    this.addConstraint(
      this.particles[this.index_(this.w - 1, v)],
      this.particles[this.index_(this.w - 1, v + 1)],
      this.fabric_.getRestDistance());
  }

  for (u = 0; u < this.w - 1; ++u) {
    this.addConstraint(
      this.particles[this.index_(u, this.h - 1)],
      this.particles[this.index_(u + 1, this.h - 1)],
      this.fabric_.getRestDistance());
  }

  // Add diagonal struts for stability.
  for (v = 0; v < this.h - 1; v++) {
    for (u = 0; u < this.w - 1; u++) {
      this.addConstraint(
        this.particles[this.index_(u, v)],
        this.particles[this.index_(u+1, v+1)],
        this.fabric_.getRestDiagonal());

      this.addConstraint(
        this.particles[this.index_(u+1, v)],
        this.particles[this.index_(u, v+1)],
        this.fabric_.getRestDiagonal());
    }
  }
};

diem.Cloth.prototype.addConstraint = function(particle1, particle2, dist) {
  particle1.addConstraint(particle2, dist, true);
  particle2.addConstraint(particle1, dist, false);
};

diem.Cloth.prototype.addToScene = function(scene) {
  this.drapingClothObj_ = new diem.Part(this.w, this.h).getObject();
  scene.add(this.drapingClothObj_);
  this.drapingClothObj_.position.set(0, 0, 0);
  this.workboardClothObj_ = new diem.Part(this.w, this.h).getObject();
  scene.add(this.workboardClothObj_);
  this.workboardClothObj_.position.set(10, 10, 0);
};

diem.Cloth.prototype.removeNearestParticle = function(vec3) {
  var pos = vec3.sub(this.workboardClothObj_.position);
  var nearestParticleIndex = this.index_(Math.round(pos.x), Math.round(pos.y));
  if (nearestParticleIndex < 0
      || nearestParticleIndex >= this.particles.length) {
    return;
  }
  this.particles[nearestParticleIndex].clearConstraints();

  /*
   * Update meshes.
   * . . .    .  .  .
   * |\|\|    |\| |\|
   * . x . -> . x n .
   * |\|\|    |\| |\|
   * . . .    .  .  .
   */
  this.drapingClothObj_.removeFace(pos.x, pos.y);
};

diem.Cloth.prototype.index_ = function(u, v) {
  return u + (v * this.w);
};

var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

var tmpForce = new THREE.Vector3();
var FLOOR = 0;

diem.Cloth.prototype.simulate = function(time, camera, person) {
  if (this.lastTime_ == 0) {
    this.lastTime_ = time;
    return;
  }

  // Aerodynamics forces
  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles[i];
    particle.addForce(this.fabric_.getGravity());
    particle.integrate(TIMESTEP_SQ);
    particle.satisfyConstraints();
  }

  // Floor Constains
  for (i = 0; i < this.particles.length; i++) {
    particle = this.particles[i];
    var pos = particle.position;
    if (pos.y < FLOOR) {
      pos.y = FLOOR;
    }
  }

  if (this.handle_ != null) {
    this.handle_.position.copy(diem.Globals.mouse);
    this.handle_.previous.copy(diem.Globals.mouse);
  }

  // Human
  if (person != null) {
    for (i = 0; i < this.particles.length; i++) {
      particle = this.particles[i];
      pos = particle.position;
      // Look at the camera from this particle of fabric.
      this.raycaster_.set(pos, camera.getWorldDirection().negate());
      // children[0] is the whole body.
      var intersections = this.raycaster_.intersectObject(person);
      if (intersections.length % 2 == 1) {
        var closest = intersections[0];
        pos.add(this.diff_.subVectors(closest.point, pos));
      }
    }
  }

  // Pin constraints.
  for (i = 0; i < this.pins_.length; i++) {
    var p = this.pins_[i].getParticle();
    p.position.copy(p.original);
    p.previous.copy(p.original);
  }

  // Update geometry.
  var geo = this.drapingClothObj_.geometry;
  for (i = 0; i < this.particles.length; ++i) {
    geo.vertices[i].copy(this.particles[i].position);
  }

  geo.computeFaceNormals();
  geo.computeVertexNormals();

  geo.normalsNeedUpdate = true;
  geo.verticesNeedUpdate = true;
};

diem.Cloth.prototype.handleClick = function(personObj, scene) {
  var intersections = this.raycaster_.intersectObject(personObj);

  if (intersections.length > 0) {
    if (this.currentlyHolding()) {
      this.pinInPlace(intersections, scene);
    } else {
      this.grab(intersections);
    }
  }
};

diem.Cloth.prototype.currentlyHolding = function() {
  return this.handle_ != null;
};

diem.Cloth.prototype.pinInPlace = function(intersections, scene) {
  goog.asserts.assert(this.handle_ != null);
  var pin = new diem.Pin(this.handle_);
  scene.add(pin.getSprite());
  this.pins_.push(pin);
  this.handle_ = null;
};

diem.Cloth.prototype.grab = function(intersections) {
//  goog.asserts.assert(this.handle_ == null);
//  this.handle_ = intersections[0].point;
};
