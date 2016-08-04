/* global THREE */
goog.provide('diem.Pin');

goog.require('diem.MeshWrapper');

/**
 * @param {THREE.Vector3} position
 * @constructor
 */
diem.Pin = function(position) {
  goog.base(this);
  var geometry = new THREE.BoxGeometry(.5, .5, 0);
  var material = new THREE.MeshBasicMaterial({color : 0x000000});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.set(position.x, position.y, position.z + 1);
  this.mesh_.name = "pin" + diem.Pin.PINS++;
};

goog.inherits(diem.Pin, diem.MeshWrapper);

diem.Pin.PINS = 0;
