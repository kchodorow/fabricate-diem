goog.provide('diem.tools.SeamTool');

goog.require('diem.Button');
goog.require('diem.tools.Tool');
goog.require('goog.asserts');
goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.SeamTool = function() {
  goog.base(this);
  this.name_ = diem.tools.SeamTool.NAME;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('S')
    .setTooltip('Add seam [S]')
    .build();
};

goog.inherits(diem.tools.SeamTool, diem.tools.Tool);

diem.tools.SeamTool.NAME = 'SEAM';

/**
 * @override
 */
diem.tools.SeamTool.prototype.getKeys = function() {
  return [goog.events.KeyCodes.S];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.SeamTool.createIntersectable = function(action, meshWrapper) {
  goog.asserts.assert('selectForSeaming' in meshWrapper);
  return diem.tools.Tool.createIntersectable(
    diem.tools.SeamTool.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.SeamTool.prototype.onClick = function(intersections) {
  var meshWrapper = this.getMeshWrapper(intersections[0].object);
  return meshWrapper.selectForSeaming();
};
