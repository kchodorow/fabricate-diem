/* global THREE */
goog.provide('diem.cloth.Edge');

goog.require('diem.Fabric');
goog.require('diem.cloth.Anchor');

/**
 * An edge is made up of two anchor points, and described by two control points.
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

diem.cloth.Edge.prototype.getObject = function() {
  return this.mesh_;
};

diem.cloth.Edge.prototype.getBezierCurve = function() {
  return this.curve_;
};

diem.cloth.Edge.prototype.generateAction = function() {
  return {
    action: 'bezierCurveTo',
    args: [
      this.curve_.v1.x, this.curve_.v1.y,
      this.curve_.v2.x, this.curve_.v2.y,
      this.curve_.v3.x, this.curve_.v3.y] // Doubles as v0 for the next point.
  };
};

// For now, add point only.
diem.cloth.Edge.prototype.onClick = function() {
  // Create a new anchor point where the mouse is.
  var oldEndAnchor = this.endAnchor_;
  this.endAnchor_ = new diem.cloth.Anchor(diem.Globals.mouse);

  // Modify the end point.
  this.curve_.v2 = this.endAnchor_.getCounterClockwiseCp().getObject().position;
  this.curve_.v3 = this.endAnchor_.getObject().position;

  // Create a new bezier curve for mouse -> end of line.
  var newEdge = new diem.cloth.Edge(this.endAnchor_, oldEndAnchor);
  this.parent.add(newEdge);
};
