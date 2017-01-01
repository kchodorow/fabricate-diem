/* global THREE */
goog.provide('diem.tools.Delete');

goog.require('diem.Button');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.Delete = function() {
  goog.base(this);
  this.name_ = diem.tools.Delete.NAME;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('X')
    .setTooltip('Delete (X)')
    .build();
};

goog.inherits(diem.tools.Delete, diem.tools.Tool);

diem.tools.Delete.NAME = 'DELETE';

/**
 * @override
 */
diem.tools.Delete.prototype.getKeys = function() {
  return [goog.events.KeyCodes.X];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.Delete.createIntersectable = function(action, meshWrapper) {
  goog.asserts.assert('delete' in meshWrapper);
  return diem.tools.Tool.createIntersectable(
    diem.tools.Delete.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.Delete.prototype.onClick = function(intersections) {
  goog.asserts.assert(intersections.length > 0);
  var meshWrapper = this.getMeshWrapper(intersections[0].object);
  meshWrapper.delete();
  return [];
};
