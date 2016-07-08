/* global THREE */

goog.provide('diem.cloth.Anchor');

goog.require('diem.Fabric');
goog.require('diem.cloth.ControlPoint');

diem.cloth.Anchor = function(corner) {
  this.corner_ = corner;
  var color = diem.Fabric.getRandomColor();
  var geometry = new THREE.BoxGeometry(
    diem.cloth.Anchor.ANCHOR_SIZE,
    diem.cloth.Anchor.ANCHOR_SIZE,
    0);
  var material = new THREE.MeshBasicMaterial({color : color});
  this.box_ = new THREE.Mesh(geometry, material);
  Object.defineProperty(this.box_, 'position', {value : this.corner_});

  this.cwCp_ = new diem.cloth.ControlPoint(this.box_);
  this.ccwCp_ = new diem.cloth.ControlPoint(this.box_);
};

diem.cloth.Anchor.ANCHOR_SIZE = .30;

diem.cloth.Anchor.prototype.getObject = function() {
  return this.box_;
};

diem.cloth.Anchor.prototype.getMeshes = function() {
  return this.cwCp_.getMeshes()
    .concat(this.ccwCp_.getMeshes())
    .concat(this.box_);
};

diem.cloth.Anchor.prototype.getClockwiseCp = function() {
  return this.cwCp_;
};

diem.cloth.Anchor.prototype.getCounterClockwiseCp = function() {
  return this.ccwCp_;
};

diem.cloth.Anchor.prototype.onClick = function() {
};

diem.cloth.Anchor.prototype.onDragStart = function() {
  if (this.controlPointsAtOrigin_()) {
    this.dragAllCp_ = true;
  } else {
    this.dragAllCp_ = false;
  }
};

diem.cloth.Anchor.prototype.onDrag = function() {
  if (this.dragAllCp_) {
    // When the anchor points and control points are in the same position,
    // dragging moves both control points.
    this.cwCp_.onDragImpl_();
    this.ccwCp_.onDragImpl_(-1);
  } else {
    this.box_.position.copy(diem.Globals.mouse).sub(this.box_.parent.position);
    this.cwCp_.updateLine();
    this.ccwCp_.updateLine();
  }

  diem.cloth.ControlPoint.updateActions(this.box_.parent.shape);
  this.box_.parent.geometry = this.box_.parent.shape.makeGeometry();
};

diem.cloth.Anchor.prototype.controlPointsAtOrigin_ = function() {
  return this.box_.position.equals(this.cwCp_.getObject().position)
    && this.box_.position.equals(this.ccwCp_.getObject().position);
};
