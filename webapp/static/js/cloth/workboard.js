/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.Anchor');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.cloth.Edge');
goog.require('diem.cloth.PhysicalPiece');
goog.require('diem.tools.TimeTool');

/**
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.Workboard = function() {
  goog.base(this);
  diem.events.Draggable.register(this);
  this.w = 10;
  this.h = 7;

  this.fabric_ = new diem.Fabric();

  // A list of physical pieces of fabric of this shape.
  this.pieces_ = [];
  // The piece currently being dragged.
  this.currentPiece_ = null;
  this.initMeshes_();
};

goog.inherits(diem.cloth.Workboard, diem.MeshWrapper);

/**
 * Initial square of cloth.
 * @private
 */
diem.cloth.Workboard.prototype.initMeshes_ = function() {
  var corners = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(this.w, 0, 0),
    new THREE.Vector3(this.w, this.h, 0),
    new THREE.Vector3(0, this.h, 0)];

  this.anchors_ = [];
  for (var i = 0; i < corners.length; ++i) {
    this.anchors_.push(new diem.cloth.Anchor(corners[i]));
  }

  this.shape_ = new THREE.Shape();
  this.shape_.edges_ = [];
  for (i = 0; i < corners.length; ++i) {
    var startAnchor = this.anchors_[i];
    var j = (i + 1) % corners.length;
    var endAnchor = this.anchors_[j];

    var edge = new diem.cloth.Edge(startAnchor, endAnchor);
    this.shape_.curves.push(edge.getBezierCurve());
    this.shape_.edges_.push(edge);
  }
  diem.cloth.ControlPoint.updateActions(this.shape_);

  this.geometry_ = new THREE.ShapeGeometry(this.shape_);

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
  this.mesh_.shape = this.shape_;

  for (i = 0; i < this.anchors_.length; ++i) {
    this.anchors_[i].addToParent(this.mesh_);
    this.shape_.edges_[i].addToParent(this.mesh_);
  }
};

/**
 * @override
 */
diem.cloth.Workboard.prototype.getIntersectables = function() {
  var intersects = [diem.tools.DragPiece.createIntersectable(
      diem.events.Draggable.ID, this)];
  for (var i = 0; i < this.anchors_.length; ++i) {
    intersects = intersects
      .concat(this.anchors_[i].getIntersectables())
      .concat(this.shape_.edges_[i].getIntersectables());
  }
  return intersects;
};

/**
 * @override
 */
diem.cloth.Workboard.prototype.addToEventHandler = function(handler) {
  handler.register(this);
  var edges = this.shape_.edges_;
  for (var i = 0; i < edges.length; ++i) {
    edges[i].addToEventHandler(handler);
    this.anchors_[i].addToEventHandler(handler);
  }
};

/**
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.getEdges = function() {
  return this.shape_.edges_;
};

diem.cloth.Workboard.prototype.onDragStart = function() {
  var physicalPiece = new diem.cloth.PhysicalPiece(this.mesh_);
  physicalPiece.addToParent(this.mesh_.parent);
  this.pieces_.push(physicalPiece);
  this.currentPiece_ = physicalPiece;
  return physicalPiece.getIntersectables();
};

diem.cloth.Workboard.prototype.onDrag = function() {
  this.currentPiece_.mesh_.position.set(
    diem.Globals.mouse.x, diem.Globals.mouse.y, 0);
};
