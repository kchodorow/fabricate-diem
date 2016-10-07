/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.Anchor');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.cloth.Edge');
goog.require('diem.cloth.PhysicalPiece');
goog.require('diem.tools.DragPiece');
goog.require('goog.Uri');
goog.require('goog.net.XhrIo');
goog.require('goog.structs.Map');

/**
 * @param {number} w
 * @param {number} h
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.Workboard = function(w, h) {
  goog.base(this);
  this.w = w;
  this.h = h;

  this.fabric_ = new diem.Fabric();

  // The piece currently being dragged.
  this.currentPiece_ = null;
  this.initMeshes_();
  this.send();
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
  this.shape_['edges_'] = [];
  for (i = 0; i < corners.length; ++i) {
    var startAnchor = this.anchors_[i];
    var j = (i + 1) % corners.length;
    var endAnchor = this.anchors_[j];

    var edge = new diem.cloth.Edge(startAnchor, endAnchor);
    this.shape_.curves.push(edge.getBezierCurve());
    this.shape_['edges_'].push(edge);
  }
  diem.cloth.ControlPoint.updateActions(this.shape_);

  this.geometry_ = new THREE.ShapeGeometry(this.shape_);

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
  this.mesh_.shape = this.shape_;

  for (i = 0; i < this.anchors_.length; ++i) {
    this.anchors_[i].addToParent(this.mesh_);
    this.shape_['edges_'][i].addToParent(this.mesh_);
  }
};

/**
 * @override
 */
diem.cloth.Workboard.prototype.getIntersectables = function() {
  var intersects = [diem.tools.DragPiece.createIntersectable(
      diem.events.DRAGGABLE, this)];
  for (var i = 0; i < this.anchors_.length; ++i) {
    intersects = intersects
      .concat(this.anchors_[i].getIntersectables())
      .concat(this.shape_['edges_'][i].getIntersectables());
  }
  return intersects;
};

/**
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.getEdges = function() {
  return this.shape_['edges_'];
};

/**
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.onDragStart = function() {
  var physicalPiece = new diem.cloth.PhysicalPiece(this.mesh_, this.w, this.h);
  physicalPiece.addToParent(this.mesh_.parent);
  physicalPiece.onDragStart();
  this.currentPiece_ = physicalPiece;
  return physicalPiece.getIntersectables();
};

/**
 * Moves the fabric.
 */
diem.cloth.Workboard.prototype.onDrag = function() {
  // We have to delegate this for the initial drag to work, since there's
  // no piece to drag when the drag starts.
  this.currentPiece_.onDrag();
};

/**
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.onDragEnd = function() {
  return this.currentPiece_.onDragEnd();
};

diem.cloth.Workboard.prototype.send = function() {
  var request = new goog.net.XhrIo();
  var anchors = [];
  for (var i = 0; i < this.anchors_.length; ++i) {
    var anchor = this.anchors_[i];
    anchors.push(anchor.getObject().position);
  }
  var data = {anchors : anchors};
  request.send(
    window.location.pathname, 'POST', "data=" + JSON.stringify(data));
};
