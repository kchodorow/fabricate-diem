/* global THREE, requestAnimationFrame */

goog.provide('diem.SceneContainer');

goog.require('diem.Cloth');
goog.require('diem.Globals');
goog.require('diem.Person');
goog.require('diem.Ruler');
goog.require('diem.Workboard');

goog.require('goog.events');
goog.require('goog.events.EventType');

// TODO: more dynamic.
var WIDTH = 800;
var HEIGHT = 600;
var WEBGL_DIV_ID = 'model-box';

diem.SceneContainer = function() {
  this.cloth_ = [];
  this.person_ = null;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 50);

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(WIDTH, HEIGHT);
  document.getElementById(WEBGL_DIV_ID).appendChild(this.renderer.domElement);

  this.camera.position.z = -20;
  this.camera.position.y = 10;
  this.camera.lookAt(new THREE.Vector3(0, 10, 0));

  this.initLights_();

  // Event handlers.
  this.mouse = new THREE.Vector3();
  this.mouse.z = 0;

  goog.events.listen(
    document.getElementById(WEBGL_DIV_ID),  goog.events.EventType.CLICK,
    this.onClick, false, this);
  goog.events.listen(
    document.getElementById(WEBGL_DIV_ID),  goog.events.EventType.MOUSEMOVE,
    this.onMouseMove, false, this);
  goog.events.listen(
    document.getElementById('add-piece'), goog.events.EventType.CLICK,
    this.addPiece, false, this);

  this.initModels_();
};

diem.SceneContainer.prototype.initLights_ = function() {
  var ambient = new THREE.AmbientLight(0x101030);
  this.scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0,0,-30);
  this.scene.add(directionalLight);
};

diem.SceneContainer.prototype.initModels_ = function() {
  this.person_ = new diem.Person();
  this.person_.load(this.scene);

  var ruler = new diem.Ruler();
  this.scene.add(ruler.load());

  this.workboard = new diem.Workboard();
};

diem.SceneContainer.prototype.onClick = function() {
  for (var i = 0; i < this.cloth_.length; ++i) {
    this.cloth_[i].handleClick(this.person_.object.children[0]);
  }
};

// TODO: move this to Cloth or Particle.
diem.SceneContainer.prototype.onMouseMove = function(event) {
  var vector = new THREE.Vector3();
  vector.set(
    (event.clientX / WIDTH) * 2 - 1,
    - (event.clientY / HEIGHT) * 2 + 1,
    0.5);

  vector.unproject(this.camera);
  var dir = vector.sub(this.camera.position).normalize();
  var distance = -this.camera.position.z / dir.z;
  this.mouse = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
  diem.Globals.raycaster.setFromCamera(this.mouse, this.camera);
};

diem.SceneContainer.prototype.addPiece = function() {
  var cloth = new diem.Cloth();
  var mesh = cloth.load();
  this.scene.add(mesh);
  this.cloth_.push(cloth);
};

diem.SceneContainer.prototype.render = function(now) {
  for (var i = 0; i < this.cloth_.length; ++i) {
    this.cloth_[i].simulate(now, this.camera, this.person_.object, this.mouse);
  }

  requestAnimationFrame(render);
  this.renderer.render(this.scene, this.camera);
};

var sceneContainer;

function render() {
  var now = Date.now();
  sceneContainer.render(now);
};

function init() {
  sceneContainer = new diem.SceneContainer();
  render();
}
