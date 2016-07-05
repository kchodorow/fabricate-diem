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
  this.box_.position.copy(this.corner_);

  this.cwCp_ = new diem.cloth.Anchor.ControlPoint(this.box_);
  this.ccwCp_ = new diem.cloth.Anchor.ControlPoint(this.box_);
};

diem.cloth.Anchor.ANCHOR_SIZE = .30;

diem.cloth.Anchor.prototype.getObject = function() {
  return this.box_;
};

diem.cloth.Anchor.prototype.getMeshes = function() {
  return [this.box_]
    .concat(this.cwCp_.getMeshes())
    .concat(this.ccwCp_.getMeshes());
};

diem.cloth.Anchor.prototype.getClockwiseCp = function() {
  return this.cwCp_;
};

diem.cloth.Anchor.prototype.getCounterClockwiseCp = function() {
  return this.ccwCp_;
};

diem.cloth.Anchor.prototype.onClick = function() {
};

// parent: (2, 2, 0)
// box:    (8, 5, 0)
// mouse:  (11, 6, 0)
// ->      (1, -1, 0)
diem.cloth.Anchor.prototype.onDrag = function() {
  // Get the offsets from the origin
  var offset = new THREE.Vector3();
  offset.copy(diem.Globals.mouse)
    .sub(this.box_.parent.position)
    .sub(this.box_.position);
  var opposite = new THREE.Vector3();
  opposite.copy(offset).multiplyScalar(-1);

  // Remap to the anchor point.
  offset.add(this.box_.position);
  opposite.add(this.box_.position);

  // normal offset.
  this.cwCp_.onDrag(offset);

  // opposite offset.
  this.ccwCp_.onDrag(opposite);

  // Use the parent's shape to update the fabric's curves.
  var parent = this.box_.parent;
  diem.cloth.Anchor.updateActions(parent.shape);
  parent.geometry = parent.shape.makeGeometry();
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

  var lineMaterial = new THREE.LineBasicMaterial(
    {color : this.mesh_.material.color});
  var lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(mesh.position, this.mesh_.position);
  this.line_ = new THREE.Line(lineGeometry, lineMaterial);
};

diem.cloth.Anchor.ControlPoint.prototype.getObject = function() {
  return this.mesh_;
};

diem.cloth.Anchor.ControlPoint.prototype.getMeshes = function() {
  return [this.mesh_, this.line_];
};

diem.cloth.Anchor.ControlPoint.prototype.onDrag = function(vec) {
  this.mesh_.position.copy(vec);
  this.line_.geometry.verticesNeedUpdate = true;
};
