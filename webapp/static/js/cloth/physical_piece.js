/* global Ammo, THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.Pin');
goog.require('diem.cloth.GeometryMapper');
goog.require('diem.cloth.LinkTracker');
goog.require('diem.events');
goog.require('diem.tools.Delete');
goog.require('diem.tools.DragPiece');
goog.require('diem.tools.MovePiece');

/**
 * This is basically a workboard piece with constraints between the nodes.
 * @param {THREE.Mesh} piece
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.PhysicalPiece = function(piece) {
  goog.base(this);
  diem.cloth.PhysicalPiece.pieces_.push(this);
  this.workboardMesh_ = piece;
  this.pinned_ = [];
  this.handle_ = 0;
  this.currentPin_ = null;
  this.originalPosition_ = new THREE.Vector3().copy(piece.position);

  var geometry = this.createGeometry_(piece.geometry);
  var clothMaterial = piece.material;
  this.mesh_ = new THREE.Mesh(geometry, clothMaterial);
  this.mesh_.castShadow = true;
  this.mesh_.receiveShadow = true;
  this.mesh_.name = "pp" + diem.cloth.PhysicalPiece.pieces_.length;

  this.createSoftBody_();
  this.geometryMapper_ = new diem.cloth.GeometryMapper(
    this.mesh_.userData.physicsBody);
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.pieces_ = [];

/**
 * @param {THREE.Mesh} mesh
 * @param {Object} storablePhysicalPiece
 * @returns {diem.cloth.PhysicalPiece}
 */
diem.cloth.PhysicalPiece.load = function(mesh, storablePhysicalPiece) {
  var pp = new diem.cloth.PhysicalPiece(mesh);
  for (var i = 0; i < storablePhysicalPiece.pins.length; ++i) {
    var storablePin = storablePhysicalPiece.pins[i];
    pp.addPin_(storablePin.index, storablePin.position);
  }
  return pp;
};

/**
 * @param {THREE.Mesh} newMesh
 * @private
 */
diem.cloth.PhysicalPiece.prototype.updateGeometry = function(newMesh) {
  var geometry = this.createGeometry_(newMesh.geometry);
  this.mesh_.geometry = geometry;

  this.updateSoftBody_();

  var pins = this.mesh_.userData.physicsBody.get_m_anchors();
  pins.resize(0);
  for (var i = 0; i < this.pinned_.length; ++i) {
    var pin = this.pinned_[i];
    var newIndex = this.geometryMapper_.getEquivalentIndex(
      pin.getObject().position);
    pin.appendAnchor(newIndex);
  }
};

/**
 * @private
 */
diem.cloth.PhysicalPiece.prototype.updateSoftBody_ = function() {
  this.geometryMapper_.storePositions();

  var vertices = this.mesh_.geometry.vertices;
  var softBody = this.mesh_.userData.physicsBody;
  var nodes = softBody.get_m_nodes();
  if (vertices.length != nodes.size()) {
    this.createSoftBody_();
    softBody = this.mesh_.userData.physicsBody;
    nodes = softBody.get_m_nodes();
  } else {
    var jitter = .01;
    for (var i = 0; i < nodes.size(); i++) {
      var node = nodes.at(i);
      var pos = node.get_m_x();
      pos.setX(vertices[i].x);
      pos.setY(vertices[i].y);
      pos.setZ(jitter);
      jitter *= -1;
    }

    var linker = new diem.cloth.LinkTracker(softBody);
    var faces = this.mesh_.geometry.faces;
    var ammoFaces = softBody.get_m_faces();
    for (i = 0; i < faces.length; ++i) {
      var f = faces[i];
      linker.connect(f.c, f.a);
      linker.connect(f.a, f.b);
      linker.connect(f.b, f.c);
      var ammoFace = ammoFaces.at(i);
      ammoFace.set_m_n(0, nodes.at(f.a));
      ammoFace.set_m_n(1, nodes.at(f.b));
      ammoFace.set_m_n(2, nodes.at(f.c));
    }

    softBody.resetLinkRestLengths();
  }

  this.geometryMapper_.flipPositions(softBody);
};

