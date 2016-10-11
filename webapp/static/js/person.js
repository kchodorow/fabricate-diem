/* global Ammo, THREE */

goog.provide('diem.Person');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.Pin');
goog.require('diem.events');
goog.require('diem.tools.DragPiece');

/**
 * @param {THREE.Scene} scene
 * @param {Function} register
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.Person = function(scene, register) {
  goog.base(this);

  var loader = new THREE.ObjectLoader();
  var tmp = this;
  loader.load(
    '/assets/standard-female-figure.json',
    function(object) {
      var person = object.children[0];
      tmp.mesh_ = person;
      tmp.addToParent(scene);
      register(tmp.getIntersectables());
      tmp.mesh_.rotateZ(Math.PI);
      tmp._addPhysics(scene);
    });
};

goog.inherits(diem.Person, diem.MeshWrapper);

/**
 * @override
 */
diem.Person.prototype.move = function(dir) {
  var modified = dir.length == 2;
  switch (dir[0]) {
  case goog.events.KeyCodes.LEFT:
    goog.asserts.assert(modified);
    this.mesh_.rotateZ(-.1);
    break;
  case goog.events.KeyCodes.RIGHT:
    goog.asserts.assert(modified);
    this.mesh_.rotateZ(.1);
    break;
  }

  // Update physics.
  this.physicalBody_.setWorldTransform(this.getTransform_());
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
 * @param {THREE.Scene} scene
 * @private
 */
diem.Person.prototype._addPhysics = function(scene) {
  var bodyMotionState = new Ammo.btDefaultMotionState(
    this.getTransform_());
  var bodyShape = new Ammo.btConvexHullShape();
  var vertices = this.mesh_.geometry.vertices;
  for (var i = 0; i < vertices.length; ++i) {
    bodyShape.addPoint(
      new Ammo.btVector3(vertices[i].x, vertices[i].y, vertices[i].z));
  }
  var inertia = new Ammo.btVector3(0, 0, 0);
  var mass = 0;
  var bodyInfo = new Ammo.btRigidBodyConstructionInfo(
    mass, bodyMotionState, bodyShape, inertia);
  this.physicalBody_ = new Ammo.btRigidBody(bodyInfo);

  diem.Physics.get().getWorld().addRigidBody(this.physicalBody_);
};

/**
 * @override
 */
diem.Person.prototype.getIntersectables = function() {
  return [diem.tools.DragPiece.createIntersectable(
      diem.events.CLICKABLE, this)];
};

/**
 * @param {Object} intersection
 * @returns {Array}
 */
diem.Person.prototype.onClick = function(intersection) {
  var pin = new diem.Pin(intersection.point);
  pin.addToParent(this.mesh_.parent);
  return [];
};
