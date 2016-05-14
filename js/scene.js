/* global THREE, requestAnimationFrame */

goog.require('diem.Cloth');
goog.require('diem.Globals');
goog.require('diem.Person');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = -20;
camera.position.y = 10;
camera.lookAt(new THREE.Vector3(0, 10, 0));

var ambient = new THREE.AmbientLight(0x101030);
scene.add(ambient);
var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0,0,-30);
scene.add(directionalLight);

var mouse = new THREE.Vector3();
mouse.z = 0;

var onMouseMove = function(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  diem.Globals.raycaster.setFromCamera(mouse, camera);
};

function render() {
  var now = Date.now();
  for (var i = 0; i < diem.Globals.renderList.length; ++i) {
    diem.Globals.renderList[i].simulate(now);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function init() {
  var cloth = new diem.Cloth(camera);
  var mesh = cloth.load();
  scene.add(mesh);
  diem.Globals.renderList.push(cloth);

  var person = new diem.Person();
  person.load(scene, cloth);

  render();
}

window.addEventListener('mousemove', onMouseMove, false);
