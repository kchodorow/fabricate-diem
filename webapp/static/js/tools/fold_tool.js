goog.provide('diem.tools.FoldTool');

goog.require('diem.Button');
goog.require('diem.tools.Tool');
goog.require('goog.asserts');
goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.FoldTool = function() {
  goog.base(this);
  this.name_ = diem.tools.FoldTool.NAME;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('2')
    .setTooltip('Add fold [2]')
    .build();
};

goog.inherits(diem.tools.FoldTool, diem.tools.Tool);

diem.tools.FoldTool.NAME = 'FOLD';

/**
 * @override
 */
diem.tools.FoldTool.prototype.getKeys = function() {
  return [goog.events.KeyCodes.TWO];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.FoldTool.createIntersectable = function(action, meshWrapper) {
  goog.asserts.assert('fold' in meshWrapper);
  return diem.tools.Tool.createIntersectable(
    diem.tools.FoldTool.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.FoldTool.prototype.onClick = function(intersections) {
  var meshWrapper = this.getMeshWrapper(intersections[0].object);
  return meshWrapper.fold();
};
