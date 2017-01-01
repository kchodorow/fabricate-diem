/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');
goog.require('diem.Globals');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.Anchor');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.cloth.Edge');
goog.require('diem.cloth.PhysicalPiece');
goog.require('diem.storage.Anchor');
goog.require('diem.storage.Edge');
goog.require('diem.storage.Storage');
goog.require('diem.tools.DragPiece');
goog.require('diem.tools.FabricTool');
goog.require('diem.tools.MovePiece');
goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.ui.HsvaPalette');

/**
 * @constructor
 * @extends {diem.MeshWrapper}
 * @private
 */
diem.cloth.Workboard = function() {
  goog.base(this);

  this.shape_ = new THREE.Shape();
  this.anchors_ = [];
  this.fabric_ = null;

  // The physical piece currently being dragged.
  this.currentPiece_ = null;
};

goog.inherits(diem.cloth.Workboard, diem.MeshWrapper);

diem.cloth.Workboard.INDEX = 0;

/**
 * @param {number} w
 * @param {number} h
 * @returns {diem.cloth.Workboard}
 */
diem.cloth.Workboard.createNew = function(w, h) {
  var workboard = new diem.cloth.Workboard();
  var anchors = [
    diem.storage.Anchor.fromVector(new THREE.Vector3(0, 0, 0), "0"),
    diem.storage.Anchor.fromVector(new THREE.Vector3(w, 0, 0), "1"),
    diem.storage.Anchor.fromVector(new THREE.Vector3(w, h, 0), "2"),
    diem.storage.Anchor.fromVector(new THREE.Vector3(0, h, 0), "3")];
  var edges = diem.storage.Edge.fromAnchors(anchors);
  var material = {color : diem.Fabric.getRandomColor(), side : THREE.DoubleSide};
  workboard.initMeshes_({
    anchors : anchors,
    edges : edges,
    fabric : {material : material}
  });
  return workboard;
};

/**
 * @param {diem.storage.Piece} piece
 * @returns {diem.cloth.Workboard}
 */
diem.cloth.Workboard.load = function(piece) {
  var workboard = new diem.cloth.Workboard();
  workboard.initMeshes_(piece);
  workboard.description_.innerHTML = piece.description;
  return workboard;
};

/**
 * Initial square of cloth.
 * @param {diem.storage.Piece} piece
 * @private
 */
diem.cloth.Workboard.prototype.initMeshes_ = function(piece) {
  var corners = piece.anchors;
  for (var i = 0; i < corners.length; ++i) {
    var anchor = new diem.cloth.Anchor(corners[i]);
    this.anchors_.push(anchor);
  }

  var edges = piece.edges;
  this.shape_['edges_'] = [];
  for (i = 0; i < edges.length; ++i) {
    var startAnchor = this.getAnchor_(edges[i].startAnchor, corners);
    var endAnchor = this.getAnchor_(edges[i].endAnchor, corners);
    var edge = new diem.cloth.Edge(startAnchor, endAnchor);
    this.shape_.curves.push(edge.getBezierCurve());
    this.shape_['edges_'].push(edge);
  }
  diem.cloth.ControlPoint.updateActions(this.shape_);

  var geometry = new THREE.ShapeGeometry(this.shape_);

  this.fabric_ = diem.Fabric.load(piece.fabric);
  this.mesh_ = new THREE.Mesh(geometry, this.fabric_.getMaterial());
  if ('uuid' in piece) {
    this.mesh_.uuid = piece.uuid;
  }
  this.mesh_.shape = this.shape_;
  this.mesh_.name = 'workboard' + diem.cloth.Workboard.INDEX++;
  // A list of all physical representations of this pattern piece.
  this.mesh_.userData.physicalPieces = [];

  for (i = 0; i < this.anchors_.length; ++i) {
    this.anchors_[i].addToParent(this.mesh_);
    this.shape_['edges_'][i].addToParent(this.mesh_);
  }

  diem.storage.Storage.getCurrent().addPiece(this);
};

/**
 * Remove the 2D and 3D pieces from the pattern.
 */
diem.cloth.Workboard.prototype.delete = function() {
  var parent = this.mesh_.parent;
  var pieces = this.mesh_.userData.physicalPieces;
  for (var i = 0; i < pieces.length; ++i) {
    pieces[i].delete();
  }
  parent.remove(this.mesh_);
};

/**
 * Get the anchor point corresponding to the given storage anchor.
 * @param {string} uuid
 * @param {Array.<diem.storage.Anchor>} storageAnchors
 * @returns {diem.cloth.Anchor}
 * @private
 */
diem.cloth.Workboard.prototype.getAnchor_ = function(uuid, storageAnchors) {
  for (var i = 0; i < storageAnchors.length; ++i) {
    // Storage anchors are in the same order as cloth ones.
    if (uuid == storageAnchors[i].uuid) {
      return this.anchors_[i];
    }
  }
  goog.asserts.assert(false, uuid + " not found in " + storageAnchors);
  return null;
};

/**
 * @override
 */
diem.cloth.Workboard.prototype.getIntersectables = function() {
  var intersects = [
    diem.tools.FabricTool.createIntersectable(
      diem.events.CLICKABLE, this),
    diem.tools.DragPiece.createIntersectable(
      diem.events.DRAGGABLE, this),
    diem.tools.MovePiece.createIntersectable(
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
 * Starts the 2D cloth drag.
 */
diem.cloth.Workboard.prototype.moveStart = function() {
    this.prevMouse_ = diem.Globals.mouse.clone();
};

/**
 * Moves the 2D cloth rep.
 */
diem.cloth.Workboard.prototype.move = function() {
  this.mesh_.position.add(diem.Globals.mouse.clone().sub(this.prevMouse_));
  this.prevMouse_ = diem.Globals.mouse.clone();
};

/**
 * @param {diem.tools.Tool} tool
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.drag3dStart = function(tool) {
  var physicalPiece = new diem.cloth.PhysicalPiece(this.mesh_, this.w, this.h);
  physicalPiece.addToParent(this.mesh_.parent);
  physicalPiece.drag3dStart();
  this.currentPiece_ = physicalPiece;
  this.mesh_.userData.physicalPieces.push(physicalPiece);
  return physicalPiece.getIntersectables();
};

/**
 * Moves the fabric.
 * @param {diem.tools.Tool} tool
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.drag3d = function(tool) {
  // We have to delegate this for the initial drag to work, since there's
  // no piece to drag when the drag starts.
  return this.currentPiece_.drag3d();
};

/**
 * @param {diem.tools.Tool} tool
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.drag3dEnd = function(tool) {
  return this.currentPiece_.drag3dEnd();
};

/**
 * @param {goog.events.BrowserEvent} event
 * @returns {array}
 */
diem.cloth.Workboard.prototype.chooseFabric = function(event) {
  var palette = new goog.ui.HsvaPalette();
  var material = this.fabric_.getMaterial();
  goog.events.listen(
    palette, goog.ui.Component.EventType.ACTION,
    function(e) {
      material.color.setStyle(e.target.color);
      palette.dispose();
    }
  );
  palette.render();
  var x = event.clientX + window.scrollX;
  var y = event.clientY + window.scrollY;
  palette.getDomHelper().setProperties(
    palette.getElement(),
    {style: "position: absolute; left: " + x + "px; top: " + y + "px;"});
};
