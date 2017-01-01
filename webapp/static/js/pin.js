/* global THREE */
goog.provide('diem.Pin');

goog.require('diem.MeshWrapper');
goog.require('diem.tools.Delete');

/**
 * @param {number} index The vertex's index that the pin is through
 * @param {Ammo.btRigidBody} rigidBody The fixed point representing the mouse.
 * @param {diem.cloth.PhysicalPiece} piece
 * @extends {diem.MeshWrapper}
 * @constructor
 */
diem.Pin = function(index, rigidBody, piece) {
  goog.base(this);
  this.index_ = index;
  this.rigidBody_ = rigidBody;
  this.piece_ = piece;

  var geometry = new THREE.CircleGeometry(.2, 8);
  var material = new THREE.MeshBasicMaterial({color : 0x000000});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.set(diem.Globals.mouse.x, diem.Globals.mouse.y, 1);
  this.mesh_.name = "pin" + diem.Pin.PINS++;
};

goog.inherits(diem.Pin, diem.MeshWrapper);

diem.Pin.PINS = 0;

/**
 * @override
 */
diem.Pin.prototype.getIntersectables = function() {
  return [diem.tools.Delete.createIntersectable(diem.events.CLICKABLE, this)];
};

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

/**
 * Remove this pin.
 */
diem.Pin.prototype.delete = function() {
  diem.Physics.get().getWorld().removeRigidBody(this.rigidBody_);
  this.mesh_.parent.remove(this.mesh_);
  this.rigidBody_ = null;
  this.piece_.removePin(this);
};
