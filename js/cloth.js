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

goog.require('diem.Particle');
goog.require('diem.Fabric');

diem.Cloth = function(camera) {
  this.raycaster_ = new THREE.Raycaster();
  this.camera_ = camera;
  this.person_ = null;
  this.lastTime_ = 0;
  this.w = 10;
  this.h = 10;
  this.pins_ = [this.index_(this.w, this.h), this.index_(0, this.h)];

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
};

diem.Cloth.prototype.load = function() {
  var loader = new THREE.TextureLoader();
  var clothTexture = loader.load('textures/patterns/circuit_pattern.png');
  clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
  clothTexture.anisotropy = 16;

  var clothMaterial = new THREE.MeshPhongMaterial( {
    specular: 0x030303,
    map: clothTexture,
    side: THREE.DoubleSide,
    alphaTest: 0.5
  });

  // cloth geometry
  this.clothGeometry_ = new THREE.ParametricGeometry(clothFunction, this.w, this.h);
  this.clothGeometry_.dynamic = true;

  var uniforms = {texture:  {type: "t", value: clothTexture}};
  var vertexShader = document.getElementById('vertexShaderDepth').textContent;
  var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;

  // cloth mesh
  var object = new THREE.Mesh(this.clothGeometry_, clothMaterial);
  object.position.set(0, 0, 0);
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

  var handle = this.particles[this.index_(this.w, this.h)];
  handle.position.copy(mouse);
  handle.previous.copy(mouse);

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
        var closest = intersections[0];
        pos.add(diff.subVectors(closest.point, pos));
      }
    }
  }

  // Pin Constrains
/*  for (i = 0; i < this.pins_.length; i++) {
    var xy = this.pins_[i];
    var p = this.particles[xy];
    p.position.copy(p.original);
    p.previous.copy(p.original);
  }*/

  // Update geometry.
  for ( var i = 0; i < this.particles.length; ++i) {
    this.clothGeometry_.vertices[i].copy(this.particles[i].position);
  }

  this.clothGeometry_.computeFaceNormals();
  this.clothGeometry_.computeVertexNormals();

  this.clothGeometry_.normalsNeedUpdate = true;
  this.clothGeometry_.verticesNeedUpdate = true;
};
