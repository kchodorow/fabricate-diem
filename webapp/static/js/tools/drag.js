goog.provide('diem.tools.Drag');

goog.require('diem.tools.Tool');

/**
 * @constructor
 */
diem.tools.Drag = function(pattern) {
  goog.base(this);

};

goog.inherits(diem.tools.Drag, diem.tools.Tool);

diem.tools.Drag.prototype.onDragStart = function() {
  // Make a _physical_ copy of the mesh.

};

diem.tools.Drag.prototype.onDrag = function(mouseVec3) {
};
