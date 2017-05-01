/* global Ammo, THREE */

goog.provide('diem.Person');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.Pin');
goog.require('diem.events');
goog.require('diem.tools.DragPiece');

/**
 * @param {THREE.Scene} scene
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.Person = function(scene) {
  goog.base(this);
  this.scene_ = scene;

  var loader = new THREE.BufferGeometryLoader();
  loader.load('/assets/dressform.json', goog.bind(this.onModelLoad_, this));
};

goog.inherits(diem.Person, diem.MeshWrapper);

diem.Person.POSITION = new THREE.Vector3(-20, 8, 0);

/**
 * @param {THREE.Geometry} geometry
 * @private
 */
diem.Person.prototype.onModelLoad_ = function(geometry) {
  var material = new THREE.MeshLambertMaterial({color: 0x595241});
  var person = new THREE.Mesh(geometry, material);
  this.mesh_ = person;
  this.mesh_.position.set(
    diem.Person.POSITION.x, diem.Person.POSITION.y, diem.Person.POSITION.z);
  this.mesh_.rotation.y = THREE.Math.degToRad(45);
  this.addToParent(this.scene_);
  this._addPhysics();
};

/**
 * @override
 */
diem.Person.prototype.move = function(dir) {
  var modified = dir.length == 2;
  switch (dir[0]) {
  case goog.events.KeyCodes.LEFT:
    goog.asserts.assert(modified);
    this.mesh_.rotateY(-.1);
    break;
  case goog.events.KeyCodes.RIGHT:
    goog.asserts.assert(modified);
    this.mesh_.rotateY(.1);
    break;
  }

  // Update physics.
  this.mesh_.userData.physicsBody.setWorldTransform(this.getTransform_());
};

/**
 * Updates the given btTransform to match the mesh's position and rotation.
 * @returns {Ammo.btTransform}
 * @private
 */
diem.Person.prototype.getTransform_ = function() {
  var transform = new Ammo.btTransform();
  transform.setOrigin(new Ammo.btVector3(
    this.mesh_.position.x, this.mesh_.position.y, this.mesh_.position.z));
  var meshQuat = this.mesh_.getWorldQuaternion();
  var quaternion = new Ammo.btQuaternion(
    meshQuat.x, meshQuat.y, meshQuat.z, meshQuat.w);
  transform.setRotation(quaternion);
  return transform;
};

/**
 * @private
 */
diem.Person.prototype._addPhysics = function() {
  var bodyMotionState = new Ammo.btDefaultMotionState(
    this.getTransform_());
  var bodyShape = new Ammo.btConvexHullShape();
  var vertices = this.mesh_.geometry.attributes.position.array;
  for (var i = 0; i < vertices.length; i += 3) {
    bodyShape.addPoint(
      new Ammo.btVector3(vertices[i], vertices[i + 1], vertices[i + 2]));
  }
  var inertia = new Ammo.btVector3(0, 0, 0);
  var mass = 0;
  var bodyInfo = new Ammo.btRigidBodyConstructionInfo(
    mass, bodyMotionState, bodyShape, inertia);
  this.mesh_.userData.physicsBody = new Ammo.btRigidBody(bodyInfo);

  diem.Physics.get().getWorld().addRigidBody(this.mesh_.userData.physicsBody);
};
