goog.provide('diem.tools.RemoveAnchorPoint');

goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.RemoveAnchorPoint = function() {
  goog.base(this);
  this.name_ = diem.tools.RemoveAnchorPoint.NAME;
};

goog.inherits(diem.tools.RemoveAnchorPoint, diem.tools.Tool);

diem.tools.RemoveAnchorPoint.NAME = 'RM_ANCHOR_PT';

/**
 * @override
 */
diem.tools.RemoveAnchorPoint.prototype.getKeys = function() {
  return [goog.events.KeyCodes.DASH];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.RemoveAnchorPoint.createIntersectable = function(
  action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.RemoveAnchorPoint.NAME, action, meshWrapper);
};
