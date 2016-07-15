
/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.Cloth');
goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Pattern');
goog.require('diem.Person');
goog.require('diem.Ruler');
goog.require('diem.cloth.Workboard');
goog.require('diem.tools.AddAnchorPoint');
goog.require('diem.tools.AddPiece');
goog.require('diem.tools.AnchorPoint');
goog.require('diem.tools.RemoveAnchorPoint');

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

  this.eventHandler_ = new diem.EventHandler(this.camera);
  this.eventHandler_.registerTool(new diem.tools.AddAnchorPoint());
  this.eventHandler_.registerTool(new diem.tools.AddPiece(
    goog.bind(this.addPatternPiece, this)));
  this.eventHandler_.registerTool(new diem.tools.RemoveAnchorPoint());
  this.eventHandler_.registerTool(new diem.tools.AnchorPoint());

  /** Pattern pieces */
  this.pattern_ = new diem.Pattern();
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
  this.scene.add(piece.getObject());

  var edges = piece.getEdges();
  for (var i = 0; i < edges.length; ++i) {
    edges[i].addToEventHandler(this.eventHandler_);
  }

  var anchors = piece.getAnchors();
  for (i = 0; i < anchors.length; ++i) {
    anchors[i].addToEventHandler(this.eventHandler_);
  }
};

diem.SceneContainer.prototype.render = function(now) {
  if (diem.Globals.mouse == null) {
    // Before closure is loaded.
    diem.Globals.mouse = new THREE.Vector3();
  }

  requestAnimationFrame(render);
  this.renderer.render(this.scene, this.camera);
};
