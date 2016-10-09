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
  this.pieces = [];
};

diem.storage.Model.prototype.addPiece = function(piece) {
  this.pieces.push(piece);
};

/**
 * @return {string} the hashed digest.
 */
diem.storage.Model.prototype.getHash = function() {
  var hash = new goog.crypt.Md5();
  for (var i = 0; i < this.pieces.length; ++i) {
    hash.update(this.pieces[i].getHash());
  }
  return "" + hash.digest();
};

/**
 * @constructor
 */
diem.storage.Piece = function() {
  this.id = null;
  this.anchors = [];
  this.edges = [];
};

diem.storage.Piece.prototype.setId = function(id) {
  this.id = id;
};

/**
 * @param {diem.storage.Anchor}
 */
diem.storage.Piece.prototype.addAnchor = function(anchor) {
  this.anchors.push(anchor);
};

/**
 * @param {diem.storage.Edge}
 */
diem.storage.Piece.prototype.addEdge = function(edge) {
  this.edges.push(edge);
};

/**
 * @return {string} the hashed digest.
 */
diem.storage.Piece.prototype.getHash = function() {
  var hash = new goog.crypt.Md5();
  hash.update(this.id);
  for (var i = 0; i < this.anchors.length; ++i) {
    hash.update(this.anchors[i].getHash());
  }
  for (i = 0; i < this.edges.length; ++i) {
    hash.update(this.edges[i].getHash());
  }
  return "" + hash.digest();
};

/**
 * @constructor
 */
diem.storage.Anchor = function() {
  /** @type {string} */
  this.id = null;
  /** @type {x:number,y:number} */
  this.anchor = null;
  /** @type {x:number,y:number} */
  this.cwCp = null;
  /** @type {x:number,y:number} */
  this.ccwCp = null;
};

/**
 * @return {string} the hashed digest.
 */
diem.storage.Anchor.prototype.getHash = function() {
  var hash = new goog.crypt.Md5();
  hash.update(this.id);
  hash.update(this.anchor.x);
  hash.update(this.anchor.y);
  hash.update(this.cwCp.x);
  hash.update(this.cwCp.y);
  hash.update(this.ccwCp.x);
  hash.update(this.ccwCp.y);
  return "" + hash.digest();
};

/**
 * @constructor
 */
diem.storage.Edge = function() {
  /** @type {string} */
  this.startAnchor = null;
  /** @type {string} */
  this.endAnchor = null;
};

/**
 * @return {string} the hashed digest.
 */
diem.storage.Edge.prototype.getHash = function() {
  var hash = new goog.crypt.Md5();
  hash.update(this.startAnchor);
  hash.update(this.endAnchor);
  return "" + hash.digest();
};
