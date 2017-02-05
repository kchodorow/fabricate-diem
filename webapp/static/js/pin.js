/* global THREE, Ammo */
goog.provide('diem.Pin');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.tools.Delete');
goog.require('diem.tools.DragPiece');

/**
 * @param {Ammo.btRigidBody} rigidBody The fixed point representing the mouse.
 * @param {diem.cloth.PhysicalPiece} piece
 * @extends {diem.MeshWrapper}
 * @constructor
 */
diem.Pin = function(position, piece) {
  goog.base(this);
  this.index_ = 0;
  this.rigidBody_ = this.createBody_(position);
  this.piece_ = piece;

  var geometry = new THREE.CircleGeometry(diem.Pin.RADIUS, 6);
  var material = new THREE.MeshBasicMaterial({color : diem.Pin.COLOR});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.set(position.x, position.y, position.z);
  this.mesh_.name = "pin" + diem.Pin.PINS++;

  // TODO: this should be a contrasting color to whatever the material is..
  var shadowMaterial = new THREE.MeshBasicMaterial({
    color : diem.Pin.COLOR,
    opacity: .5
  });
  this.shadow_ = new THREE.Mesh(geometry, shadowMaterial);
  this.shadow_.name = this.mesh_.name + " shadow";
};

goog.inherits(diem.Pin, diem.MeshWrapper);

diem.Pin.COLOR = 0x000000;
diem.Pin.PINS = 0;
diem.Pin.RADIUS = .2;
diem.Pin.EPSILON = .25;

/**
 * @param {THREE.Vector3} position
 * @private
 * @returns {Ammo.btRigidBody}
 */
diem.Pin.prototype.createBody_ = function(position) {
  var pinShape = new Ammo.btSphereShape(diem.Pin.RADIUS);
  var transform = new Ammo.btTransform();
  transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
  transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
  var pinMotionState = new Ammo.btDefaultMotionState(transform);
  var inertia = new Ammo.btVector3(0, 0, 0);
  var mass = 0;
  var mouseBodyInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    pinMotionState,
    pinShape,
    inertia);
  var pinBody = new Ammo.btRigidBody(mouseBodyInfo);
  diem.Physics.get().getWorld().addRigidBody(pinBody);
  return pinBody;
};

/**
 * @override
 */
diem.Pin.prototype.getIntersectables = function() {
  return [
    diem.tools.Delete.createIntersectable(diem.events.CLICKABLE, this),
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this)
  ];
};

/**
 * @override
 */
diem.Pin.prototype.addToParent = function(parent) {
  parent.add(this.mesh_);
  this.shadow_.position.sub(this.piece_.getWorkboardMesh().position);
  this.piece_.getWorkboardMesh().add(this.shadow_);
};

/**
 * @param {number} index The vertex's index that the pin is through
 */
diem.Pin.prototype.anchorTo = function(index) {
  this.index_ = index;
  var disableCollisionBetweenLinkedBodies = false;
  var influence = 1;
  this.piece_.getObject().userData.physicsBody.appendAnchor(
    this.index_,
    this.rigidBody_,
    disableCollisionBetweenLinkedBodies,
    influence);
  this.shadow_.position.copy(this.piece_.get2dPosition(index));
};

/**
 * @returns {number}
 */
diem.Pin.prototype.index = function() {
  return this.index_;
};

/**
 * @returns {Ammo.btRigidBody}
 */
diem.Pin.prototype.rigidBody = function() {
  return this.rigidBody_;
};

/**
 * @returns {Array}
 */
diem.Pin.prototype.drag3dStart = function() {
  return [];
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.Pin.prototype.drag3d = function(personIntersection, camera) {
  // TODO: there is a stutter entering/leaving the body, because of the
  // rapid z-coord change.
  var meshPos = null;
  var bodyPos = null;
  if (personIntersection != null) {
    meshPos = personIntersection.point.clone();
    bodyPos = personIntersection.point.clone();
  } else {
    meshPos = diem.Globals.mouse;
    bodyPos = diem.Globals.mouse;
  }

  // We could just get the normal of the personIntersection.
  // Get the position of the camera.
  var cameraPos = camera.position;
  // Get the vector from the mouse -> the camera.
  var cameraToMouse = meshPos.clone().sub(cameraPos);
  // Normalize.
  cameraToMouse.normalize();
  // Reverse.
  var mouseToCamera = cameraToMouse.multiplyScalar(-1);
  // Scale to epsilon length.
  mouseToCamera.multiplyScalar(diem.Pin.EPSILON);
  // Apply to intersection point.
  bodyPos.add(mouseToCamera);
  // Nudge a little closer to the camera.
  mouseToCamera.multiplyScalar(1 / diem.Pin.EPSILON * 5);
  meshPos.add(mouseToCamera);

  this.mesh_.position = meshPos;
  this.rigidBody_.getWorldTransform().setOrigin(
    new Ammo.btVector3(bodyPos.x, bodyPos.y, bodyPos.z));
  return [];
};

/**
 * @returns {Array}
 */
diem.Pin.prototype.drag3dEnd = function() {
  return [];
};

diem.Pin.prototype.select = function() {
};

diem.Pin.prototype.deselect = function() {
};

/**
 * Remove this pin.
 */
diem.Pin.prototype.delete = function() {
  diem.Physics.get().getWorld().removeRigidBody(this.rigidBody_);
  this.rigidBody_ = null;
  this.mesh_.parent.remove(this.mesh_);
  this.shadow_.parent.remove(this.shadow_);
  this.piece_.removePin(this);
};
