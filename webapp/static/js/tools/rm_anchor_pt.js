goog.provide('diem.tools.RemoveAnchorPoint');

goog.require('diem.cloth.Anchor');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.RemoveAnchorPoint = function() {
  goog.base(this);
};

goog.inherits(diem.tools.RemoveAnchorPoint, diem.tools.Tool);

/**
 * @override
 */
diem.tools.RemoveAnchorPoint.prototype.onSelect = function() {
  diem.cloth.Anchor.onClick = diem.cloth.Anchor.removeAnchorPoint;
};

/**
 * @override
 */
diem.tools.RemoveAnchorPoint.prototype.onDeselect = function() {
  diem.cloth.Anchor.onClick = diem.tools.Tool.NO_OP;
};

/**
 * @override
 */
diem.tools.RemoveAnchorPoint.prototype.getName = function() {
  return 'RM_ANCHOR_PT';
};

/**
 * @override
 */
diem.tools.RemoveAnchorPoint.prototype.getKeys = function() {
  return [goog.events.KeyCodes.DASH];
};
