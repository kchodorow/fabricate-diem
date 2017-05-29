/* global THREE */
goog.provide('diem.cloth.Edge');

goog.require('diem.Globals');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.Anchor');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.events');
goog.require('diem.storage.Anchor');
goog.require('diem.tools.AddAnchorPoint');

goog.require('goog.asserts');

/**
 * An edge is made up of two anchor points, and described by two control points.
 * @param {diem.cloth.Anchor} startAnchor the anchor "starting" an edge.
 * @param {diem.cloth.Anchor} endAnchor the anchor "finishing" an edge.
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.Edge = function(startAnchor, endAnchor) {
  goog.base(this);
  goog.asserts.assert(startAnchor != null);
  goog.asserts.assert(endAnchor != null);

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
  var points = this.curve_.getPoints(diem.cloth.Edge.NUM_POINTS);
  for (var i = 0; i < points.length; ++i) {
    geometry.vertices.push(points[i]);
  }
  var material = new THREE.LineBasicMaterial({color : 0x000000});
  this.mesh_ = new THREE.Line(geometry, material);
  this.mesh_.name = "edge" + diem.cloth.Edge.INDEX++;

  this.selected_ = false;
  this.isFold_ = false;
  this.foldLine_ = null;
};

goog.inherits(diem.cloth.Edge, diem.MeshWrapper);

diem.cloth.Edge.NUM_POINTS = 12;
diem.cloth.Edge.INDEX = 0;

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
 * @override
 */
diem.cloth.Edge.prototype.getIntersectables = function() {
  return [
    diem.tools.AddAnchorPoint.createIntersectable(diem.events.CLICKABLE, this),
    diem.tools.FoldTool.createIntersectable(diem.events.CLICKABLE, this)
  ];
};

/**
 * @private
 */
diem.cloth.Edge.prototype.dirtyParent_ = function() {
  diem.cloth.ControlPoint.updateActions(this.mesh_.parent.shape);
  this.mesh_.parent.geometry = this.mesh_.parent.shape.makeGeometry();
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
 * Called for clicks when the diem.tools.AddAnchorPoint is enabled.
 * @param {array} intersects
 * @returns {Array}
 */
diem.cloth.Edge.prototype.onClick = function(intersects) {
  // Create a new anchor point where the mouse is.
  var workboardMesh = this.mesh_.parent;
  var oldEndAnchor = this.endAnchor_;
  var newAnchor = new diem.cloth.Anchor(
    diem.storage.Anchor.fromVector(diem.Globals.mouse));
  this.replaceEndAnchor(newAnchor);
  newAnchor.addToParent(workboardMesh);

  // Create a new bezier curve for mouse -> end of line.
  var newEdge = new diem.cloth.Edge(newAnchor, oldEndAnchor);
  // Find the old edge in the parent and push the new edge.
  var parentEdges = workboardMesh.shape['edges_'];
  for (var i = 0; i < parentEdges.length; ++i) {
    if (parentEdges[i].startAnchor_ == this.startAnchor_) {
      parentEdges.splice(i + 1, 0, newEdge);
      break;
    }
  }
  newEdge.addToParent(workboardMesh);
  diem.cloth.ControlPoint.updateWorkboardGeometry(workboardMesh);
  return newEdge.getIntersectables().concat(newAnchor.getIntersectables());
};

/**
 * Turn this edge into the fabric's fold.
 * @returns {Array}
 */
diem.cloth.Edge.prototype.fold = function() {
  // If this is already a fold, just unfold it.
  if (this.isFold_) {
    this.unfold();
    return [];
  }

  // Check that the anchor points are not making this curved.
  var startCp = this.startAnchor_.getClockwiseCp();
  var endCp = this.endAnchor_.getCounterClockwiseCp();
  if (!startCp.getObject().position.equals(
    this.startAnchor_.getObject().position)
      || !endCp.getObject().position.equals(
        this.endAnchor_.getObject().position)) {
    // TODO: make this error in some way (turn red?).
    return [];
  }

  // Make sure there are no other folds.
  var edges = this.mesh_.parent.shape.edges_;
  for (let i = 0; i < edges.length; ++i) {
    if (edges[i].isFold_) {
      edges[i].unfold();
    }
  }

  startCp.lock();
  endCp.lock();
  this.isFold_ = true;

  this.foldLine_ = this.createFoldLine_();
  this.mesh_.add(this.foldLine_);
  return [];
};

diem.cloth.Edge.prototype.createFoldLine_ = function() {
  var start = this.curve_.v0.clone();
  var end = this.curve_.v3.clone();
  var edgeVec = end.clone().sub(start);
  var unit = edgeVec.clone().normalize();
  var norm = new THREE.Vector3(unit.y, unit.x, 0);
  var bump = edgeVec.clone().multiplyScalar(.2);
  var triangle = new THREE.Geometry();
  triangle.vertices.push(new THREE.Vector3(0, 0, 0));
  triangle.vertices.push(new THREE.Vector3(.25, .5, 0));
  triangle.vertices.push(new THREE.Vector3(-.25, .5, 0));
  triangle.faces.push(new THREE.Face3(0, 1, 2));
  triangle.computeFaceNormals();
  let normAngle = new THREE.Vector2(norm.x, norm.y).angle() + Math.PI/2;
  let rotationMatrix = new THREE.Matrix4();
  rotationMatrix.set(
    Math.cos(normAngle), -Math.sin(normAngle), 0, 0,
    Math.sin(normAngle), Math.cos(normAngle), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
  triangle.applyMatrix(rotationMatrix);
  var triangleMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
  var geometry = new THREE.Geometry();
  geometry.vertices.push(start.add(bump).clone());
  var triangle1 = new THREE.Mesh(triangle.clone(), triangleMaterial);
  triangle1.position.set(start.x, start.y, 0);
  geometry.vertices.push(start.sub(norm).clone());
  geometry.vertices.push(start.add(edgeVec.multiplyScalar(.6)).clone());
  geometry.vertices.push(start.add(norm).clone());
  var triangle2 = new THREE.Mesh(triangle.clone(), triangleMaterial);
  triangle2.position.set(start.x, start.y, 0);

  var material = new THREE.LineBasicMaterial({color: 0x000000});
  var foldLine = new THREE.Line(geometry, material);
  foldLine.add(triangle1);
  foldLine.add(triangle2);
  return foldLine;
};

/**
 * Unmark this edge as folded.
 */
diem.cloth.Edge.prototype.unfold = function() {
  this.mesh_.remove(this.foldLine_);
  this.startAnchor_.getClockwiseCp().unlock();
  this.endAnchor_.getCounterClockwiseCp().unlock();
  this.isFold_ = false;
};

/**
 * @returns {boolean} if this is a folded edge.
 */
diem.cloth.Edge.prototype.isFold = function() {
  return this.isFold_;
};

/**
 * Returns the second anchor point in the edge.
 * @returns {diem.cloth.Anchor}
 */
diem.cloth.Edge.prototype.getEndAnchor = function() {
  return this.endAnchor_;
};

diem.cloth.Edge.prototype.getEndpoints = function() {
  return {
    start: this.startAnchor_.getObject().position.clone(),
    end: this.endAnchor_.getObject().position.clone()
  };
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
  this.updateGeometry();
};

/**
 * Refreshes the mesh's geometry.
 */
diem.cloth.Edge.prototype.updateGeometry = function() {
  var points = this.curve_.getPoints(diem.cloth.Edge.NUM_POINTS);
  for (var i = 0; i < points.length; ++i) {
    this.mesh_.geometry.vertices[i].copy(points[i]);
  }
  this.mesh_.geometry.verticesNeedUpdate = true;
};
