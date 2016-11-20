/* global Ammo, THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
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

  // Make a grid of vertices.
  var clothMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
  });
  var clothGeometry = this.from2dMesh(piece);
  this.mesh_ = new THREE.Mesh(clothGeometry, clothMaterial);
  this.mesh_.castShadow = true;
  this.mesh_.receiveShadow = true;

  // The btSoftBody is centered at (0,0), so its corners should be offset
  // by the position of the cloth.
  // Weirdness: why is 1,0 the llc?
  this.mapIndices_();

  var softBodyHelpers = new Ammo.btSoftBodyHelpers();
  var clothSoftBody = softBodyHelpers.CreateFromTriMesh(
    diem.Physics.get().getWorld().getWorldInfo(),
    this.mesh_.geometry.ammoVertices,
    this.mesh_.geometry.ammoIndices,
    this.mesh_.geometry.ammoIndices.length / 3,
    true);

  var sbConfig = clothSoftBody.get_m_cfg();
  sbConfig.set_viterations(10);
  sbConfig.set_piterations(10);

  var margin = 0.05;
  clothSoftBody.setTotalMass(0.9, false);
  Ammo.castObject(clothSoftBody, Ammo.btCollisionObject).getCollisionShape()
    .setMargin(margin * 3);
  // TODO: what are the last couple args?
  diem.Physics.get().getWorld().addSoftBody(clothSoftBody, 1, -1);
  this.mesh_.userData.physicsBody = clothSoftBody;
  // Disable deactivation
  clothSoftBody.setActivationState(4);

  this.handle_ = 0;
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.pieces_ = [];

diem.cloth.PhysicalPiece.prototype.updateGeometry = function(mesh) {
  this.mesh_.geometry = this.from2dMesh(mesh);
  this.mapIndices_();
  this.mesh_.geometry.verticesNeedUpdate = true;
  this.mesh_.geometry.boundingSphere = null;
};

diem.cloth.PhysicalPiece.prototype.from2dMesh = function(mesh) {
  var clothGeometry = this.createIndexedBufferGeometry_(mesh.geometry);
  var clothPos = new THREE.Vector3().copy(mesh.position);
  clothGeometry.translate(clothPos.x, clothPos.y, 0);
  return clothGeometry;
};

/**
 * @param {THREE.Geometry} geometry
 * @returns {THREE.BufferGeometry}
 * @private
 */
diem.cloth.PhysicalPiece.prototype.createIndexedBufferGeometry_ = function(geometry) {
  if (!geometry.subdivided) {
    var subdivider = new THREE.SubdivisionModifier(3);
    subdivider.modify(geometry);
    geometry.subdivided = true;
    goog.asserts.assert(geometry.vertices.length < 100000);
  }
  var numVertices = geometry.vertices.length;
  var numFaces = geometry.faces.length;

  var bufferGeom = new THREE.BufferGeometry().fromGeometry(geometry);
  var vertices = new Float32Array(numVertices * 3);
  var normals = new Float32Array(numVertices * 3);
  var indices;
  if (numFaces * 3 > 65535) {
    indices = new Uint32Array(numFaces * 3);
  } else {
    indices = new Uint16Array(numFaces * 3);
  }

  for (var i = 0; i < numVertices; i++) {
    var p = geometry.vertices[ i ];
    var i3 = i * 3;

    vertices[i3] = p.x;
    vertices[i3 + 1] = p.y;
    vertices[i3 + 2] = p.z;
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

  bufferGeom.setIndex(new THREE.BufferAttribute(indices, 1));
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
 * @private
 */
diem.cloth.PhysicalPiece.prototype.mapIndices_ = function() {
  var geometry = this.mesh_.geometry;
  var vertices = geometry.attributes.position.array;
  var idxVertices = geometry.attributes.position.array;
  var indices = geometry.index.array;

  var numIdxVertices = idxVertices.length / 3;
  var numVertices = vertices.length / 3;

  geometry.ammoVertices = idxVertices;
  geometry.ammoIndices = indices;
  geometry.ammoIndexAssociation = [];

  for ( var i = 0; i < numIdxVertices; i++ ) {
    var association = [];
    geometry.ammoIndexAssociation.push( association );

    var i3 = i * 3;
    for ( var j = 0; j < numVertices; j++ ) {
      var j3 = j * 3;
      if (diem.cloth.PhysicalPiece.isEqual_(idxVertices[i3], vertices[j3])
          && diem.cloth.PhysicalPiece.isEqual_(idxVertices[i3 + 1], vertices[j3 + 1])
          && diem.cloth.PhysicalPiece.isEqual_(idxVertices[i3 + 2], vertices[j3 + 2])) {
        association.push(j3);
      }
    }
  }
};

/**
 * @override
 */
diem.cloth.PhysicalPiece.prototype.getIntersectables = function() {
  return [
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this)
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
  var association = geometry.ammoIndexAssociation;
  var numVerts = association.length;

  var softBody = this.mesh_.userData.physicsBody;
  var nodes = softBody.get_m_nodes();
  for ( var j = 0; j < numVerts; j ++ ) {
    var node = nodes.at( j );
    var nodePos = node.get_m_x();
    var x = nodePos.x();
    var y = nodePos.y();
    var z = nodePos.z();
    var nodeNormal = node.get_m_n();
    var nx = nodeNormal.x();
    var ny = nodeNormal.y();
    var nz = nodeNormal.z();

    var assocVertex = association[ j ];

    for ( var k = 0, kl = assocVertex.length; k < kl; k++ ) {
      var indexVertex = assocVertex[ k ];
      volumePositions[ indexVertex ] = x;
      volumeNormals[ indexVertex ] = nx;
      indexVertex++;
      volumePositions[ indexVertex ] = y;
      volumeNormals[ indexVertex ] = ny;
      indexVertex++;
      volumePositions[ indexVertex ] = z;
      volumeNormals[ indexVertex ] = nz;
    }
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
  var numVerts = this.mesh_.geometry.attributes.position.array.length / 3;
  var minDistance = Number.MAX_VALUE;
  var nodes = this.mesh_.userData.physicsBody.get_m_nodes();
  for (var i = 0; i < numVerts; i++) {
    var node = nodes.at(i);
    var nodePos = node.get_m_x();
    var testHandle = new THREE.Vector3(
      nodePos.x(), nodePos.y(), nodePos.z());
    var testDistance = testHandle.distanceTo(diem.Globals.mouse);
    if (testDistance < minDistance) {
      this.handle_ = i;
      minDistance = testDistance;
    }
  }

  this.mouse = diem.Physics.get().addMouseBody();

  var influence = 1;
  this.mesh_.userData.physicsBody.appendAnchor(
    this.handle_, this.mouse, false, influence);
  return [];
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.drag3d = function() {
  var mousePos = new THREE.Vector3().copy(diem.Globals.mouse);
  this.mouse.getWorldTransform().setOrigin(
    new Ammo.btVector3(mousePos.x, mousePos.y, 0));
  return [];
};

/**
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.drag3dEnd = function() {
  goog.asserts.assert(this.handle_ != -1);
  this.pinned_.push(this.handle_);
  this.handle_ = null;
  return [];
};

diem.cloth.PhysicalPiece.getPieces = function() {
  return diem.cloth.PhysicalPiece.pieces_;
};
