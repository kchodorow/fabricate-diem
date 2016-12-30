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
  this.title_ = "";
  this.pieces_ = [];
  this.camera_ = null;
};

/**
 * @param {diem.cloth.Workboard} piece
 */
diem.storage.Model.prototype.addPiece = function(piece) {
  this.pieces_.push(piece);
};

/**
 * @param {THREE.Camera} camera
 */
diem.storage.Model.prototype.setCamera = function(camera) {
  this.camera_ = camera.position;
};

/**
 * @return {string}
 * @private
 */
diem.storage.Model.prototype.getTitle_ = function() {
  return document.getElementById("pattern-name").innerHTML;
};

/**
 * @returns {string} JSON representation of the pattern.
 */
diem.storage.Model.prototype.getStorable = function() {
  var storable = {
    // TODO: this shouldn't be stored in the model, since we want to be able to
    // parse/modify it on the server side.
    title : this.getTitle_(),
    pieces : [],
    camera : this.camera_
  };
  for (var i = 0; i < this.pieces_.length; ++i) {
    storable.pieces.push(diem.storage.Piece.getStorable(this.pieces_[i]));
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
  this.uuid = null;
  this.position = null;
  this.anchors = [];
  this.edges = [];
  this.description = null;
  this.fabric = null;
};

/**
 * @param {diem.cloth.Workboard} workboard
 * @returns {diem.storage.Piece}
 */
diem.storage.Piece.getStorable = function(workboard) {
  var piece = new diem.storage.Piece();
  piece.uuid = workboard.getUuid();
  piece.position = workboard.getObject().position.clone();
  piece.description = workboard.getDescription();
  for (var i = 0; i < workboard.anchors_.length; ++i) {
    piece.anchors.push(diem.storage.Anchor.getStorable(workboard.anchors_[i]));
  }
  var edges = [];
  for (i = 0; i < workboard.shape_['edges_'].length; ++i) {
    piece.edges.push(
      diem.storage.Edge.getStorable(workboard.shape_['edges_'][i]));
  }
  var material = workboard.fabric_.getMaterial();
  piece.fabric = {material : {
    color : material.color.getHex(),
    side : material.side}};
  return piece;
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
 * @param {diem.cloth.Anchor} inAnchor
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
 * @param {THREE.Vector3} vec
 * @param {string} uuid
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

/**
 * @constructor
 */
diem.storage.Edge = function() {
  this.startAnchor = null;
  this.endAnchor = null;
};

/**
 * @param {diem.cloth.Edge} inEdge
 * @returns {diem.storage.Edge}
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
