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
    'assets/standard-female-figure.json',
    function(object) {
      var person = object.children[0];
      tmp.mesh_ = person;
      tmp.addToParent(scene);
      register(tmp.getIntersectables());
      tmp.mesh_.rotateZ(Math.PI);
      tmp.mesh_.updateMatrixWorld();
      tmp._addPhysics(scene);
    });
};

goog.inherits(diem.Person, diem.MeshWrapper);

diem.Person.prototype._addPhysics = function(scene) {
  var mouseShape = new Ammo.btSphereShape(5);
  var mouseMotionState = new Ammo.btDefaultMotionState(
    new Ammo.btTransform(new Ammo.btQuaternion(0,0,0,1), new Ammo.btVector3(0,0,0)));
  var mouseBodyInfo = new Ammo.btRigidBodyConstructionInfo(
    0, mouseMotionState, mouseShape,
    new Ammo.btVector3(0, 0, 0));
  var mouseRigidBody = new Ammo.btRigidBody(mouseBodyInfo);
  diem.Physics.get().getWorld().addRigidBody(mouseRigidBody);
  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var sphere = new THREE.Mesh( geometry, material );
  scene.add(sphere);
/*
  var bodyMotionState = new Ammo.btDefaultMotionState(
    new Ammo.btTransform(new Ammo.btQuaternion(0,0,0,1), new Ammo.btVector3(0,0,0)));
  var bodyShape = new Ammo.btConvexHullShape();
  var vertices = this.mesh_.geometry.vertices;
  for (var i = 0; i < vertices.length; ++i) {
    bodyShape.addPoint(new Ammo.btVector3(vertices[i].x, vertices[i].y, vertices[i].z));
  }
  var bodyInfo = new Ammo.btRigidBodyConstructionInfo(
    0, bodyMotionState, bodyShape, new Ammo.btVector3(0, 10, 0));
  var rigidBody = new Ammo.btRigidBody(bodyInfo);

  diem.Physics.get().getWorld().addRigidBody(rigidBody);*/
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
