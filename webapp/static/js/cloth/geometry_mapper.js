/* global Ammo, THREE */
goog.provide('diem.cloth.GeometryMapper');

goog.require('goog.asserts');
goog.require('goog.structs.QuadTree');

diem.cloth.GeometryMapper = function(softBody) {
  this.softBody_ = softBody;
  this.quadTree_ = this.setupQuadTree_(softBody);
};

/**
 * Set all of the new geometry's positions (and ammo positions) from the
 * previous geometry's.
 */
diem.cloth.GeometryMapper.prototype.flip = function(softBody) {
  // Store the new geometry, since we want a "pristine" copy of the node
  // positions for the next flip and this will modify all of them to match the
  // previous geometry's positions.
  var quadTree = this.setupQuadTree_(softBody);
  var newNodes = softBody.get_m_nodes();
  var oldNodes = this.softBody_.get_m_nodes();
  for (var newIndex = 0; newIndex < newNodes.size(); ++newIndex) {
    // TODO: make this a field function.
    var newNode = newNodes.at(newIndex);
    var oldNode = this.getEquivalentOldNode_(newNode, newIndex);
//    var oldNode = this.softBody_.get_m_nodes().at(oldIndex);
    var oldPos = oldNode.get_m_x();
    var oldNormal = oldNode.get_m_n();
    var newPos = new Ammo.btVector3(oldPos.x(), oldPos.y(), oldPos.z());
    var newNormal = new Ammo.btVector3(oldNormal.x(), oldNormal.y(), oldNormal.z());
    newNode.set_m_x(newPos);
    newNode.set_m_n(newNormal);
  }
  this.softBody_ = softBody;
  this.quadTree = quadTree;
};

diem.cloth.GeometryMapper.prototype.getEquivalentOldNode_ = function(newNode, idx) {
  var newPos = newNode.get_m_x();
  var node = this.quadTree_.getValue(newPos.x(), newPos.y());
  var oldPos = node.get_m_x();
  console.log(idx + ": " + newPos.x() + "," + newPos.y() + " -> " + oldPos.x() + "," + oldPos.y());
  return node;
};

diem.cloth.GeometryMapper.prototype.setupQuadTree_ = function(softBody) {
  // Recreate quad tree each time so that there are no "dead" quadrants where
  // all the points have been removed.
  this.quadTree_ = new diem.cloth.QueryableQuadTree(-1000, -1000, 1000, 1000);
  var nodes = softBody.get_m_nodes();
  for (var i = 0; i < nodes.size(); ++i) {
    var node = nodes.at(i);
    var pos = node.get_m_x();
    this.quadTree_.set(pos.x(), pos.y(), node);
  }
};

/**
 * Adds querying capabilities to Closure's quad tree.
 * @constructor
 */
diem.cloth.QueryableQuadTree = function(minX, minY, maxX, maxY) {
  goog.base(this, minX, minY, maxX, maxY);
};

goog.inherits(diem.cloth.QueryableQuadTree, goog.structs.QuadTree);

/**
 * @param {number} x
 * @param {number} y
 * @return {goog.structs.QuadTree.Node}
 */
diem.cloth.QueryableQuadTree.prototype.findNearest_ = function(x, y) {
  var current = this.getRootNode();
  if (current.nodeType == goog.structs.QuadTree.NodeType.EMPTY
      || current.nodeType == goog.structs.QuadTree.NodeType.LEAF) {
    return current;
  }
  while (current.nodeType == goog.structs.QuadTree.NodeType.POINTER) {
    current = this.getQuadrantForPoint_(current, x, y);
  }
  return current;
};

diem.cloth.QueryableQuadTree.prototype.getPointsInQuadrant = function(quadNode) {
  if (quadNode.nodeType == goog.structs.QuadTree.NodeType.EMPTY) {
    return [];
  }

  var arr = [];
  this.traverse_(quadNode, function(node) {
    arr.push(node);
  });
  return arr;
};

diem.cloth.QueryableQuadTree.prototype.getValue = function(x, y) {
  var current = this.get(x, y);
  if (current != null) {
    return current;
  }
  current = this.findNearest_(x, y);
  return current.point.value;
};
