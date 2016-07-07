/* global THREE */

goog.provide('diem.cloth.Anchor');

goog.require('diem.Fabric');

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

  this.cwCp_ = new diem.cloth.Anchor.ControlPoint(this.box_);
  this.ccwCp_ = new diem.cloth.Anchor.ControlPoint(this.box_);
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

  diem.cloth.Anchor.updateActions(this.box_.parent.shape);
  this.box_.parent.geometry = this.box_.parent.shape.makeGeometry();
};

diem.cloth.Anchor.prototype.controlPointsAtOrigin_ = function() {
  return this.box_.position.equals(this.cwCp_.getObject().position)
    && this.box_.position.equals(this.ccwCp_.getObject().position);
};

/**
 * THREE.ShapeGeometry uses the list of actions to regenerate the vertices, so
 * update them wrt the curves.
 */
diem.cloth.Anchor.updateActions = function(oldShape) {
  // Initial moveTo is required for THREE.Shape's actions to be properly formed.
  var actions = [{
    action: 'moveTo',
    args: [oldShape.curves[0].v0.x, oldShape.curves[0].v0.y]
  }];
  for (var i = 0; i < oldShape.curves.length; ++i) {
    var oldCurve = oldShape.curves[i];
    actions.push({
      action: 'bezierCurveTo',
      args: [
        oldCurve.v1.x, oldCurve.v1.y,
        oldCurve.v2.x, oldCurve.v2.y,
        oldCurve.v3.x, oldCurve.v3.y] // Doubles as v0 for the next point.
    });
  }
  oldShape.actions = actions;
};

diem.cloth.Anchor.ControlPoint = function(mesh) {
  this.mesh_ = mesh.clone();
  this.anchor_ = mesh;

  var lineMaterial = new THREE.LineBasicMaterial(
    {color : this.mesh_.material.color});
  var lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(mesh.position, this.mesh_.position);
  this.line_ = new THREE.Line(lineGeometry, lineMaterial);

  // The initial drag is handled by the anchor point, since both control points
  // move.
  this.firstDrag_ = true;
};

diem.cloth.Anchor.ControlPoint.prototype.getObject = function() {
  return this.mesh_;
};

diem.cloth.Anchor.ControlPoint.prototype.getMeshes = function() {
  return [this.mesh_, this.line_];
};

// pattern: (2, 2, 0)
// cp:      (8, 5, 0)
// mouse:   (11, 6, 0)
// ->       (1, -1, 0)
diem.cloth.Anchor.ControlPoint.prototype.onDrag = function() {
  if (this.firstDrag_) {
    return;
  }
  this.onDragImpl_();

  // Use the parent's shape to update the fabric's curves.
  diem.cloth.Anchor.updateActions(this.mesh_.parent.shape);
  this.mesh_.parent.geometry = this.mesh_.parent.shape.makeGeometry();
};

diem.cloth.Anchor.ControlPoint.prototype.onDragImpl_ = function(opt_multiplier) {
  opt_multiplier = opt_multiplier || 1;
  var patternPiece = this.mesh_.parent;
  // Get the offsets from the origin
  var offset = new THREE.Vector3();
  offset.copy(diem.Globals.mouse)
    .sub(patternPiece.position)
    .sub(this.anchor_.position);
  offset.multiplyScalar(opt_multiplier);

  // Remap to the anchor point.
  offset.add(this.anchor_.position);
  this.mesh_.position.copy(offset);
  this.updateLine();
};

diem.cloth.Anchor.ControlPoint.prototype.updateLine = function() {
  this.line_.geometry.verticesNeedUpdate = true;
};