/**
 * Create a soft body from this mesh's THREE geometry.
 * @returns {Ammo.btSoftBody}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createSoftBody_ = function() {
  var ammoArrays = this.createAmmoArrays_();
  var helper = new Ammo.btSoftBodyHelpers();
  var softBody = helper.CreateFromTriMesh(
    diem.Physics.get().getWorld().getWorldInfo(),
    ammoArrays.vertices,
    ammoArrays.indices,
    ammoArrays.indices.length / 3,
    true);
  softBody.setTotalMass(0.9, false);
  // Disable deactivation
  softBody.setActivationState(4);

  var sbConfig = softBody.get_m_cfg();
  sbConfig.set_viterations(10);
  sbConfig.set_piterations(10);
  // Set damping and drag coefficients.
  sbConfig.set_kDP(.001);
  sbConfig.set_kDG(.001);

  if (this.mesh_.userData.physicsBody != null) {
    diem.Physics.get().getWorld().removeSoftBody(this.mesh_.userData.physicsBody);
    this.mesh_.userData.physicsBody = null;
  }
  // These flags are _critically important_, otherwise the soft body won't
  // collide with rigid bodies. According to the documentation these are the
  // defaults (at least for the 3-arg ctor), but apparently not for the 1-arg.
  var filter = 1;
  var mask = -1;
  diem.Physics.get().getWorld().addSoftBody(softBody, filter, mask);
  this.mesh_.userData.physicsBody = softBody;
};

/**
 * @param {THREE.Geometry} geometry
 * @returns {THREE.BufferGeometry}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createGeometry_ = function(geometry) {
  geometry = geometry.clone();
  geometry.translate(this.originalPosition_.x, this.originalPosition_.y, 0);
  var subdivider = new THREE.SubdivisionModifier(3);
  subdivider.maxEdgeLength = .5;
  subdivider.modify(geometry);
  geometry.subdivided = true;
  goog.asserts.assert(geometry.vertices.length < 100000);
  return geometry;
};

/**
 * Initialize position and index arrays from this.mesh_.geometry.
 * @returns {object}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createAmmoArrays_ = function() {
  var numVertices = this.mesh_.geometry.vertices.length;
  var numFaces = this.mesh_.geometry.faces.length;
  var ammoArrays = {
    vertices : new Float32Array(numVertices * 3),
    indices : new Uint16Array(numFaces * 3)
  };

  var jitter = .01;
  for (var i = 0; i < numVertices; i++) {
    var p = this.mesh_.geometry.vertices[i];
    var i3 = i * 3;

    ammoArrays.vertices[i3] = p.x;
    ammoArrays.vertices[i3 + 1] = p.y;
    // Offset z slightly, so the cloth isn't stuck on the plane.
    ammoArrays.vertices[i3 + 2] = jitter;
    jitter *= -1;
  }

  for (i = 0; i < numFaces; ++i) {
    var f = this.mesh_.geometry.faces[i];
    i3 = i * 3;
    ammoArrays.indices[i3] = f.a;
    ammoArrays.indices[i3 + 1] = f.b;
    ammoArrays.indices[i3 + 2] = f.c;
  }
  return ammoArrays;
};

/**
 * @override
 */
diem.cloth.PhysicalPiece.prototype.getIntersectables = function() {
  return [
    diem.tools.Delete.createIntersectable(diem.events.CLICKABLE, this),
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this)
  ];
};

/**
 * Run one step of physics.
 */
diem.cloth.PhysicalPiece.prototype.simulate = function() {
  var indexFloat = 0;
  var geometry = this.mesh_.geometry;
  var positions = geometry.vertices;

  var softBody = this.mesh_.userData.physicsBody;
  var nodes = softBody.get_m_nodes();
  for (var j = 0; j < nodes.size(); ++j) {
    var pos = positions[j];
    var node = nodes.at(j);
    var nodePos = node.get_m_x();
    pos.x = nodePos.x();
    pos.y = nodePos.y();
    pos.z = nodePos.z();
  }

  // TODO: this is super inefficient, we could have each face normal be a
  // reference, not a copy.
  for (var i = 0; i < geometry.faces.length; ++i) {
    var face = geometry.faces[i];
    var normals = face.vertexNormals;
    diem.cloth.PhysicalPiece.toVector3(nodes.at(face.a).get_m_n(), normals[0]);
    diem.cloth.PhysicalPiece.toVector3(nodes.at(face.b).get_m_n(), normals[1]);
    diem.cloth.PhysicalPiece.toVector3(nodes.at(face.c).get_m_n(), normals[2]);
  }

  geometry.verticesNeedUpdate = true;
  geometry.normalsNeedUpdate = true;
  this.mesh_.geometry.boundingSphere = null;
};

