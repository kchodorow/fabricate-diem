/* global THREE */

goog.provide('diem.cloth.Anchor');

goog.require('diem.Fabric');
goog.require('diem.Globals');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.events');
goog.require('diem.events.EventBuilder');
goog.require('diem.storage.Anchor');
goog.require('diem.tools.AnchorPoint');
goog.require('diem.tools.RemoveAnchorPoint');

/**
 * @constructor
 * @param {THREE.Vector3} corner the position of this anchor point in world
 *     coordinates. It will be adjusted to relative coordinates when addToParent
 *     is called.
 */
diem.cloth.Anchor = function(corner) {
  goog.base(this);

  var color = diem.Fabric.getRandomColor();
  var geometry = new THREE.BoxGeometry(
    diem.cloth.Anchor.ANCHOR_SIZE,
    diem.cloth.Anchor.ANCHOR_SIZE,
    0);
  var material = new THREE.MeshBasicMaterial({color : color});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.copy(corner);
  this.mesh_.name = 'anchor' + diem.cloth.Anchor.INDEX++;

  this.cwCp_ = new diem.cloth.ControlPoint(this.mesh_);
  this.ccwCp_ = new diem.cloth.ControlPoint(this.mesh_);
};

goog.inherits(diem.cloth.Anchor, diem.MeshWrapper);

diem.cloth.Anchor.ANCHOR_SIZE = .30;
diem.cloth.Anchor.INDEX = 0;

/**
 * @override
 */
diem.cloth.Anchor.prototype.getIntersectables = function() {
  return [
    diem.tools.RemoveAnchorPoint.createIntersectable(
      diem.events.CLICKABLE, this),
    diem.tools.AnchorPoint.createIntersectable(
      diem.events.DRAGGABLE, this)]
    .concat(this.cwCp_.getIntersectables())
    .concat(this.ccwCp_.getIntersectables());
};

/**
 * @override
 */
diem.cloth.Anchor.prototype.addToParent = function(parent) {
  // The anchor points/cps should be adjusted relative to the parent,
  // but the lines use the anchor points'/cps' position, so they don't
  // need to be readjusted.
  diem.Globals.worldToParent(this.cwCp_.getObject(), parent);
  diem.Globals.worldToParent(this.ccwCp_.getObject(), parent);

  var meshes = this.cwCp_.getMeshes().concat(this.ccwCp_.getMeshes());
  for (var i = 0; i < meshes.length; ++i) {
    parent.add(meshes[i]);
  }

  diem.Globals.worldToParent(this.mesh_, parent);
  parent.add(this.mesh_);
};

/**
 * @override
 */
diem.cloth.Anchor.prototype.addToEventHandler = function(handler) {
  handler.register(this);
  handler.register(this.cwCp_);
  handler.register(this.ccwCp_);
};

/**
 * Returns the mesh for the anchor point.
 * @returns {THREE.Mesh}
 */
diem.cloth.Anchor.prototype.getObject = function() {
  return this.mesh_;
};

/**
 * Returns the "next" diem.cloth.ControlPoint.
 * @returns {diem.cloth.ControlPoint}
 */
diem.cloth.Anchor.prototype.getClockwiseCp = function() {
  return this.cwCp_;
};

/**
 * Returns the "previous" diem.cloth.ControlPoint.
 * @returns {diem.cloth.ControlPoint}
 */
diem.cloth.Anchor.prototype.getCounterClockwiseCp = function() {
  return this.ccwCp_;
};

/**
 * Removes an anchor point.
 * @returns {Array}
 */
diem.cloth.Anchor.prototype.onClick = function() {
  // Find curve.
  var edges = this.mesh_.parent.shape['edges_'];
  for (var i = 0; i < edges.length; ++i) {
    if (edges[i].endAnchor_ != this) {
      continue;
    }
    // 3
    var firstCurve = edges[i];
    // 0
    var idxToRemove = (i + 1) % edges.length;
    var secondCurve = edges[idxToRemove];
    // Create a new curve from the first curve's start point to the second
    // curve's end point.
    firstCurve.replaceEndAnchor(secondCurve.getEndAnchor());
    edges.splice(idxToRemove, 1);
    diem.cloth.ControlPoint.updateWorkboardGeometry(this.mesh_.parent);

    // Dirty parent before removing its children.
    this.mesh_.parent.remove(this.cwCp_.getObject());
    this.mesh_.parent.remove(this.cwCp_.getLine());
    this.mesh_.parent.remove(this.ccwCp_.getObject());
    this.mesh_.parent.remove(this.ccwCp_.getLine());
    this.mesh_.parent.remove(secondCurve.getObject());
    this.mesh_.parent.remove(this.mesh_);

    return [];
  }
};

/**
 * Determines if the drag should mirror the control points or move the anchor
 * point.
 * @returns {Array}
 */
diem.cloth.Anchor.prototype.onDragStart = function() {
  this.dragAllCp_ = this.controlPointsAtOrigin_();
  return [];
};

/**
 * Actually performs the drag.
 * TODO: prevent edges from crossing.
 */
diem.cloth.Anchor.prototype.onDrag = function() {
  if (this.dragAllCp_) {
    // When the anchor points and control points are in the same position,
    // dragging moves both control points.
    this.cwCp_.onDragImpl();
    this.ccwCp_.onDragImpl(-1);
  } else {
    this.mesh_.position.copy(diem.Globals.mouse).sub(this.mesh_.parent.position);
    this.cwCp_.updateLine();
    this.ccwCp_.updateLine();
    diem.cloth.ControlPoint.updateWorkboardGeometry(this.mesh_.parent);
  }
};

/**
 * Resets the control points' drag behavior, depending on the drag result.
 * @returns {diem.events.Event}
 */
diem.cloth.Anchor.prototype.onDragEnd = function() {
  var freeCps = !this.controlPointsAtOrigin_();
  this.cwCp_.setIndependentlyDraggable(freeCps);
  this.ccwCp_.setIndependentlyDraggable(freeCps);
  var event = new diem.events.EventBuilder();
  if (freeCps) {
    event.addEvent(this.cwCp_.onDragEnd());
    event.addEvent(this.ccwCp_.onDragEnd());
  } else {
    event.addAction({
      type: diem.events.MOVE_ANCHOR,
      id: this.getObject().geometry.id,
      moveTo: this.getObject().position
    });
  }
  return event.build();
};

/**
 * @private
 * @returns {boolean}
 */
diem.cloth.Anchor.prototype.controlPointsAtOrigin_ = function() {
  return this.mesh_.position.equals(this.cwCp_.getObject().position)
    && this.mesh_.position.equals(this.ccwCp_.getObject().position);
};

/**
 * Returns an achor point in storable format.
 * @returns {diem.storage.Anchor}
 */
diem.cloth.Anchor.prototype.getStorable = function() {
  var storageAnchor = new diem.storage.Anchor();
  storageAnchor.id = this.getId();
  storageAnchor.anchor = this.getObject().position;
  storageAnchor.cwCp = this.cwCp_.getObject().position;
  storageAnchor.ccwCp = this.ccwCp_.getObject().position;
  return storageAnchor;
};
