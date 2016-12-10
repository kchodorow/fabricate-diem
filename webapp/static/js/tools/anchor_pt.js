goog.provide('diem.tools.AnchorPoint');

goog.require('diem.Button');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * Moves anchor points around.
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.AnchorPoint = function() {
  goog.base(this);
  this.button_ = new diem.Button.builder()
    .setInnerHtml('A')
    .setTooltip('Change anchor points [A]')
    .build();
};

goog.inherits(diem.tools.AnchorPoint, diem.tools.Tool);

diem.tools.AnchorPoint.NAME = 'ANCHOR_PT';

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.getName = function() {
  return diem.tools.AnchorPoint.NAME;
};

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.getKeys = function() {
  return [goog.events.KeyCodes.A];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.AnchorPoint.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.AnchorPoint.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.onDragStart = function(meshWrapper) {
  if ('moveStart' in meshWrapper) {
    meshWrapper.moveStart();
  }
  return [];
};

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.onDrag = function(meshWrapper) {
  meshWrapper.move();
  return [];
};

/**
 * @override
 */
diem.tools.AnchorPoint.prototype.onDragEnd = function(meshWrapper) {
  if ('moveEnd' in meshWrapper) {
    meshWrapper.moveEnd();
  }
  return [];
};
