/* global THREE */

goog.provide('diem.Person');

goog.require('diem.MeshWrapper');
goog.require('diem.Pin');
goog.require('diem.events');

/**
 * @constructor
 */
diem.Person = function(scene, register) {
  goog.base(this);

  var loader = new THREE.ObjectLoader();
  var tmp = this;
  loader.load(
    'assets/standard-female-figure.json',
    function(object) {
      var person = object.children[0];
      tmp.mesh_ = person;
      tmp.addToParent(scene);
      register(tmp.getIntersectables());
      tmp.mesh_.rotateZ(Math.PI);
    }
  );
};

goog.inherits(diem.Person, diem.MeshWrapper);

diem.Person.prototype.getIntersectables = function() {
  return [diem.tools.DragPiece.createIntersectable(
      diem.events.CLICKABLE, this)];
};

diem.Person.prototype.onClick = function(intersection) {
  var pin = new diem.Pin(intersection.point);
  pin.addToParent(this.mesh_.parent);
  return [];
};
