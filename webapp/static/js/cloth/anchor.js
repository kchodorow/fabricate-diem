/* global THREE */

goog.provide('diem.cloth.Anchor');

goog.require('diem.Fabric');

diem.cloth.Anchor = function(corner) {
  this.corner_ = corner;
  var geometry = new THREE.BoxGeometry(
    diem.cloth.Anchor.ANCHOR_SIZE,
    diem.cloth.Anchor.ANCHOR_SIZE,
    0);
  var material = new THREE.MeshBasicMaterial({color : diem.Fabric.getRandomColor()});
  this.box_ = new THREE.Mesh(geometry, material);
  this.box_.position.copy(this.corner_);

  this.controlPoint_ = [
    new diem.cloth.Anchor.ControlPoint(this.box_.clone()),
    new diem.cloth.Anchor.ControlPoint(this.box_.clone())];
};

diem.cloth.Anchor.ANCHOR_SIZE = .30;

diem.cloth.Anchor.prototype.getObject = function() {
  return this.box_;
};

diem.cloth.Anchor.prototype.getMeshes = function() {
  return [
    this.box_,
    this.controlPoint_[0].getObject(),
    this.controlPoint_[1].getObject()];
};

diem.cloth.Anchor.prototype.onClick = function() {
};

diem.cloth.Anchor.prototype.onDrag = function() {
  // Get the offsets from the origin
  var offset = new THREE.Vector3();
  offset.copy(this.box_.position).sub(diem.Globals.mouse);
  var opposite = new THREE.Vector3();
  opposite.copy(offset).multiplyScalar(-1);

  // Remap to the anchor point.
  offset.add(this.box_.position);
  opposite.add(this.box_.position);

  // normal offset.
  this.controlPoint_[0].onDrag(offset);

  // opposite offset.
  this.controlPoint_[1].onDrag(opposite);
};

diem.cloth.Anchor.ControlPoint = function(mesh) {
  this.mesh_ = mesh;
};

diem.cloth.Anchor.ControlPoint.prototype.getObject = function() {
  return this.mesh_;
};

diem.cloth.Anchor.ControlPoint.prototype.onDrag = function(vec) {
  this.mesh_.position.copy(vec);
};
