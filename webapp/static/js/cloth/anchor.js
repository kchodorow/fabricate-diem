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

  this.controlPoint_ = [];
  this.cpLine_ = [];
  var lineMaterial = new THREE.LineBasicMaterial({color : color});
  for (var i = 0; i < 2; i++) {
    var cp = new diem.cloth.Anchor.ControlPoint(this.box_.clone());
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(cp.getObject().position, this.box_.position);
    var line = new THREE.Line(lineGeometry, lineMaterial);
    this.controlPoint_.push(cp);
    this.cpLine_.push(line);
  }
};

diem.cloth.Anchor.ANCHOR_SIZE = .30;

diem.cloth.Anchor.prototype.getObject = function() {
  return this.box_;
};

diem.cloth.Anchor.prototype.getMeshes = function() {
  return [this.box_, this.controlPoint_[0].getObject(),
    this.controlPoint_[1].getObject()].concat(this.cpLine_);
};

diem.cloth.Anchor.prototype.getControlPoints = function() {
  return this.controlPoint_;
};

diem.cloth.Anchor.prototype.changePosition = function(delta) {
  this.box_.position.sub(delta);
  this.controlPoint_[0].getObject().position.sub(delta);
  this.controlPoint_[1].getObject().position.sub(delta);
  this.updateCpLines_();
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
  this.controlPoint_[0].onDrag(offset);

  // opposite offset.
  this.controlPoint_[1].onDrag(opposite);

  this.updateCpLines_();

  // Get the parent's shape
  var parent = this.box_.parent;
  diem.cloth.Anchor.updateActions(parent.shape);
/*  var newVertices = new THREE.ShapeGeometry(parent.shape).vertices;

  for (var i = 0; i < newVertices.length; ++i) {
    parent.geometry.vertices[i].copy(newVertices[i]);
 }*/
  parent.geometry = parent.shape.makeGeometry();
  parent.geometry.verticesNeedUpdate = true;
  parent.geometry.normalsNeedUpdate = true;
};

diem.cloth.Anchor.updateActions = function(oldShape) {
  var actions = [{
    action: 'moveTo',
    args: [0, 0]
  }];
  for (var i = 0; i < oldShape.curves.length; ++i) {
    var oldCurve = oldShape.curves[i];
    actions.push({
      action: 'bezierCurveTo',
      args: [
        oldCurve.v0.x, oldCurve.v0.y,
        oldCurve.v1.x, oldCurve.v1.y,
        oldCurve.v2.x, oldCurve.v2.y,
        oldCurve.v3.x, oldCurve.v3.y]
    });
  }
  oldShape.actions = actions;
};

diem.cloth.Anchor.prototype.updateCpLines_ = function() {
  for (var i = 0; i < this.cpLine_.length; ++i) {
    this.cpLine_[i].geometry.verticesNeedUpdate = true;
  }
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