/**
 * @param {Ammo.btVector3} btVec3
 * @param {THREE.Vector3} vec3
 */
diem.cloth.PhysicalPiece.toVector3 = function(btVec3, vec3) {
  vec3.x = btVec3.x();
  vec3.y = btVec3.y();
  vec3.z = btVec3.z();
};

/**
 * @override
 */
diem.cloth.PhysicalPiece.prototype.drag3dStart = function() {
  this.handle_ = -1;

  var minDistance = Number.MAX_VALUE;
  var nodes = this.mesh_.userData.physicsBody.get_m_nodes();
  for (var i = 0; i < nodes.size(); i++) {
    var node = nodes.at(i);
    var nodePos = node.get_m_x();
    var testHandle = new THREE.Vector3(
      nodePos.x(), nodePos.y(), nodePos.z());
    var testDistance = testHandle.distanceToSquared(diem.Globals.mouse);
    if (testDistance < minDistance) {
      this.handle_ = i;
      minDistance = testDistance;
    }
  }
  goog.asserts.assert(this.handle_ != -1);

  // Bullet doesn't seem to like 2 pins on the same node, so reuse an old pin if
  // there's already one at handle_.
  // TODO: figure out what's going on.
  for (i = 0; i < this.pinned_.length; ++i) {
    if (this.pinned_[i].index() == this.handle_) {
      this.currentPin_ = this.pinned_[i];
      return [];
    }
  }
  this.currentPin_ = this.addPin_(this.handle_, diem.Globals.mouse);
  this.currentPin_.addToParent(this.mesh_.parent);
  return this.currentPin_.getIntersectables();
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.drag3d = function(personIntersection, camera) {
  return this.currentPin_.drag3d(personIntersection, camera);
};

/**
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.drag3dEnd = function() {
  goog.asserts.assert(this.handle_ != -1);
  this.handle_ = null;
  this.currentPin_ = null;
  return [];
};

/**
 * @returns {Array<diem.Pin>}
 */
diem.cloth.PhysicalPiece.prototype.pins = function() {
  return this.pinned_;
};

/**
 * @param {number} index
 * @param {THREE.Vector3} position
 * @returns {diem.Pin}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.addPin_ = function(index, position) {
  var pin = new diem.Pin(position, this);
  pin.appendAnchor(index);
  this.pinned_.push(pin);
  return pin;
};

/**
 * @param {diem.Pin} pin
 */
diem.cloth.PhysicalPiece.prototype.removePin = function(pin) {
  var tbd = this.pinned_.indexOf(pin);
  this.pinned_.splice(tbd, 1);

  // Recreated the pinned array.
  var pins = this.mesh_.userData.physicsBody.get_m_anchors();
  pins.resize(0);
  for (var i = 0; i < this.pinned_.length; ++i) {
    this.pinned_[i].appendAnchor(this.pinned_[i].index());
  }
};

/**
 * Remove 3D piece from THREE and Ammo.
 */
diem.cloth.PhysicalPiece.prototype.delete = function() {
  diem.Physics.get().getWorld().removeSoftBody(this.mesh_.userData.physicsBody);
  this.mesh_.userData.physicsBody = null;
  this.mesh_.parent.remove(this.mesh_);
  // Remove from 2D pattern's array.
  var twoD = this.workboardMesh_;
  var pieces = twoD.userData.physicalPieces;
  var index = pieces.indexOf(this);
  goog.asserts.assert(index >= 0);
  pieces.splice(index, 1);
  twoD.remove(this.mesh_);
  this.workboardMesh_ = null;
};

/**
 * @returns {array<diem.clothPhysicalPiece>} A list of physical pieces for
 *   render to run simulate() on.
 */
diem.cloth.PhysicalPiece.getPieces = function() {
  return diem.cloth.PhysicalPiece.pieces_;
};
