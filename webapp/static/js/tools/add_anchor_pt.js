goog.provide('diem.tools.AddAnchorPoint');

goog.require('diem.tools.Tool');
goog.require('diem.cloth.Edge');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 */
diem.tools.AddAnchorPoint = function() {
  goog.base(this);
};

goog.inherits(diem.tools.AddAnchorPoint, diem.tools.Tool);

/**
 * @override
 */
diem.tools.AddAnchorPoint.prototype.onSelect = function() {
  diem.cloth.Edge.onClick = diem.cloth.Edge.addAnchorPoint;
};

/**
 * @override
 */
diem.tools.AddAnchorPoint.prototype.onDeselect = function() {
  diem.cloth.Anchor.onClick = diem.tools.Tool.NO_OP;
};

/**
 * @override
 */
diem.tools.AddAnchorPoint.prototype.getName = function() {
  return 'ADD_ANCHOR_PT';
};

/**
 * @override
 */
diem.tools.AddAnchorPoint.prototype.getKeys = function() {
  return [
    goog.events.KeyCodes.EQUALS,
    goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT];
};
