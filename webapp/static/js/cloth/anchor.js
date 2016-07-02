/* global THREE */

goog.provide('diem.cloth.Anchor');

diem.cloth.Anchor = function(corner) {
  this.corner_ = corner;
  var geometry = new THREE.BoxGeometry(
    diem.cloth.Anchor.ANCHOR_SIZE,
    diem.cloth.Anchor.ANCHOR_SIZE,
    0);
  var material = new THREE.LineBasicMaterial({color : 0xff0000});
  this.box_ = new THREE.Line(geometry, material);
  this.box_.position.copy(this.corner_);
};

diem.cloth.Anchor.ANCHOR_SIZE = .30;

diem.cloth.Anchor.prototype.getObject = function() {
  return this.box_;
};

diem.cloth.Anchor.prototype.onClick = function() {
};

diem.cloth.Anchor.prototype.onDrag = function(vec) {
  this.box_.position.copy(diem.Globals.mouse);
};
