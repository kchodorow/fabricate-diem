/* global THREE */
goog.provide('diem.cloth.QueryableQuadTree');

goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

/**
 * Adds querying capabilities to Closure's quad tree.
 * @param {number} minX
 * @param {number} minY
 * @param {number} maxX
 * @param {number} maxY
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
 * @private
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

/**
 * @param {goog.structs.QuadTree.Node} quadNode
 * @returns {array<goog.structs.QuadTree.Point>}
 */
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

/**
 * @param {number} num the number of nearest nodes to fetch
 * @param {THREE.Vector2} vector the coordinates to search for
 * @returns {array<goog.structs.QuadTree.Point>} if an exact match was found,
 *   just that point, otherwise num nearest points.
 */
diem.cloth.QueryableQuadTree.prototype.getNearest = function(num, vector) {
  if (this.contains(vector.x, vector.y)) {
    return [new goog.structs.QuadTree.Point(
      vector.x, vector.y, this.get(vector.x, vector.y))];
  }
  var value = null;
  var queue = new goog.structs.PriorityQueue();
  var current = this.findNearest_(vector.x, vector.y);
  while (queue.getCount() < num) {
    current = current.parent;
    this.traverse_(current, function(node) {
      if (node.point) {
        queue.enqueue(
          vector.distanceToSquared(
            new THREE.Vector2(node.point.x, node.point.y)),
          node.point);
      }
    });
  }

  var result = [];
  for (var i = 0; i < num; ++i) {
    result.push(queue.dequeue());
  }
  return result;
};

/**
 * @returns {string}
 */
diem.cloth.QueryableQuadTree.prototype.toJSON = function() {
  var arr = new Array(this.getCount());
  this.forEach(function(idx, coord) {
    arr[idx] = idx + ": (" + coord.x + "," + coord.y + ")";
  });
  return arr.join(" ");
};
