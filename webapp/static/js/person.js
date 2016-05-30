/* global THREE */

goog.provide('diem.Person');

diem.Person = function() {
};

diem.Person.prototype.load = function(scene, cloth) {
  var loader = new THREE.ObjectLoader();
  loader.load(
    'assets/standard-female-figure.json',
    function(object) {
      scene.add(object);
      cloth.setPerson(object);
    }
  );
};
