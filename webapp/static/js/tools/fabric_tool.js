goog.provide('diem.tools.FabricTool');

goog.require('diem.Button');
goog.require('diem.tools.Tool');
goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.FabricTool = function() {
  goog.base(this);
  this.name_ = diem.tools.FabricTool.NAME;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('F')
    .setTooltip('Select fabric (F)')
    .build();
};

goog.inherits(diem.tools.FabricTool, diem.tools.Tool);

diem.tools.FabricTool.NAME = 'FABRIC';

/**
 * @override
 */
diem.tools.FabricTool.prototype.getKeys = function() {
  return [goog.events.KeyCodes.F];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.FabricTool.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.FabricTool.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.FabricTool.prototype.onClick = function(intersects, event) {
  var meshWrapper = this.getMeshWrapper(intersects[0].object);
  meshWrapper.chooseFabric(event);
  return [];
};
