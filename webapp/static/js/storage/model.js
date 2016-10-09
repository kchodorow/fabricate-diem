goog.provide('diem.storage.Model');
goog.provide('diem.storage.Piece');
goog.provide('diem.storage.Anchor');
goog.provide('diem.storage.Edge');

goog.require('goog.crypt.Md5');

/**
 * Data representation of the pattern.
 * @constructor
 */
diem.storage.Model = function() {
  this.pieces_ = [];
};

diem.storage.Model.prototype.addPiece = function(piece) {
  this.pieces_.push(piece);
};

diem.storage.Model.prototype.getStorable = function() {
  var storable = {pieces : []};
  for (var i = 0; i < this.pieces_.length; ++i) {
    storable.pieces.push(this.pieces_[i].getStorable());
  }
  return JSON.stringify(storable);
};

/**
 * @param {string} json output of Model.getStorable.
 * @return {string} the hashed digest.
 */
diem.storage.Model.getHash = function(json) {
  var hash = new goog.crypt.Md5();
  hash.update(json);
  return "" + hash.digest();
};

/**
 * @constructor
 */
diem.storage.Piece = function() {
  this.id_ = null;
  this.anchors_ = [];
  this.edges_ = [];
};

diem.storage.Piece.prototype.setId = function(id) {
  this.id_ = id;
};

/**
 * @param {diem.cloth.Anchor} anchors
 */
diem.storage.Piece.prototype.setAnchors = function(anchors) {
  this.anchors_ = anchors;
};

/**
 * @param {diem.cloth.Edge} edges
 */
diem.storage.Piece.prototype.setEdges = function(edges) {
  this.edges_ = edges;
};

diem.storage.Piece.prototype.getStorable = function() {
  var anchors = [];
  for (var i = 0; i < this.anchors_.length; ++i) {
    anchors.push(diem.storage.Anchor.getStorable(this.anchors_[i]));
  }
  var edges = [];
  for (i = 0; i < this.edges_.length; ++i) {
    edges.push(diem.storage.Edge.getStorable(this.edges_[i]));
  }

  return {
    id: this.id_,
    anchors: anchors,
    edges: edges
  };
};

/**
 * Returns an achor point in storable format.
 * @returns {diem.storage.Anchor}
 */
diem.storage.Anchor.getStorable = function(inAnchor) {
  var anchor = {};
  anchor.id = inAnchor.getId();
  anchor.anchor = inAnchor.getObject().position;
  anchor.cwCp = inAnchor.cwCp_.getObject().position;
  anchor.ccwCp = inAnchor.ccwCp_.getObject().position;
  return anchor;
};

/**
 * @param {diem.cloth.Edge} edge
 */
diem.storage.Edge.getStorable = function(inEdge) {
  var edge = {};
  edge.startAnchor = inEdge.startAnchor_.getId();
  edge.endAnchor = inEdge.endAnchor_.getId();
  return edge;
};
