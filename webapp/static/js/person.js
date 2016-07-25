/* global THREE */

goog.provide('diem.Person');

goog.require('diem.MeshWrapper');
goog.require('diem.events.Clickable');

/**
 * @constructor
 */
diem.Person = function(scene, register) {
  goog.base(this);

  diem.events.Clickable.register(this);

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
      diem.events.Clickable.ID, this)];
};

diem.Person.PINS = 0;

diem.Person.prototype.onClick = function(intersection) {
  var geometry = new THREE.BoxGeometry(.5, .5, 0);
  var material = new THREE.MeshBasicMaterial({color : 0x000000});
  var pinMesh = new THREE.Mesh(geometry, material);
  var point = intersection.point;
  pinMesh.position.set(point.x, point.y, point.z + 1);
  this.mesh_.parent.add(pinMesh);
  pinMesh.name = "pin" + diem.Person.PINS++;
  return [];
};
