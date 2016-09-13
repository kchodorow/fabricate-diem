/* global Ammo, THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.cloth.physics.Column');
goog.require('diem.cloth.physics.Constraint');
goog.require('diem.cloth.physics.Grid');
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
  this.constraints_ = [];
  this.previous_ = [];
  // Array of indexes of pinned vertices.
  this.pinned_ = [];
  var clothPos = piece.geometry.vertices[0];
  var clothNumSegmentsZ = clothWidth * 5;
  var clothNumSegmentsY = clothHeight * 5;
  var clothSegmentLengthZ = clothWidth / clothNumSegmentsZ;
  var clothSegmentLengthY = clothHeight / clothNumSegmentsY;

  // Make a grid of vertices.
  var clothGeometry = new THREE.PlaneBufferGeometry(
    clothWidth, clothHeight, clothNumSegmentsZ, clothNumSegmentsY);
//  clothGeometry.rotateY( Math.PI * 0.5 );
  clothGeometry.translate(
    clothPos.x, clothPos.y + clothHeight * 0.5, clothPos.z - clothWidth * 0.5);
  var clothMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
  });
  this.mesh_ = new THREE.Mesh(clothGeometry, clothMaterial);
  this.mesh_.castShadow = true;
  this.mesh_.receiveShadow = true;

  var softBodyHelpers = new Ammo.btSoftBodyHelpers();
  var clothCorner00 = new Ammo.btVector3(
    clothPos.x, clothPos.y + clothHeight, clothPos.z);
  var clothCorner01 = new Ammo.btVector3(
    clothPos.x, clothPos.y + clothHeight, clothPos.z - clothWidth);
  var clothCorner10 = new Ammo.btVector3(
    clothPos.x, clothPos.y, clothPos.z);
  var clothCorner11 = new Ammo.btVector3(
    clothPos.x, clothPos.y, clothPos.z - clothWidth);
  var clothSoftBody = softBodyHelpers.CreatePatch(
    diem.Physics.get().getWorld().getWorldInfo(),
    clothCorner00, clothCorner01, clothCorner10,
    clothCorner11, clothNumSegmentsZ + 1, clothNumSegmentsY + 1, 0, true);
  var sbConfig = clothSoftBody.get_m_cfg();
  sbConfig.set_viterations( 10 );
  sbConfig.set_piterations( 10 );

  var margin = 0.05;
  clothSoftBody.setTotalMass( 0.9, false );
  Ammo.castObject(clothSoftBody, Ammo.btCollisionObject).getCollisionShape()
    .setMargin(margin * 3);
  diem.Physics.get().getWorld().addSoftBody(clothSoftBody, 1, -1);
  this.mesh_.userData.physicsBody = clothSoftBody;
  // Disable deactivation
  clothSoftBody.setActivationState(4);

  var mouseShape = new Ammo.btSphereShape(.1);
  var mouseMotionState = new Ammo.btDefaultMotionState(
    new Ammo.btTransform(new Ammo.btQuaternion(0,0,0,1), new Ammo.btVector3(0,10,0)));
  var mouseBodyInfo = new Ammo.btRigidBodyConstructionInfo(
    0, mouseMotionState, mouseShape,
    new Ammo.btVector3(diem.Globals.mouse.x, diem.Globals.mouse.y, 0));
  var mouseRigidBody = new Ammo.btRigidBody(mouseBodyInfo);
  diem.Physics.get().getWorld().addRigidBody(mouseRigidBody);
  this.mouse = mouseRigidBody;

  var influence = 0.5;
  clothSoftBody.appendAnchor( 0, mouseRigidBody, false, influence );

  this.handle_ = 0;
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.TIMESTEP_SQ = .9;
diem.cloth.PhysicalPiece.DAMPING = 0.03;
diem.cloth.PhysicalPiece.DRAG = 1 - diem.cloth.PhysicalPiece.DAMPING;
diem.cloth.PhysicalPiece.DIFF = new THREE.Vector3();
diem.cloth.PhysicalPiece.EPSILON = .1;

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

  var mousePos = new THREE.Vector3().copy(diem.Globals.mouse).sub(
    this.mesh_.parent.position);
  this.mouse.getWorldTransform().setOrigin(
    new Ammo.btVector3(mousePos.x, mousePos.y, 0));

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
};

diem.cloth.PhysicalPiece.prototype.onDragStart = function() {
  this.handle_ = 0;
/*  this.handle_ = -1;
  var minDistance = Number.MAX_VALUE;
  for (var i = 1; i < this.mesh_.geometry.vertices.length; ++i) {
    var testHandle = this.mesh_.geometry.vertices[i];
    var testDistance = testHandle.distanceTo(diem.Globals.mouse);
    if (testDistance < minDistance) {
      this.handle_ = i;
      minDistance = testDistance;
    }
  }*/
  return [];
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.onDrag = function() {
/*  goog.asserts.assert(this.handle_ != -1);
  var handleVec = this.mesh_.geometry.vertices[this.handle_];
  handleVec.copy(diem.Globals.mouse).sub(this.mesh_.parent.position);
  this.mesh_.geometry.attributes.position.array[0] = diem.Globals.mouse.x;
  this.mesh_.geometry.attributes.position.array[1] = diem.Globals.mouse.y;*/
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
