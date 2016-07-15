goog.provide('diem.tools.AnchorPoint');

goog.require('diem.cloth.Anchor');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * Moves anchor points around.
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.AnchorPoint = function() {
  goog.base(this);
};

goog.inherits(diem.tools.AnchorPoint, diem.tools.Tool);

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.onSelect = function() {
  diem.cloth.Anchor.onClick = diem.tools.Tool.NO_OP;
};

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.getName = function() {
  return 'ANCHOR_PT';
};

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.getKeys = function() {
  return [goog.events.KeyCodes.A];
};
