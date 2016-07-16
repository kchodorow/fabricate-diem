goog.provide('diem.events.Clickable');

diem.events.Clickable.ID = "clickable";

/**
 * @param {diem.MeshWrapper}
 */
diem.events.Clickable.register = function(object) {
  goog.asserts.assert(object instanceof diem.MeshWrapper);
  object.mixins_[diem.events.Clickable.ID] = true;
};

diem.events.Clickable.isClickable = function(object) {
  goog.asserts.assert(object instanceof diem.MeshWrapper);
  return object.mixins_[diem.events.Clickable.ID];
};
