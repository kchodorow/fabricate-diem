/* global THREE */

goog.provide('diem.Person');

diem.Person = function() {
};

diem.Person.prototype.load = function(scene) {
  var loader = new THREE.ObjectLoader();
  var tmp = this;
  loader.load(
    'assets/standard-female-figure.json',
    function(object) {
      tmp.object = object;
      scene.add(object);
    }
  );
};
