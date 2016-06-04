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
goog.require('diem.Particle');
goog.require('diem.Pin');
goog.require('diem.Fabric');

goog.require('goog.asserts');

diem.Cloth = function() {
  this.raycaster_ = new THREE.Raycaster();
  this.person_ = null;
  this.lastTime_ = 0;
  this.w = 10;
  this.h = 10;

  this.fabric_ = new diem.Fabric();

  this.particles = [];
  this.constrains = [];

  // There are (w + 1) * (h + 1) particles, as the fabric is bounded on every
  // side by them.
  for (var v = 0; v <= this.h; ++v) {
    for (var u = 0; u <= this.w; ++u) {
      this.particles.push(
	new diem.Particle(u / this.w, v / this.h, 0, this.fabric_)
     );
    }
  }

  this.pins_ = [];
  this.handle_ = this.particles[this.index_(this.w, this.h)];

  // Structural
  for (v = 0; v < this.h; ++v) {
    for (u = 0; u < this.w; ++u) {
      this.constrains.push([
	this.particles[this.index_(u, v)],
	this.particles[this.index_(u, v + 1)],
	this.fabric_.getRestDistance()
      ]);

      this.constrains.push([
	this.particles[this.index_(u, v)],
	this.particles[this.index_(u + 1, v)],
	this.fabric_.getRestDistance()
      ]);
    }
  }

  for (v = 0; v < this.h; ++v) {
    this.constrains.push([
      this.particles[this.index_(this.w, v)],
      this.particles[this.index_(this.w, v + 1)],
      this.fabric_.getRestDistance()
    ]);
  }

  for (u = 0; u < this.w; ++u) {
    this.constrains.push([
      this.particles[this.index_(u, this.h)],
      this.particles[this.index_(u + 1, this.h)],
      this.fabric_.getRestDistance()
    ]);
  }

  // Add diagonal struts for stability.
  for (v=0;v<this.h;v++) {
    for (u=0;u<this.w;u++) {
      this.constrains.push([
        this.particles[this.index_(u, v)],
        this.particles[this.index_(u+1, v+1)],
        this.fabric_.getRestDiagonal()
      ]);

      this.constrains.push([
        this.particles[this.index_(u+1, v)],
        this.particles[this.index_(u, v+1)],
        this.fabric_.getRestDiagonal()
      ]);
    }
  }
};

diem.Cloth.prototype.addToScene = function(scene) {
  this.drapingClothObj_ = this.load(0, 0, 0);
  scene.add(this.drapingClothObj_);
  this.workboardClothObj_ = this.load(-15, 10, 0);
  scene.add(this.workboardClothObj_);
};

diem.Cloth.prototype.load = function(x, y, z) {
  var clothTexture = diem.Globals.textureLoader.load(
    'textures/patterns/circuit_pattern.png');
  clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
  clothTexture.anisotropy = 16;

  var clothMaterial = new THREE.MeshPhongMaterial( {
    specular: 0x030303,
    map: clothTexture,
    side: THREE.DoubleSide,
    alphaTest: 0.5
  });

  // Geometry stored in object.geometry.
  var clothGeometry = new THREE.ParametricGeometry(clothFunction, this.w, this.h);
  clothGeometry.dynamic = true;

  var uniforms = {texture:  {type: "t", value: clothTexture}};
  var vertexShader = document.getElementById('vertexShaderDepth').textContent;
  var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;

  // cloth mesh
  var object = new THREE.Mesh(clothGeometry, clothMaterial);
  object.position.set(x, y, z);
  object.castShadow = true;

  object.customDepthMaterial = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
  });

  return object;
};

diem.Cloth.prototype.index_ = function(u, v) {
  return u + v * (this.w + 1);
};

var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

var tmpForce = new THREE.Vector3();
var diff = new THREE.Vector3();
var FLOOR = 0;

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
diem.Cloth.satisifyConstrains_ = function(p1, p2, restDistance) {
  diff.subVectors(p2.position, p1.position);
  var currentDist = diff.length();
  if (currentDist === 0) {
    return; // prevents division by 0
  }
  var correction = diff.multiplyScalar(1 - (restDistance / currentDist));
  var correctionHalf = correction.multiplyScalar(0.5);
  p1.position.add(correctionHalf);
  p2.position.sub(correctionHalf);
};

diem.Cloth.prototype.simulate = function(time, camera, person, mouse) {
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
    diem.Cloth.satisifyConstrains_(constrain[0], constrain[1], constrain[2]);
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
    this.handle_.position.copy(mouse);
    this.handle_.previous.copy(mouse);
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
        pos.add(diff.subVectors(closest.point, pos));
      }
    }
  }

  // Pin Constrains
  for (i = 0; i < this.pins_.length; i++) {
    var p = this.pins_[i].getParticle();
    p.position.copy(p.previous);
    p.previous.copy(p.previous);
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

diem.Cloth.prototype.handleClick = function(personObj) {
  var intersections = this.raycaster_.intersectObject(personObj);

  if (intersections.length > 0) {
    if (this.currentlyHolding()) {
      this.pinInPlace(intersections);
    } else {
      this.grab(intersections);
    }
  }
};

diem.Cloth.prototype.currentlyHolding = function() {
  return this.handle_ != null;
};

diem.Cloth.prototype.pinInPlace = function(intersections) {
  goog.asserts.assert(this.handle_ != null);
  var pin = new diem.Pin(this.handle_, intersections[0].point);
  scene.add(pin.getSprite());
  this.pins_.push(pin);
  this.handle_ = null;
};

diem.Cloth.prototype.grab = function(intersections) {
  goog.asserts.assert(this.handle_ == null);
  this.handle_ = intersections[0].point;
};
