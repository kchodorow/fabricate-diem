/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.Cloth');
goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Person');
goog.require('diem.Ruler');
goog.require('diem.Workboard');

// TODO: more dynamic.
var WIDTH = 800;
var HEIGHT = 600;

diem.SceneContainer = function() {
  this.person_ = null;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 50);

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(WIDTH, HEIGHT);
  document.getElementById(diem.Globals.WEBGL_DIV_ID).appendChild(
    this.renderer.domElement);

  this.camera.position.z = 20;
  this.camera.position.y = 10;
  this.camera.lookAt(new THREE.Vector3(0, 10, 0));

  this.initLights_();
  this.initModels_();

  // Must go afer initModels_, so cloth is defined.
  new diem.EventHandler(this);
};

diem.SceneContainer.prototype.initLights_ = function() {
  var ambient = new THREE.AmbientLight(0x101030);
  this.scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0,0,30);
  this.scene.add(directionalLight);
};

diem.SceneContainer.prototype.initModels_ = function() {
  this.person_ = new diem.Person();
  this.person_.load(this.scene);

  var ruler = new diem.Ruler();
  this.scene.add(ruler.load());

  this.cloth = new diem.Cloth();
  this.cloth.addToScene(this.scene);

  this.workboard = new diem.Workboard();
};

diem.SceneContainer.prototype.onClick = function() {
  this.cloth.handleClick(this.person_.object.children[0], this.scene);
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
  diem.Globals.mouse = this.camera.position.clone().add(dir.multiplyScalar(distance));
  diem.Globals.raycaster.setFromCamera(diem.Globals.mouse, this.camera);
};

diem.SceneContainer.prototype.render = function(now) {
  if (diem.Globals.mouse == null) {
    // Before closure is loaded.
    diem.Globals.mouse = new THREE.Vector3();
  }
  this.cloth.simulate(now, this.camera, this.person_.object, this.mouse);

  requestAnimationFrame(render);
  this.renderer.render(this.scene, this.camera);
};
