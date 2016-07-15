/* global THREE */
goog.provide('diem.cloth.Edge');

goog.require('diem.Fabric');
goog.require('diem.cloth.Anchor');

/**
 * An edge is made up of two anchor points, and described by two control points.
 * @param {diem.cloth.Anchor} startAnchor the anchor "starting" an edge.
 * @param {diem.cloth.Anchor} endAnchor the anchor "finishing" an edge.
 * @constructor
 */
diem.cloth.Edge = function(startAnchor, endAnchor) {
  this.startAnchor_ = startAnchor;
  this.endAnchor_ = endAnchor;

  var startAnchorPos = startAnchor.getObject().position;
  var startAnchorCp = startAnchor.getClockwiseCp().getObject().position;
  var endAnchorCp = endAnchor.getCounterClockwiseCp().getObject().position;
  var endAnchorPos = endAnchor.getObject().position;

  this.curve_ = new THREE.CubicBezierCurve(
    startAnchorPos,
    startAnchorCp,
    endAnchorCp,
    endAnchorPos);

  var geometry = new THREE.Geometry();
  geometry.vertices.concat(this.curve_.getPoints());
  var material = new THREE.LineBasicMaterial(
    {color : diem.Fabric.getRandomColor()});
  this.mesh_ = new THREE.Line(geometry, material);
};

/**
 * @returns {THREE.Line}
 */
diem.cloth.Edge.prototype.getObject = function() {
  return this.mesh_;
};

/**
 * @returns {THREE.CubicBezierCurve}
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
 */
diem.cloth.Edge.onClick = function() {};

/**
 * Called when a tool has swapped this in as the onClick action.
 */
diem.cloth.Edge.prototype.onClick = function() {
  goog.bind(diem.cloth.Edge.onClick, this).call();
};

/**
 * Called for clicks when the diem.tools.AddAnchorPoint is enabled.
 * @this {diem.cloth.Edge}
 */
diem.cloth.Edge.addAnchorPoint = function() {
  // Create a new anchor point where the mouse is.
  var oldEndAnchor = this.endAnchor_;
  this.replaceEndAnchor(new diem.cloth.Anchor(diem.Globals.mouse));

  // Create a new bezier curve for mouse -> end of line.
  var newEdge = new diem.cloth.Edge(this.endAnchor_, oldEndAnchor);
  this.parent.add(newEdge);
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
};
