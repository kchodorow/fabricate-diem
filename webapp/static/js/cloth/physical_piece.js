/* global Ammo, THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.Pin');
goog.require('diem.cloth.GeometryMapper');
goog.require('diem.events');
goog.require('diem.tools.DragPiece');

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

  this.mesh_ = this.createMesh_(piece);
  var softBody = this.createSoftBody_(this.mesh_.geometry);
  this.mesh_.userData.physicsBody = softBody;
  this.geometryMapper_ = new diem.cloth.GeometryMapper(
    this.mesh_.userData.physicsBody);
  diem.Physics.get().getWorld().addSoftBody(softBody);
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.pieces_ = [];

diem.cloth.PhysicalPiece.prototype.createMesh_ = function(mesh) {
  var clothGeometry = this.createIndexedBufferGeometry_(mesh.geometry);
  var clothPos = new THREE.Vector3().copy(mesh.position);
  clothGeometry.translate(clothPos.x, clothPos.y, 0);
  var clothMaterial = new THREE.MeshBasicMaterial({
    color: mesh.material.color,
    side: THREE.DoubleSide,
    wireframe: true
  });

  var newMesh = new THREE.Mesh(clothGeometry, clothMaterial);
  newMesh.castShadow = true;
  newMesh.receiveShadow = true;
  return newMesh;
};

diem.cloth.PhysicalPiece.prototype.updateGeometry = function(newMesh) {
  var oldSoftBody = this.mesh_.userData.physicsBody;
  diem.Physics.get().getWorld().removeSoftBody(oldSoftBody);

  var buffMesh = this.createMesh_(newMesh);
  var newSoftBody = this.createSoftBody_(buffMesh.geometry);
  this.geometryMapper_.flip(newSoftBody);
  diem.Physics.get().getWorld().addSoftBody(newSoftBody);

  var material = this.mesh_.material;
  var parent = this.mesh_.parent;
  parent.remove(this.mesh_);
  this.mesh_ = buffMesh;
  this.mesh_.userData.physicsBody = newSoftBody;
  parent.add(this.mesh_);

  for (var i = 0; i < this.pinned_.length; ++i) {
    var pin = this.pinned_[i];
    this.mesh_.userData.physicsBody.appendAnchor(
      pin.index(), pin.rigidBody(), false, 1);
  }
};

diem.cloth.PhysicalPiece.prototype.createSoftBody_ = function(geometry) {
  var helper = new Ammo.btSoftBodyHelpers();
  // The btSoftBody is centered at (0,0), so its corners should be offset
  // by the position of the cloth.
  // Weirdness: why is 1,0 the llc?
  var softBody = helper.CreateFromTriMesh(
    diem.Physics.get().getWorld().getWorldInfo(),
    geometry.attributes.position.array,
    geometry.index.array,
    geometry.index.array.length / 3,
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

  // Update geometry's faces.
//  goog.asserts.assert(
  //  geometry.index.array.length == this.mesh_.geometry.index.array.length);
// IDEA: I'm overwriting/reusing 'this' somewhere that I think I'm writing to a copy of this
  return softBody;
};

/**
 * @param {THREE.Geometry} geometry
 * @returns {THREE.BufferGeometry}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createIndexedBufferGeometry_ = function(geometry) {
  geometry = geometry.clone();
  var subdivider = new THREE.SubdivisionModifier(1);
  subdivider.modify(geometry);
  geometry.subdivided = true;
  goog.asserts.assert(geometry.vertices.length < 100000);

  var numVertices = geometry.vertices.length;
  var numFaces = geometry.faces.length;

  var bufferGeom = new THREE.BufferGeometry();
  var vertices = new Float32Array(numVertices * 3);
  var normals = new Float32Array(numVertices * 3);
  var indices = new Uint16Array(numFaces * 3);

  var jitter = .01;
  for (var i = 0; i < numVertices; i++) {
    var p = geometry.vertices[ i ];
    var i3 = i * 3;

    vertices[i3] = p.x;
    vertices[i3 + 1] = p.y;
    // Offset z slightly, so the cloth isn't stuck on the plane.
    vertices[i3 + 2] = jitter;
    jitter *= -1;
    normals[i3] = 0;
    normals[i3 + 1] = 0;
    normals[i3 + 2] = 1;
  }

  for (i = 0; i < numFaces; i++) {
    var f = geometry.faces[ i ];
    i3 = i * 3;

    indices[ i3 ] = f.a;
    indices[ i3 + 1 ] = f.b;
    indices[ i3 + 2 ] = f.c;
  }

  bufferGeom.setIndex(new THREE.BufferAttribute(indices, 3));
  bufferGeom.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  bufferGeom.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
  return bufferGeom;
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
  var volumePositions = geometry.attributes.position.array;
  var volumeNormals = geometry.attributes.normal.array;

  var softBody = this.mesh_.userData.physicsBody;
  var nodes = softBody.get_m_nodes();
  for (var j = 0; j < nodes.size(); ++j) {
    var node = nodes.at(j);
    var nodePos = node.get_m_x();
    var x = nodePos.x();
    var y = nodePos.y();
    var z = nodePos.z();
    var nodeNormal = node.get_m_n();
    var nx = nodeNormal.x();
    var ny = nodeNormal.y();
    var nz = nodeNormal.z();

    var indexVertex = j * 3;
    volumePositions[indexVertex] = x;
    volumeNormals[indexVertex] = nx;
    indexVertex++;
    volumePositions[indexVertex] = y;
    volumeNormals[indexVertex] = ny;
    indexVertex++;
    volumePositions[indexVertex] = z;
    volumeNormals[indexVertex] = nz;
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.normal.needsUpdate = true;
  this.mesh_.geometry.boundingSphere = null;
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

diem.cloth.PhysicalPiece.getPieces = function() {
  return diem.cloth.PhysicalPiece.pieces_;
};
