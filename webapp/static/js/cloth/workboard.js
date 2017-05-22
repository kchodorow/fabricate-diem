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
goog.require('diem.tools.Delete');
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
  this.palette_ = null;

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
  // The z-offsets need to be slightly more than the workboard's z (0), so the
  // anchors and edges aren't hidden.
  var anchors = [
    diem.storage.Anchor.fromVector(new THREE.Vector3(0, 0, .001)),
    diem.storage.Anchor.fromVector(new THREE.Vector3(w, 0, .001)),
    diem.storage.Anchor.fromVector(new THREE.Vector3(w, h, .001)),
    diem.storage.Anchor.fromVector(new THREE.Vector3(0, h, .001))];
  var edges = diem.storage.Edge.fromAnchors(anchors);
  var material = {
    color: diem.Fabric.getRandomColor(),
    side: THREE.DoubleSide
  };
  workboard.initMeshes_({
    anchors : anchors,
    edges : edges,
    physicalPieces : [],
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

  for (i = 0; i < piece.physicalPieces.length; ++i) {
    var physicalPiece = new diem.cloth.PhysicalPiece.load(
      this.mesh_, piece.physicalPieces[i]);
    this.mesh_.userData.physicalPieces.push(physicalPiece);
  }

  diem.storage.Storage.getCurrent().addPiece(this);
};

/**
 * @override
 */
diem.cloth.Workboard.prototype.addToParent = function(parent) {
  parent.add(this.mesh_);
  for (let i = 0; i < this.anchors_.length; ++i) {
    this.anchors_[i].addToParent(this.mesh_);
    this.shape_['edges_'][i].addToParent(this.mesh_);
  }
  var pieces = this.mesh_.userData.physicalPieces;
  for (let i = 0; i < pieces.length; ++i) {
    var piece = pieces[i];
    piece.addToParent(parent);
    for (var j = 0; j < piece.pins().length; ++j) {
      piece.pinned_[j].addToParent(parent);
    }
  }
  this.mesh_.position.set(0, 13.5 - (diem.cloth.Workboard.INDEX * 3.4), 0);
};

/**
 * Remove the 2D and 3D pieces from the pattern.
 */
diem.cloth.Workboard.prototype.delete = function() {
  var parent = this.mesh_.parent;
  var pieces = this.mesh_.userData.physicalPieces;
  // This removes pieces from the array, so we can't use the standard for-loop.
  while (pieces.length > 0) {
    pieces[0].delete();
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
    diem.tools.Delete.createIntersectable(
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
  var pp = this.mesh_.userData.physicalPieces;
  for (i = 0; i < pp.length; ++i) {
    intersects = intersects.concat(pp[i].getIntersectables());
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
 * @param {THREE.Vector3} intersection
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.drag3dStart = function(intersection) {
  if (this.currentPiece_) {
    this.currentPiece_.deselect();
  }
  var physicalPiece = new diem.cloth.PhysicalPiece(this.mesh_, this.getFold_());
  physicalPiece.addToParent(this.mesh_.parent);
  var pinIntersectables = physicalPiece.dragFromWorkboard(intersection);
  this.currentPiece_ = physicalPiece;
  this.mesh_.userData.physicalPieces.push(physicalPiece);
  return pinIntersectables.concat(physicalPiece.getIntersectables());
};

/**
 * @returns {diem.cloth.Edge} the edge on the fold, or null if there is no fold.
 */
diem.cloth.Workboard.prototype.getFold_ = function() {
  var edges = this.shape_['edges_'];
  for (let i = 0; i < edges.length; ++i) {
    if (edges[i].isFold()) {
      return edges[i];
    }
  }
  return null;
};

/**
 * Moves the fabric.
 * @param {THREE.Vector3} personIntersection
 * @param {THREE.Camera} camera
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.drag3d = function(personIntersection, camera) {
  // We have to delegate this for the initial drag to work, since there's
  // no piece to drag when the drag starts.
  return this.currentPiece_.drag3d(personIntersection, camera);
};

/**
 * @param {diem.tools.Tool} tool
 * @returns {Array}
 */
diem.cloth.Workboard.prototype.drag3dEnd = function(tool) {
  return this.currentPiece_.drag3dEnd();
};

/**
 * Called on select.
 */
diem.cloth.Workboard.prototype.select = function() {
};

/**
 * Called when something else is selected.
 */
diem.cloth.Workboard.prototype.deselect = function() {
  this.currentPiece_.deselect();
};

/**
 * @param {goog.events.BrowserEvent} event
 * @returns {array}
 */
diem.cloth.Workboard.prototype.chooseFabric = function(event) {
  if (this.palette_ != null) {
    this.palette_.dispose();
    this.palette_ = null;
  }
  var workboard = this;
  var palette = new goog.ui.HsvaPalette();
  this.palette_ = palette;
  var material = this.fabric_.getMaterial();
  goog.events.listen(
    palette, goog.ui.Component.EventType.ACTION,
    function(e) {
      material.color.setStyle(e.target.color);
      palette.dispose();
      workboard.palette_ = null;
    }
  );
  palette.render();
  var x = event.clientX + window.scrollX;
  var y = event.clientY + window.scrollY;
  palette.getDomHelper().setProperties(
    palette.getElement(),
    {style: "position: absolute; left: " + x + "px; top: " + y + "px;"});
};
