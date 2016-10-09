goog.provide('diem.storage.Anchor');
goog.provide('diem.storage.Edge');
goog.provide('diem.storage.Model');
goog.provide('diem.storage.Piece');

goog.require('goog.asserts');
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
  this.uuid_ = null;
  this.anchors_ = [];
  this.edges_ = [];
};

diem.storage.Piece.prototype.setUuid = function(uuid) {
  this.uuid_ = uuid;
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
    uuid: this.uuid_,
    anchors: anchors,
    edges: edges
  };
};

/**
 * @constructor
 */
diem.storage.Anchor = function() {
  this.uuid = null;
  this.anchor = null;
  this.cwCp = null;
  this.ccwCp = null;
};

/**
 * Returns an achor point in storable format.
 * @returns {diem.storage.Anchor}
 */
diem.storage.Anchor.getStorable = function(inAnchor) {
  var anchor = new diem.storage.Anchor();
  anchor.uuid = inAnchor.getUuid();
  anchor.anchor = inAnchor.getObject().position;
  anchor.cwCp = inAnchor.cwCp_.getObject().position;
  anchor.ccwCp = inAnchor.ccwCp_.getObject().position;
  return anchor;
};

/**
 * Returns an achor point in storable format.
 * @returns {diem.storage.Anchor}
 */
diem.storage.Anchor.fromVector = function(vec, uuid) {
  var anchor = {};
  anchor.uuid = uuid;
  anchor.anchor = vec;
  anchor.cwCp = vec.clone();
  anchor.ccwCp = vec.clone();
  return anchor;
};

diem.storage.Edge = function() {
  this.startAnchor = null;
  this.endAnchor = null;
};

/**
 * @param {diem.cloth.Edge} edge
 */
diem.storage.Edge.getStorable = function(inEdge) {
  var edge = new diem.storage.Edge();
  edge.startAnchor = inEdge.startAnchor_.getUuid();
  edge.endAnchor = inEdge.endAnchor_.getUuid();
  return edge;
};

/**
 * Creates edges from an array of anchors. The anchors must be in edge-order
 * (i.e., not skip around the shape).
 * @param {array<diem.storage.Anchor>} anchors
 * @returns {array<diem.storage.Edge>}
 */
diem.storage.Edge.fromAnchors = function(anchors) {
  goog.asserts.assert(anchors.length > 1);

  var edges = [];
  for (var i = 1; i < anchors.length; ++i) {
    var edge = new diem.storage.Edge();
    edge.startAnchor = anchors[i - 1].uuid;
    edge.endAnchor = anchors[i].uuid;
    edges.push(edge);
  }
  edge = new diem.storage.Edge();
  edge.startAnchor = anchors[anchors.length - 1].uuid;
  edge.endAnchor = anchors[0].uuid;
  edges.push(edge);
  return edges;
};
