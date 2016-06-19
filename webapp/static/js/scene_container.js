/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.cloth.Workboard');
goog.require('diem.Cloth');
goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Person');
goog.require('diem.Ruler');
goog.require('diem.Workboard');

// TODO: more dynamic.
var WIDTH = 800;
var HEIGHT = 600;

/**
 * @constructor
 */
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

  /** Pattern pieces */
  this.pieces_ = [];
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

  this.cloth = this.addCloth();
  this.workboard = new diem.Workboard();
};

diem.SceneContainer.CLOTH_OFFSET_X = 10;
diem.SceneContainer.CLOTH_OFFSET_Y = 8;

/**
 * Create a new piece of cloth, adds it to the array of pieces, and returns it.
 */
diem.SceneContainer.prototype.addCloth = function() {
  var cloth = new diem.cloth.Workboard();
  this.scene.add(cloth.getMesh());
  cloth.setPosition(
    diem.SceneContainer.CLOTH_OFFSET_X,
    diem.SceneContainer.CLOTH_OFFSET_Y * this.pieces_.length);
  this.pieces_.push(cloth);
  return cloth;
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
//  this.cloth.simulate(now, this.camera, this.person_.object, diem.Globals.mouse);

  requestAnimationFrame(render);
  this.renderer.render(this.scene, this.camera);
};
