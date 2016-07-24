goog.provide('diem.tools.AddAnchorPoint');

goog.require('diem.cloth.Edge');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.AddAnchorPoint = function() {
  goog.base(this);
};

goog.inherits(diem.tools.AddAnchorPoint, diem.tools.Tool);

diem.tools.AddAnchorPoint.NAME = 'ADD_ANCHOR_PT';

/**
 * @override
 */
diem.tools.AddAnchorPoint.prototype.getName = function() {
  return diem.tools.AddAnchorPoint.NAME;
};

/**
 * @override
 */
diem.tools.AddAnchorPoint.prototype.getKeys = function() {
  return [
    goog.events.KeyCodes.EQUALS,
    goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT];
};

diem.tools.AddAnchorPoint.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.AddAnchorPoint.NAME, action, meshWrapper);
};
