/* global Ammo, THREE */
goog.provide('diem.cloth.GeometryMapper');

goog.require('diem.cloth.QueryableQuadTree');
goog.require('goog.asserts');

/**
 * @param {Ammo.btSoftBody} softBody
 * @constructor
 */
diem.cloth.GeometryMapper = function(softBody) {
  this.softBody_ = softBody;
  this.numNodes_ = softBody.get_m_nodes().size();
  this.oldPositions_ = new Array(this.numNodes_);
  this.oldNormals_ = new Array(this.numNodes_);
  for (var i = 0; i < this.oldPositions_.length; ++i) {
    this.oldPositions_[i] = new THREE.Vector3();
    this.oldNormals_[i] = new THREE.Vector3();
  }
  this.quadTree_ = this.setupQuadTree_(softBody);
};

diem.cloth.GeometryMapper.prototype.storePositions = function() {
  var nodes = this.softBody_.get_m_nodes();
  for (var i = 0; i < this.oldPositions_.length; ++i) {
    var node = nodes.at(i);
    var pos = node.get_m_x();
    this.oldPositions_[i].set(pos.x(), pos.y(), pos.z());
    var normal = node.get_m_n();
    this.oldNormals_[i].set(normal.x(), normal.y(), normal.z());
  }
};

/**
 * Set all of the new geometry's positions (and ammo positions) from the
 * previous geometry's. We have four geometries in question here:
 *
 * Input:
 * - Old 2D: the previous 2D geometric representation on the workboard.
 * - Old 3D: the previous 3D geometric representation on the model.
 * - New 2D: the current 2D workboard geometry.
 * Output:
 * - New 3D: the Ammo geometry derived from mapping the old 2d geometry to the
 *   new 2D workboard geometry and getting the 3d points from that mapping.
 *
 * We want to map each new 2D point to an equivalent combination of old 2D
 * points. E.g., if point 123 is nearest points 45, 6, and 473 in the old 2D
 * rep, then find the "average" 3D point in the old soft body and make that the
 * coordinates of point 123's physical representation.
 */
diem.cloth.GeometryMapper.prototype.flipPositions = function() {
  // Store the new geometry, since we want a "pristine" copy of the node
  // positions for the next flip and this will modify all of them to match the
  // previous geometry's positions.
  var quadTree = this.setupQuadTree_();
  var new2DNodes = this.softBody_.get_m_nodes();
  for (var i = 0; i < new2DNodes.size(); ++i) {
    var new2DNode = new2DNodes.at(i);
    var old3DNode = this.getEquivalentNode_(new2DNode, i);

    var new3DPos = new2DNode.get_m_x();
    new3DPos.setX(old3DNode.position.x);
    new3DPos.setY(old3DNode.position.y);
    new3DPos.setZ(old3DNode.position.z);

    var new3DNormal = new2DNode.get_m_n();
    new3DNormal.setX(old3DNode.normal.x);
    new3DNormal.setY(old3DNode.normal.y);
    new3DNormal.setY(old3DNode.normal.z);
  }

  this.quadTree_ = quadTree;
};

/**
 * @param {Ammo.btSoftBody.Node} oldNode the previous node.
 * @returns {number} the index of the point nearest the given (old) node.
 */
diem.cloth.GeometryMapper.prototype.getEquivalentIndex = function(oldNode) {
  var ammoPos = oldNode.get_m_x();
  var oldPos = new THREE.Vector2(ammoPos.x(), ammoPos.y());
  var nearestPoints = this.quadTree_.getNearest(1, oldPos);
  goog.asserts.assert(nearestPoints.length == 1);
  return nearestPoints[0].value;
};

/**
 * Given a position, create an equivalent node from the three nearest points.
 * @param {Ammo.btSoftBody.Node} newNode
 * @returns {object}
 * @private
 */
diem.cloth.GeometryMapper.prototype.getEquivalentNode_ = function(newNode, idx) {
  var ammoPos = newNode.get_m_x();
  var newPos = new THREE.Vector2(ammoPos.x(), ammoPos.y());
  var nearestPoints = this.quadTree_.getNearest(3, newPos);
  if (nearestPoints.length == 1) {
    var newIdx = nearestPoints[0].value;
    return {
      position : this.oldPositions_[newIdx],
      normal : this.oldNormals_[newIdx]
    };
  }

  goog.asserts.assert(nearestPoints.length == 3);
  var totalDistance = 0;
  var invDistances = [];
  // Sum up the distance between newPos and each nearest point.
  for (var i = 0; i < nearestPoints.length; ++i) {
    var nearestPoint = nearestPoints[i];
    var nearest = new THREE.Vector2(nearestPoint.x, nearestPoint.y);
    var invDistance = 1 / nearest.distanceTo(newPos);
    invDistances.push(invDistance);
    totalDistance += invDistance;
  }

  // Find a weight for each nearest point.
  var weights = [];
  for (i = 0; i < invDistances.length; ++i) {
    weights.push(invDistances[i] / totalDistance);
  }

  // Move over to the 3D piece. Combine the positions on the soft body with the
  // weights calculated above.
  var retPos = new THREE.Vector3(0, 0, 0);
  var retNormal = new THREE.Vector3(0, 0, 0);
  for (i = 0; i < nearestPoints.length; ++i) {
    var index = nearestPoints[i].value;
    var weight = weights[i];

    var pos = this.oldPositions_[index];
    retPos.x += pos.x * weight;
    retPos.y += pos.y * weight;
    retPos.z += pos.z * weight;

    // Combine the normals.
    var normal = this.oldNormals_[index];
    retNormal.x += normal.x * weight;
    retNormal.y += normal.y * weight;
    retNormal.z += normal.z * weight;
  }

  // Return the final position.
  return {position : retPos, normal : retNormal};
};

/**
 * @returns {diem.cloth.QueryableQuadTree}
 * @private
 */
diem.cloth.GeometryMapper.prototype.setupQuadTree_ = function() {
  // Recreate quad tree each time so that there are no "dead" quadrants where
  // all the points have been removed.
  var quadTree = new diem.cloth.QueryableQuadTree(-100, -100, 100, 100);
  var nodes = this.softBody_.get_m_nodes();
  for (var i = 0; i < nodes.size(); ++i) {
    var node = nodes.at(i);
    var pos = node.get_m_x();
    quadTree.set(pos.x(), pos.y(), i);
  }
  return quadTree;
};
