goog.provide('diem.events.Draggable');

goog.require('goog.asserts');

diem.events.Draggable.ID = "draggable";

/**
 * @param {diem.MeshWrapper} object wrapper to apply draggability to
 */
diem.events.Draggable.register = function(object) {
  goog.asserts.assert(object instanceof diem.MeshWrapper);
  object.mixins_[diem.events.Draggable.ID] = true;
};

/**
 * @returns {boolean}
 */
diem.events.Draggable.isDraggable = function(object) {
  goog.asserts.assert(object instanceof diem.MeshWrapper);
  return object.mixins_[diem.events.Draggable.ID];
};
