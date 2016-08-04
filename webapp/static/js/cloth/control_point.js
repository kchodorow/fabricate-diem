/* global THREE */
goog.provide('diem.cloth.ControlPoint');

goog.require('diem.events');
goog.require('diem.tools.AnchorPoint');

/**
 * @constructor
 * @param {THREE.Mesh} mesh the anchor point's mesh.
 */
diem.cloth.ControlPoint = function(mesh) {
  goog.base(this);

  this.mesh_ = mesh.clone();
  this.anchor_ = mesh;

  var lineMaterial = new THREE.LineBasicMaterial(
    {color : this.mesh_.material.color});
  var lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(mesh.position, this.mesh_.position);
  this.line_ = new THREE.Line(lineGeometry, lineMaterial);

  // The initial drag is handled by the anchor point, since both control points
  // move.
  this.independentlyDraggable_ = true;
};

goog.inherits(diem.cloth.ControlPoint, diem.MeshWrapper);

/**
 * Returns the line mesh from the anchor to this control point.
 * @returns {THREE.Line}
 */
diem.cloth.ControlPoint.prototype.getLine = function() {
  return this.line_;
};

/**
 * Returns the line and box mesh.
 * @returns {Array}
 */
diem.cloth.ControlPoint.prototype.getMeshes = function() {
  return [this.mesh_, this.line_];
};

/**
 * @override
 */
diem.cloth.ControlPoint.prototype.getIntersectables = function() {
  return [diem.tools.AnchorPoint.createIntersectable(
    diem.events.DRAGGABLE, this)];
};

/**
 * Change the state so this can/can't be modified by dragging the anchor point.
 * @param {boolean} draggable
 */
diem.cloth.ControlPoint.prototype.setIndependentlyDraggable = function(draggable) {
  this.independentlyDraggable = draggable;
};

/**
 * Update the position of the control point and update the underlying shape.
 * pattern: (2, 2, 0)
 * cp:      (8, 5, 0)
 * mouse:   (11, 6, 0)
 * ->       (1, -1, 0)
 */
diem.cloth.ControlPoint.prototype.onDrag = function() {
  if (!this.independentlyDraggable_) {
    return;
  }
  this.onDragImpl();
};

/**
 * @param {number} [opt_multiplier]
 */
diem.cloth.ControlPoint.prototype.onDragImpl = function(opt_multiplier) {
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

  diem.cloth.ControlPoint.updateWorkboardGeometry(this.mesh_.parent);
};

/**
 * @param {THREE.Mesh} workboardMesh
 */
diem.cloth.ControlPoint.updateWorkboardGeometry = function(workboardMesh) {
  // Use the parent's shape to update the fabric's curves.
  diem.cloth.ControlPoint.updateActions(workboardMesh.shape);
  workboardMesh.geometry = workboardMesh.shape.makeGeometry();
  // Update edges.
  for (var i = 0; i < workboardMesh.children.length; ++i) {
    workboardMesh.children[i].geometry.verticesNeedUpdate = true;
  }
};

/**
 * Mark the line as needing to be redrawn.
 */
diem.cloth.ControlPoint.prototype.updateLine = function() {
  this.line_.geometry.verticesNeedUpdate = true;
};

/**
 * THREE.ShapeGeometry uses the list of actions to regenerate the vertices, so
 * update them wrt the curves.
 * @param {THREE.Shape} oldShape the Shape used to create a pattern piece's
 *     geometry.
 */
diem.cloth.ControlPoint.updateActions = function(oldShape) {
  // Initial moveTo is required for THREE.Shape's actions to be properly formed.
  var actions = [{
    action: 'moveTo',
    args: [
      oldShape.edges_[0].getBezierCurve().v0.x,
      oldShape.edges_[0].getBezierCurve().v0.y
    ]
  }];
  for (var i = 0; i < oldShape.edges_.length; ++i) {
    actions.push(oldShape.edges_[i].generateAction());
    oldShape.edges_[i].updateGeometry();
  }
  oldShape.actions = actions;
};
