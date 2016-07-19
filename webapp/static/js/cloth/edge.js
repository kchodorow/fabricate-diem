/* global THREE */
goog.provide('diem.cloth.Edge');

goog.require('diem.Fabric');
goog.require('diem.Globals');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.Anchor');
goog.require('diem.events.Clickable');

/**
 * An edge is made up of two anchor points, and described by two control points.
 * @param {diem.cloth.Anchor} startAnchor the anchor "starting" an edge.
 * @param {diem.cloth.Anchor} endAnchor the anchor "finishing" an edge.
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.Edge = function(startAnchor, endAnchor) {
  goog.base(this);
  diem.events.Clickable.register(this);

  this.startAnchor_ = startAnchor;
  this.endAnchor_ = endAnchor;

  var startAnchorPos = startAnchor.getObject().position;
  var startAnchorCp = startAnchor.getClockwiseCp().getObject().position;
  var endAnchorCp = endAnchor.getCounterClockwiseCp().getObject().position;
  var endAnchorPos = endAnchor.getObject().position;

  this.curve_ = new THREE.CubicBezierCurve3(
    startAnchorPos,
    startAnchorCp,
    endAnchorCp,
    endAnchorPos);

  var geometry = new THREE.Geometry();
  var points = this.curve_.getPoints();
  for (var i = 0; i < points.length; ++i) {
    geometry.vertices.push(points[i]);
  }
  var material = new THREE.LineBasicMaterial(
    {color : diem.Fabric.getRandomColor()});
  this.mesh_ = new THREE.Line(geometry, material);
};

goog.inherits(diem.cloth.Edge, diem.MeshWrapper);

/**
 * @override
 */
diem.cloth.Edge.prototype.addToParent = function(parent) {
  // Anchor points are added directly to the piece mesh, otherwise they'd appear
  // twice in the shape (once for each edge).
  parent.add(this.mesh_);
  this.dirtyParent_();
};

/**
 * @private
 */
diem.cloth.Edge.prototype.dirtyParent_ = function() {
  diem.cloth.ControlPoint.updateActions(this.mesh_.parent.shape);
  this.mesh_.parent.geometry = this.mesh_.parent.shape.makeGeometry();
};

/**
 * @override
 */
diem.cloth.Edge.prototype.addToEventHandler = function(handler) {
  handler.register(this);
};

/**
 * @returns {THREE.CubicBezierCurve3}
 */
diem.cloth.Edge.prototype.getBezierCurve = function() {
  return this.curve_;
};

/**
 * Returns the action struct used by THREE.Geometry to create the shape.
 * @returns {Object}
 */
diem.cloth.Edge.prototype.generateAction = function() {
  return {
    action: 'bezierCurveTo',
    args: [
      this.curve_.v1.x, this.curve_.v1.y,
      this.curve_.v2.x, this.curve_.v2.y,
      this.curve_.v3.x, this.curve_.v3.y] // Doubles as v0 for the next point.
  };
};

/**
 * Static function for tools to bind.
 * @returns {Array}
 */
diem.cloth.Edge.onClick = function() {
  return [];
};

/**
 * Called when a tool has swapped this in as the onClick action.
 * @override
 */
diem.cloth.Edge.prototype.onClick = function() {
  return goog.bind(diem.cloth.Edge.onClick, this).call();
};

/**
 * Called for clicks when the diem.tools.AddAnchorPoint is enabled.
 * @this {diem.cloth.Edge}
 * @returns {Array}
 */
diem.cloth.Edge.addAnchorPoint = function() {
  // Create a new anchor point where the mouse is.
  var oldEndAnchor = this.endAnchor_;
  var newAnchor = new diem.cloth.Anchor(diem.Globals.mouse);
  this.replaceEndAnchor(newAnchor);
  newAnchor.addToParent(this.mesh_);

  // Create a new bezier curve for mouse -> end of line.
  var newEdge = new diem.cloth.Edge(this.endAnchor_, oldEndAnchor);
  newEdge.addToParent(this.mesh_.parent);
  return [newAnchor, newEdge];
};

/**
 * Returns the second anchor point in the edge.
 * @returns {diem.cloth.Anchor}
 */
diem.cloth.Edge.prototype.getEndAnchor = function() {
  return this.endAnchor_;
};

/**
 * Replaces the second anchor point with a new one.
 * @param {diem.cloth.Anchor} newAnchorPoint the anchor point to be used.
 */
diem.cloth.Edge.prototype.replaceEndAnchor = function(newAnchorPoint) {
  this.endAnchor_ = newAnchorPoint;

  // Modify the end point.
  this.curve_.v2 = this.endAnchor_.getCounterClockwiseCp().getObject().position;
  this.curve_.v3 = this.endAnchor_.getObject().position;
  this.generateGeometry_();
};

/**
 * @private
 */
diem.cloth.Edge.prototype.generateGeometry_ = function() {
  var points = this.curve_.getPoints();
  for (var i = 0; i < points.length; ++i) {
    this.mesh_.geometry.vertices[i].copy(points[i]);
  }
  this.mesh_.geometry.verticesNeedUpdate = true;
};
