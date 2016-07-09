/* global THREE */
goog.provide('diem.cloth.ControlPoint');

/**
 * @constructor
 */
diem.cloth.ControlPoint = function(mesh) {
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

diem.cloth.ControlPoint.prototype.getObject = function() {
  return this.mesh_;
};

diem.cloth.ControlPoint.prototype.getLine = function() {
  return this.line_;
};

diem.cloth.ControlPoint.prototype.getMeshes = function() {
  return [this.mesh_, this.line_];
};

// pattern: (2, 2, 0)
// cp:      (8, 5, 0)
// mouse:   (11, 6, 0)
// ->       (1, -1, 0)
diem.cloth.ControlPoint.prototype.onDrag = function() {
  if (this.firstDrag_) {
    return;
  }
  this.onDragImpl_();

  // Use the parent's shape to update the fabric's curves.
  diem.cloth.ControlPoint.updateActions(this.mesh_.parent.shape);
  this.mesh_.parent.geometry = this.mesh_.parent.shape.makeGeometry();
};

diem.cloth.ControlPoint.prototype.onDragImpl_ = function(opt_multiplier) {
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

diem.cloth.ControlPoint.prototype.updateLine = function() {
  this.line_.geometry.verticesNeedUpdate = true;
};

/**
 * THREE.ShapeGeometry uses the list of actions to regenerate the vertices, so
 * update them wrt the curves.
 */
diem.cloth.ControlPoint.updateActions = function(oldShape) {
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
