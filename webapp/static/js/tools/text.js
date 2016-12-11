goog.provide('diem.tools.Text');

goog.require('diem.Button');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.Text = function() {
  goog.base(this);
  this.name_ = diem.tools.Text.NAME;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('T')
    .setTooltip('Text [T]')
    .build();
};

goog.inherits(diem.tools.Text, diem.tools.Tool);

diem.tools.Text.NAME = 'TEXT';

/**
 * @override
 */
diem.tools.Text.prototype.getKeys = function() {
  return [goog.events.KeyCodes.T];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.Text.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.Text.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.Text.prototype.onClick = function(intersects) {
  var meshWrapper = this.getMeshWrapper(intersects[0].object);
  return meshWrapper.editText(intersects[0]);
};
