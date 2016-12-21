/* global Ammo, THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.Pin');
goog.require('diem.cloth.GeometryMapper');
goog.require('diem.events');
goog.require('diem.tools.DragPiece');
goog.require('diem.tools.MovePiece');

/**
 * This is basically a workboard piece with constraints between the nodes.
 * @param {THREE.Mesh} piece
 * @param {number} clothWidth
 * @param {number} clothHeight
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.PhysicalPiece = function(piece, clothWidth, clothHeight) {
  goog.base(this);
  diem.cloth.PhysicalPiece.pieces_.push(this);
  this.pinned_ = [];
  this.handle_ = 0;
  this.mouse_ = null;

  var geometry = this.createGeometry_(piece.geometry);
  var clothPos = new THREE.Vector3().copy(piece.position);
  geometry.translate(clothPos.x, clothPos.y, 0);
  var clothMaterial = new THREE.MeshLambertMaterial({
    color: piece.material.color,
    side: THREE.DoubleSide
  });
  this.mesh_ = new THREE.Mesh(geometry, clothMaterial);
  this.mesh_.castShadow = true;
  this.mesh_.receiveShadow = true;

  var softBody = this.createSoftBody_();
  this.geometryMapper_ = new diem.cloth.GeometryMapper(softBody);
  diem.Physics.get().getWorld().addSoftBody(softBody);
  this.mesh_.userData.physicsBody = softBody;
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.pieces_ = [];

/**
 * @param {THREE.Mesh} newMesh
 * @private
 */
diem.cloth.PhysicalPiece.prototype.updateGeometry = function(newMesh) {
  var geometry = this.createGeometry_(newMesh.geometry);
  this.mesh_.geometry = geometry;

  var oldSoftBody = this.mesh_.userData.physicsBody;
  var newSoftBody = this.createSoftBody_();
  this.geometryMapper_.flip(newSoftBody);
  diem.Physics.get().getWorld().addSoftBody(newSoftBody);
  this.mesh_.userData.physicsBody = newSoftBody;

  for (var i = 0; i < this.pinned_.length; ++i) {
    var pin = this.pinned_[i];
    var oldNode = oldSoftBody.get_m_nodes().at(pin.index());
    var index = this.geometryMapper_.getEquivalentIndex(oldNode);
    pin.setIndex(index);
    newSoftBody.appendAnchor(pin.index(), pin.rigidBody(), false, 1);
  }

  diem.Physics.get().getWorld().removeSoftBody(oldSoftBody);
};

/**
 * @param {THREE.Geometry} geometry
 * @returns {Ammo.btSoftBody}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createSoftBody_ = function() {
  var helper = new Ammo.btSoftBodyHelpers();
  var ammoArrays = this.createAmmoArrays_();
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

  return softBody;
};

/**
 * @param {THREE.Geometry} geometry
 * @returns {THREE.BufferGeometry}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createGeometry_ = function(geometry) {
  geometry = geometry.clone();
  var subdivider = new THREE.SubdivisionModifier(3);
  subdivider.modify(geometry);
  geometry.subdivided = true;
  goog.asserts.assert(geometry.vertices.length < 100000);
  return geometry;
};

diem.cloth.PhysicalPiece.prototype.createAmmoArrays_ = function() {
  var numVertices = this.mesh_.geometry.vertices.length;
  var numFaces = this.mesh_.geometry.faces.length;

  var ammoVertices = new Float32Array(numVertices * 3);
  var ammoIndices = new Uint16Array(numFaces * 3);

  var jitter = .01;
  for (var i = 0; i < numVertices; i++) {
    var p = this.mesh_.geometry.vertices[i];
    var i3 = i * 3;

    ammoVertices[i3] = p.x;
    ammoVertices[i3 + 1] = p.y;
    // Offset z slightly, so the cloth isn't stuck on the plane.
    ammoVertices[i3 + 2] = jitter;
    jitter *= -1;
  }

  for (i = 0; i < numFaces; ++i) {
    var f = this.mesh_.geometry.faces[i];
    i3 = i * 3;
    ammoIndices[i3] = f.a;
    ammoIndices[i3 + 1] = f.b;
    ammoIndices[i3 + 2] = f.c;
  }

  return {vertices : ammoVertices, indices : ammoIndices};
};

/**
 * @param {number} n1
 * @param {number} n2
 * @returns {boolean}
 * @private
 */
diem.cloth.PhysicalPiece.isEqual_ = function(n1, n2) {
  var delta = 0.000001;
  return Math.abs(n2 - n1) < delta;
};

/**
 * @override
 */
diem.cloth.PhysicalPiece.prototype.getIntersectables = function() {
  return [
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this),
    diem.tools.MovePiece.createIntersectable(diem.events.CLICKABLE, this)
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

  this.mouse_ = diem.Physics.get().addMouseBody();

  var influence = 1;
  this.mesh_.userData.physicsBody.appendAnchor(
    this.handle_, this.mouse_, false, influence);
  return [];
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.drag3d = function() {
  var mousePos = new THREE.Vector3().copy(diem.Globals.mouse);
  this.mouse_.getWorldTransform().setOrigin(
    new Ammo.btVector3(mousePos.x, mousePos.y, 0));
  return [];
};

/**
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.drag3dEnd = function() {
  goog.asserts.assert(this.handle_ != -1);
  this.pinned_.push(new diem.Pin(this.handle_, this.mouse_));
  this.handle_ = null;
  this.mouse_ = null;
  return [];
};

/**
 * @returns {array<diem.clothPhysicalPiece>} A list of physical pieces for
 *   render to run simulate() on.
 */
diem.cloth.PhysicalPiece.getPieces = function() {
  return diem.cloth.PhysicalPiece.pieces_;
};
