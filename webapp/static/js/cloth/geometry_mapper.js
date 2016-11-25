/* global Ammo, THREE */
goog.provide('diem.cloth.GeometryMapper');

goog.require('goog.asserts');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

diem.cloth.GeometryMapper = function(threeGeometry, ammoGeometry) {
  goog.asserts.assert('position' in threeGeometry.attributes);
  this.ammo_ = ammoGeometry;
  this.quadTree_ = this.setupQuadTree_(threeGeometry);
};

/**
 * Set all of the new geometry's positions (and ammo positions) from the
 * previous geometry's.
 */
diem.cloth.GeometryMapper.prototype.flip = function(
  newThreeGeometry, newAmmoGeometry) {
  // Store the new geometry, since we want a "pristine" copy of the node
  // positions for the next flip and this will modify all of them to match the
  // previous geometry's positions.
  var quadTree = this.setupQuadTree_(newThreeGeometry);
  var newPositions = newThreeGeometry.attributes.position.array;
  var newNormals = newThreeGeometry.attributes.normal.array;

  var numVerts = newPositions.length / 3;
  for (var newAmmoIndex = 0; newAmmoIndex < numVerts; ++newAmmoIndex) {
    var oldAmmoIndex = this.getEquivalentOldIndex_(newAmmoIndex, newThreeGeometry);

    var oldNode = this.ammo_.get_m_nodes().at(oldAmmoIndex);
    var oldPos = oldNode.get_m_x();
    var oldNormal = oldNode.get_m_n();

    // Set Ammo positions.
    var newAmmoNode = newAmmoGeometry.get_m_nodes().at(newAmmoIndex);
    newAmmoNode.set_m_x(oldPos);
    if (oldPos.x() > 50 || oldPos.y() > 50) {
      console.log("Setting " + newAmmoIndex + " to " + oldPos.x() + "," + oldPos.y());
    }

    // Set THREE positions.
    var threeIndex = newAmmoIndex * 3;
    newPositions[threeIndex] = oldPos.x();
    newNormals[threeIndex] = oldNormal.x();
    newPositions[threeIndex + 1] = oldPos.y();
    newNormals[threeIndex + 1] = oldNormal.y();
    newPositions[threeIndex + 2] = oldPos.z();
    newNormals[threeIndex + 2] = oldNormal.z();
  }
  this.ammo_ = newAmmoGeometry;
  this.quadTree = quadTree;
};

diem.cloth.GeometryMapper.prototype.getEquivalentOldIndex_ = function(
  ammoIndex, newThreeGeometry) {
  var threeIndex = ammoIndex * 3;
  var x = newThreeGeometry.attributes.position.array[threeIndex];
  var y = newThreeGeometry.attributes.position.array[threeIndex + 1];
  return this.quadTree_.getValue(x, y) / 3;
};

diem.cloth.GeometryMapper.prototype.setupQuadTree_ = function(threeGeometry) {
  // Recreate quad tree each time so that there are no "dead" quadrants where
  // all the points have been removed.
  this.quadTree_ = new diem.cloth.QueryableQuadTree(-1000, -1000, 1000, 1000);
  var positions = threeGeometry.attributes.position.array;
  for (var i = 0; i < positions.length; i += 3) {
    var x = positions[i];
    var y = positions[i + 1];
    this.quadTree_.set(x, y, i);
  }
  console.log("Number of quad tree entries: " + positions.length / 3);
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
diem.cloth.QueryableQuadTree.prototype.findParent_ = function(x, y) {
  var previous = this.getRootNode();
  var current = previous;
  if (current.nodeType == goog.structs.QuadTree.NodeType.EMPTY
      || current.nodeType == goog.structs.QuadTree.NodeType.LEAF) {
    return previous;
  }
  while (current.nodeType == goog.structs.QuadTree.NodeType.POINTER) {
    previous = current;
    current = this.getQuadrantForPoint_(previous, x, y);
  }
  return previous;
};

diem.cloth.QueryableQuadTree.prototype.getValue = function(x, y) {
  var quadNode = this.findParent_(x, y);
  goog.asserts.assert(quadNode.nodeType != goog.structs.QuadTree.NodeType.EMPTY);
  if (quadNode.nodeType == goog.structs.QuadTree.NodeType.LEAF) {
    return quadNode.point.value;
  }
  goog.asserts.assert(quadNode.nodeType == goog.structs.QuadTree.NodeType.POINTER);
  var from = new THREE.Vector2(x, y);
  var closestPoints = new goog.structs.PriorityQueue();
  this.traverse_(quadNode, function(node) {
    if (node.nodeType == goog.structs.QuadTree.NodeType.LEAF) {
      // Store the distances squared, since we only care about relative values.
      var to = new THREE.Vector2(node.x, node.y);
      var distance = from.distanceToSquared(to);
      closestPoints.enqueue(distance, node.point.value);
    }
  });
  return closestPoints.dequeue();
};
