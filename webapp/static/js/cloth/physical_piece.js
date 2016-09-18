/* global Ammo, THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.events');
goog.require('diem.tools.DragPiece');

/**
 * This is basically a workboard piece with constraints between the nodes.
 * @param {THREE.Mesh} piece
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.PhysicalPiece = function(piece, clothWidth, clothHeight) {
  goog.base(this);
  this.pinned_ = [];

  var physics = diem.Physics.get();
  var clothPos = new THREE.Vector3().copy(piece.position);
  this.orig_pos = clothPos;
  var clothNumSegmentsX = clothWidth * 5;
  var clothNumSegmentsY = clothHeight * 5;

  // Make a grid of vertices.
  var clothGeometry = new THREE.PlaneBufferGeometry(
    clothWidth, clothHeight, clothNumSegmentsX, clothNumSegmentsY);
  clothGeometry.translate(clothPos.x, clothPos.y, 0);

  var clothMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
  });
  this.mesh_ = new THREE.Mesh(clothGeometry, clothMaterial);
  this.mesh_.castShadow = true;
  this.mesh_.receiveShadow = true;

  // The btSoftBody is centered at (0,0), so its corners should be offset
  // by the position of the cloth.
  // Weirdness: why is 1,0 the llc?
  var softBodyHelpers = new Ammo.btSoftBodyHelpers();
  var clothCorner00 = new Ammo.btVector3(
    clothPos.x, clothPos.y + clothHeight, clothPos.z);
  var clothCorner01 = new Ammo.btVector3(
    clothPos.x + clothWidth, clothPos.y + clothHeight, clothPos.z);
  var clothCorner10 = new Ammo.btVector3(
    clothPos.x, clothPos.y, clothPos.z);
  var clothCorner11 = new Ammo.btVector3(
    clothPos.x + clothWidth, clothPos.y, clothPos.z);
  // TODO: what are the last couple args?
  var clothSoftBody = softBodyHelpers.CreatePatch(
    diem.Physics.get().getWorld().getWorldInfo(),
    clothCorner00, clothCorner10, clothCorner01, clothCorner11,
    clothNumSegmentsX + 1, clothNumSegmentsY + 1, 0, true);
  var sbConfig = clothSoftBody.get_m_cfg();
  sbConfig.set_viterations( 10 );
  sbConfig.set_piterations( 10 );

  var margin = 0.05;
  clothSoftBody.setTotalMass( 0.9, false );
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

/**
 * @override
 */
diem.cloth.PhysicalPiece.prototype.getIntersectables = function() {
  return [
    diem.tools.DragPiece.createIntersectable(diem.events.TIME, this),
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this)
  ];
};

/**
 * Run one step of physics.
 */
diem.cloth.PhysicalPiece.prototype.simulate = function() {
  var softBody = this.mesh_.userData.physicsBody;
  var clothPositions = this.mesh_.geometry.attributes.position.array;
  var numVerts = clothPositions.length / 3;
  var nodes = softBody.get_m_nodes();
  var indexFloat = 0;

  for (var i = 0; i < numVerts; i++) {
    var node = nodes.at(i);
    var nodePos = node.get_m_x();
    clothPositions[indexFloat++] = nodePos.x();
    clothPositions[indexFloat++] = nodePos.y();
    clothPositions[indexFloat++] = nodePos.z();
  }

  this.mesh_.geometry.computeVertexNormals();
  this.mesh_.geometry.attributes.position.needsUpdate = true;
  this.mesh_.geometry.attributes.normal.needsUpdate = true;
  this.mesh_.geometry.boundingSphere = null;
};

diem.cloth.PhysicalPiece.prototype.onDragStart = function() {
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
diem.cloth.PhysicalPiece.prototype.onDrag = function() {
  var mousePos = new THREE.Vector3().copy(diem.Globals.mouse);
  this.mouse.getWorldTransform().setOrigin(
    new Ammo.btVector3(mousePos.x, mousePos.y, 0));
  return [];
};

/**
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.onDragEnd = function() {
  goog.asserts.assert(this.handle_ != -1);
  this.pinned_.push(this.handle_);
  this.handle_ = null;
  return [];
};
