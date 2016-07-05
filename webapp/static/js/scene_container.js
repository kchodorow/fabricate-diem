
/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.Cloth');
goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Pattern');
goog.require('diem.Person');
goog.require('diem.Ruler');

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
  this.renderer.setClearColor( 0xf0f0f0 );
  this.renderer.setSize(WIDTH, HEIGHT);
  document.getElementById(diem.Globals.WEBGL_DIV_ID).appendChild(
    this.renderer.domElement);

  this.camera.position.z = 20;
  this.camera.position.y = 10;
  this.camera.lookAt(new THREE.Vector3(0, 10, 0));

  var eventHandler = new diem.EventHandler(this.camera);
  eventHandler.registerShortcut(
    diem.Pattern.ADD_PIECE, goog.bind(this.addPatternPiece, this),
    goog.events.KeyCodes.C);
  eventHandler.registerShortcut(
    diem.Pattern.PATH_TOOL, goog.bind(this.pathTool, this),
    goog.events.KeyCodes.A);
  this.eventHandler_ = eventHandler;

  /** Pattern pieces */
  this.pattern_ = new diem.Pattern(eventHandler);
  this.initLights_();
  this.initModels_();
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
};

diem.SceneContainer.prototype.addPatternPiece = function() {
  var piece = this.pattern_.addPiece();
  this.scene.add(piece);
  var anchors = this.pattern_.getAnchors();
  for (var i = 0; i < anchors.length; ++i) {
    this.eventHandler_.registerDraggable(anchors[i]);
  }
};

diem.SceneContainer.prototype.pathTool = function() {
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

  requestAnimationFrame(render);
  this.renderer.render(this.scene, this.camera);
};
