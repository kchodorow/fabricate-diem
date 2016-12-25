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
  this.originalPosition_ = new THREE.Vector3().copy(piece.position);

  var geometry = this.createGeometry_(piece.geometry);
  var clothMaterial = new THREE.MeshLambertMaterial({
    color: piece.material.color,
    side: THREE.DoubleSide
  });
  this.mesh_ = new THREE.Mesh(geometry, clothMaterial);
  this.mesh_.castShadow = true;
  this.mesh_.receiveShadow = true;

  this.ammoVertices_ = new Float32Array(geometry.vertices.length * 3);
  this.ammoIndices_ = new Uint16Array(geometry.faces.length * 3);

  var helper = new Ammo.btSoftBodyHelpers();
  this.createAmmoArrays_();
  var softBody = helper.CreateFromTriMesh(
    diem.Physics.get().getWorld().getWorldInfo(),
    this.ammoVertices_,
    this.ammoIndices_,
    this.ammoIndices_.length / 3,
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

  this.updateSoftBody_();

/* TODO:
  var oldSoftBody = this.mesh_.userData.physicsBody;
  for (var i = 0; i < this.pinned_.length; ++i) {
    var pin = this.pinned_[i];
    var oldNode = oldSoftBody.get_m_nodes().at(pin.index());
    var index = this.geometryMapper_.getEquivalentIndex(oldNode);
    pin.setIndex(index);
  }*/
};

/**
 * @private
 */
diem.cloth.PhysicalPiece.prototype.updateSoftBody_ = function() {
  var vertices = this.mesh_.geometry.vertices;
  var softBody = this.mesh_.userData.physicsBody;
  var nodes = softBody.get_m_nodes();
  if (vertices.length != nodes.size()) {
    // TODO: actually regen the physics shape when this happens.
    goog.asserts.fail(
      "Number of veritces changed from " + nodes.size() + " to " + vertices.length);
  }

  this.geometryMapper_.storePositions();

  var jitter = .01;
  for (var i = 0; i < nodes.size(); i++) {
    var node = nodes.at(i);
    var pos = node.get_m_x();
    pos.setX(vertices[i].x);
    pos.setY(vertices[i].y);
    pos.setZ(jitter);
    jitter *= -1;
  }

  var linker = new diem.cloth.PhysicalPiece.LinkTracker(softBody);
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

  this.geometryMapper_.flipPositions();

  for (i = 0; i < nodes.size(); ++i) {
    node = nodes.at(i);
    pos = node.get_m_x();
  }
};

/**
 * @param {Ammo.btSoftBody} softBody
 * @constructor
 */
diem.cloth.PhysicalPiece.LinkTracker = function(softBody) {
  this.links_ = {};
  this.ammoLinks_ = softBody.get_m_links();
  this.ammoNodes_ = softBody.get_m_nodes();
  this.idx_ = 0;
};

/**
 * @param {number} a
 * @param {number} b
 */
diem.cloth.PhysicalPiece.LinkTracker.prototype.connect = function(a, b) {
  if (this.isLinked_(a, b)) {
    return;
  }
  this.link_(a, b);

  var link = this.ammoLinks_.at(this.idx_++);
  link.set_m_n(0, this.ammoNodes_.at(a));
  link.set_m_n(1, this.ammoNodes_.at(b));
};

/**
 * @param {number} a
 * @param {number} b
 * @private
 */
diem.cloth.PhysicalPiece.LinkTracker.prototype.isLinked_ = function(a, b) {
  return a in this.links_ && this.links_[a].includes(b);
};

/**
 * @param {number} a
 * @param {number} b
 * @private
 */
diem.cloth.PhysicalPiece.LinkTracker.prototype.link_ = function(a, b) {
  if (!(a in this.links_)) {
    this.links_[a] = [];
  }
  if (!(b in this.links_)) {
    this.links_[b] = [];
  }

  this.links_[a].push(b);
  this.links_[b].push(a);
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

diem.cloth.PhysicalPiece.prototype.createAmmoArrays_ = function() {
  var numVertices = this.mesh_.geometry.vertices.length;
  var numFaces = this.mesh_.geometry.faces.length;

  var jitter = .01;
  for (var i = 0; i < numVertices; i++) {
    var p = this.mesh_.geometry.vertices[i];
    var i3 = i * 3;

    this.ammoVertices_[i3] = p.x;
    this.ammoVertices_[i3 + 1] = p.y;
    // Offset z slightly, so the cloth isn't stuck on the plane.
    this.ammoVertices_[i3 + 2] = jitter;
    jitter *= -1;
  }

  for (i = 0; i < numFaces; ++i) {
    var f = this.mesh_.geometry.faces[i];
    i3 = i * 3;
    this.ammoIndices_[i3] = f.a;
    this.ammoIndices_[i3 + 1] = f.b;
    this.ammoIndices_[i3 + 2] = f.c;
  }
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
