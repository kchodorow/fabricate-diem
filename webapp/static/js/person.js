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
 * @param {THREE.Scene} scene
 * @private
 */
diem.Person.prototype._addPhysics = function(scene) {
  var transform = new Ammo.btTransform();
  transform.setOrigin(new Ammo.btVector3(0, 0, 0));
  var meshQuat = this.mesh_.getWorldQuaternion();
  var quaternion = new Ammo.btQuaternion(
    meshQuat.x, meshQuat.y, meshQuat.z, meshQuat.w);
  transform.setRotation(quaternion);
  var bodyMotionState = new Ammo.btDefaultMotionState(transform);
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
  var rigidBody = new Ammo.btRigidBody(bodyInfo);

  diem.Physics.get().getWorld().addRigidBody(rigidBody);
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
