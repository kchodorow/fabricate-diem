/* global THREE */
goog.provide('diem.Pin');

goog.require('diem.MeshWrapper');

/**
 * @param {number} index The vertex's index that the pin is through
 * @param {Ammo.btRigidBody} rigidBody The fixed point representing the mouse.
 * @extends {diem.MeshWrapper}
 * @constructor
 */
diem.Pin = function(index, rigidBody) {
  goog.base(this);
  this.index_ = index;
  this.rigidBody_ = rigidBody;

  var geometry = new THREE.CircleGeometry(.2, 8);
  var material = new THREE.MeshBasicMaterial({color : 0x000000});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.set(diem.Globals.mouse.x, diem.Globals.mouse.y, 1);
  this.mesh_.name = "pin" + diem.Pin.PINS++;
};

goog.inherits(diem.Pin, diem.MeshWrapper);

diem.Pin.PINS = 0;

/**
 * @returns {number}
 */
diem.Pin.prototype.index = function() {
  return this.index_;
};

/**
 * @param {number} idx
 */
diem.Pin.prototype.setIndex = function(idx) {
  this.index_ = idx;
};

/**
 * @returns {Ammo.btRigidBody}
 */
diem.Pin.prototype.rigidBody = function() {
  return this.rigidBody_;
};
