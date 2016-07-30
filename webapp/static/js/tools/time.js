goog.provide('diem.tools.TimeTool');

goog.require('diem.tools.Tool');

/**
 * Model things happening over time.
 */
diem.tools.TimeTool = function() {
  goog.base(this);
  this.name_ = diem.tools.TimeTool.NAME;
  this.simulations_ = [];
};

goog.inherits(diem.tools.TimeTool, diem.tools.Tool);

diem.tools.TimeTool.NAME = 'TIME';

diem.tools.TimeTool.prototype.getSimulations = function() {
  return this.simulations_;
};

diem.tools.TimeTool.createIntersectable = function(meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.TimeTool.NAME, null, meshWrapper);
};
