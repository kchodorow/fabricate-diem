goog.provide('diem.tools.SeamTool');

goog.require('diem.Seam');
goog.require('diem.tools.Tool');
goog.require('diem.Seam');

goog.require('goog.events.KeyCodes');

/**
 * Moves anchor points around.
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.SeamTool = function() {
  goog.base(this);
};

goog.inherits(diem.tools.SeamTool, diem.tools.Tool);

diem.tools.SeamTool.NAME = 'SEAM';
diem.tools.SeamTool.seams_ = [];

/**
 * @override
 */
diem.tools.SeamTool.prototype.getName = function() {
  return diem.tools.SeamTool.NAME;
};

diem.tools.SeamTool.prototype.onSelect = function() {
  return diem.tools.SeamTool.seams_.push(new diem.Seam());
};

/**
 * @override
 */
diem.tools.SeamTool.prototype.getKeys = function() {
  return [goog.events.KeyCodes.S];
};

diem.tools.SeamTool.getCurrent = function() {
  return diem.tools.SeamTool.seams_[diem.tools.SeamTool.seams_.length - 1];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.SeamTool.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.SeamTool.NAME, action, meshWrapper);
};
