/* global THREE, Ammo */
goog.provide('diem.Ground');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');

/**
 * @extends {diem.MeshWrapper}
 * @constructor
 */
diem.Ground = function() {
  goog.base(this);
  // I would love to get btStaticPlaneShape to work here, but something seems to
  // be wrong with its intersections with btSoftBody, so btBoxShape it is.
  this.dimensions_ = new Ammo.btVector3(50, 10, 50);
  this.position_ = new Ammo.btVector3(0, -10, 0);

  var geometry = new THREE.BoxGeometry(
    this.dimensions_.x() * 2, this.dimensions_.y() * 2, this.dimensions_.z() * 2);
  var material = new THREE.MeshBasicMaterial({color : 0xffffff});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.set(
    this.position_.x(), this.position_.y(), this.position_.z());
  this.mesh_.name = "ground";
  this.mesh_.userData.physicsBody = this.createBody_();
};

goog.inherits(diem.Ground, diem.MeshWrapper);

/**
 * @private
 */
diem.Ground.prototype.createBody_ = function() {
  var shape = new Ammo.btBoxShape(this.dimensions_);
  var groundMotionState = new Ammo.btDefaultMotionState(
    new Ammo.btTransform(
      new Ammo.btQuaternion(0, 0, 0, 1), this.position_));
  var mass = 0;
  var inertia = new Ammo.btVector3(0, 0, 0);
  var ci = new Ammo.btRigidBodyConstructionInfo(
    mass, groundMotionState, shape, inertia);
  var groundRigidBody = new Ammo.btRigidBody(ci);
  diem.Physics.get().getWorld().addRigidBody(groundRigidBody);
};
