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
  this.quadTree_ = this.setupQuadTree_(softBody);
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
 * @param {Ammo.btSoftBody} softBody
 */
diem.cloth.GeometryMapper.prototype.flip = function(softBody) {
  // Store the new geometry, since we want a "pristine" copy of the node
  // positions for the next flip and this will modify all of them to match the
  // previous geometry's positions.
  var quadTree = this.setupQuadTree_(softBody);
  var newNodes = softBody.get_m_nodes();
  var oldNodes = this.softBody_.get_m_nodes();
  for (var newIndex = 0; newIndex < newNodes.size(); ++newIndex) {
    var newNode = newNodes.at(newIndex);
    var oldNode = this.getEquivalentNode_(newNode);
    newNode.set_m_x(oldNode.position);
    newNode.set_m_n(oldNode.normal);
  }

  this.softBody_ = softBody;
  this.quadTree_ = quadTree;
};

/**
 * Given a position, create an equivalent node from the three nearest points.
 * @param {Ammo.btSoftBody.Node} newNode
 * @returns {object}
 * @private
 */
diem.cloth.GeometryMapper.prototype.getEquivalentNode_ = function(newNode) {
  // TODO: is the Ammo shape actually in the right place for this to work?
  var ammoPos = newNode.get_m_x();
  var newPos = new THREE.Vector2(ammoPos.x(), ammoPos.y());
  var nearestPoints = this.quadTree_.getNearest(3, newPos);
  if (nearestPoints.length == 1) {
    var sbNode = this.softBody_.get_m_nodes().at(nearestPoints[0]);
    return {position : sbNode.get_m_x(), normal : sbNode.get_m_n()};
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
  var retPos = new Ammo.btVector3(0, 0, 0);
  var retNormal = new Ammo.btVector3(0, 0, 0);
  for (i = 0; i < nearestPoints.length; ++i) {
    var index = nearestPoints[i].value;
    sbNode = this.softBody_.get_m_nodes().at(index);
    var weight = weights[i];

    var pos = sbNode.get_m_x();
    retPos.setX(retPos.x() + pos.x() * weight);
    retPos.setY(retPos.y() + pos.y() * weight);
    retPos.setZ(retPos.z() + pos.z() * weight);

    // Combine the normals.
    var normal = sbNode.get_m_n();
    retNormal.setX(retNormal.x() + normal.x() * weight);
    retNormal.setY(retNormal.y() + normal.y() * weight);
    retNormal.setZ(retNormal.z() + normal.z() * weight);
  }

  // Return the final position.
  return {position : retPos, normal : retNormal};
};

/**
 * @param {Ammo.btSoftBody} softBody
 * @returns {diem.cloth.QueryableQuadTree}
 * @private
 */
diem.cloth.GeometryMapper.prototype.setupQuadTree_ = function(softBody) {
  // Recreate quad tree each time so that there are no "dead" quadrants where
  // all the points have been removed.
  var quadTree = new diem.cloth.QueryableQuadTree(-100, -100, 100, 100);
  var nodes = softBody.get_m_nodes();
  for (var i = 0; i < nodes.size(); ++i) {
    var node = nodes.at(i);
    var pos = node.get_m_x();
    quadTree.set(pos.x(), pos.y(), i);
  }
  return quadTree;
};
