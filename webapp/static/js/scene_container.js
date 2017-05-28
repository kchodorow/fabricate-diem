/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Ground');
goog.require('diem.Person');
goog.require('diem.Physics');
goog.require('diem.cloth.PhysicalPiece');
goog.require('diem.storage.Storage');
goog.require('diem.tools.AddAnchorPoint');
goog.require('diem.tools.AddPiece');
goog.require('diem.tools.AnchorPoint');
goog.require('diem.tools.CameraTool');
goog.require('diem.tools.Delete');
goog.require('diem.tools.DragPiece');
goog.require('diem.tools.FabricTool');
goog.require('diem.tools.FoldTool');
goog.require('diem.tools.MovePiece');
goog.require('diem.tools.PersonTool');
goog.require('diem.tools.RemoveAnchorPoint');
goog.require('diem.tools.ToolManager');
goog.require('diem.tools.Toolbar');
goog.require('goog.events.KeyCodes');

/**
 * @constructor
 */
diem.SceneContainer = function() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 50);

  this.renderer = new THREE.WebGLRenderer({alpha : true});
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById(diem.Globals.WEBGL_DIV_ID).appendChild(
    this.renderer.domElement);

  diem.tools.CameraTool.setCameraPosition(this.camera);
  this.camera.lookAt(new THREE.Vector3(0, 10, 0));
  diem.storage.Storage.getCurrent().setCamera(this.camera);

  this.toolManager_ = new diem.tools.ToolManager();
  this.toolManager_.registerTool(new diem.tools.AddAnchorPoint());
  this.toolManager_.registerTool(new diem.tools.AddPiece(this.scene));
  this.toolManager_.registerTool(new diem.tools.AnchorPoint());
  this.toolManager_.registerTool(new diem.tools.Delete());
  this.toolManager_.registerTool(new diem.tools.DragPiece(this.camera));
  this.toolManager_.registerTool(new diem.tools.FabricTool());
  this.toolManager_.registerTool(new diem.tools.MovePiece());
  this.toolManager_.registerTool(new diem.tools.RemoveAnchorPoint());
  this.toolManager_.registerTool(new diem.tools.SeamTool());
  this.toolManager_.registerTool(new diem.tools.FoldTool());
  // TODO: it's silly to create 8 separate camera tools.
  this.toolManager_.registerTool(
    new diem.tools.CameraTool(this.camera, [goog.events.KeyCodes.LEFT]));
  this.toolManager_.registerTool(
    new diem.tools.CameraTool(this.camera, [goog.events.KeyCodes.RIGHT]));
  this.toolManager_.registerTool(
    new diem.tools.CameraTool(this.camera, [goog.events.KeyCodes.UP]));
  this.toolManager_.registerTool(
    new diem.tools.CameraTool(this.camera, [goog.events.KeyCodes.DOWN]));
  this.toolManager_.registerTool(
    new diem.tools.CameraTool(this.camera, [
      goog.events.KeyCodes.UP,
      goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT]));
  this.toolManager_.registerTool(
    new diem.tools.CameraTool(this.camera, [
      goog.events.KeyCodes.DOWN,
      goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT]));

  var ground = new diem.Ground();
  ground.addToParent(this.scene);
  this.initLights_();
  var person = new diem.Person(this.scene);
  this.toolManager_.registerTool(
    new diem.tools.PersonTool(person, [
      goog.events.KeyCodes.LEFT,
      goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT]));
  this.toolManager_.registerTool(
    new diem.tools.PersonTool(person, [
      goog.events.KeyCodes.RIGHT,
      goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT]));
  this.eventHandler_ = new diem.EventHandler(this.camera, this.toolManager_, person);

  diem.storage.Storage.get().request(goog.bind(this.load, this));

  var holder = this;
  window.addEventListener('resize', function() {
    holder.camera.aspect = window.innerWidth / window.innerHeight;
    holder.camera.updateProjectionMatrix();
    holder.renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
};

/**
 * @param {object} model
 */
diem.SceneContainer.prototype.load = function(model) {
  var tool = this.toolManager_.getTool(diem.tools.AddPiece.NAME);
  for (var i = 0; i < model.pieces.length; ++i) {
    var intersectables = tool.onSelect(tool, model.pieces[i]);
    this.toolManager_.handleIntersectables(intersectables);
  }
  if (model.camera != null) {
    diem.tools.CameraTool.setCameraPosition(
      this.camera, model.camera.x, model.camera.y, model.camera.z);
  }
};

/**
 * @private
 */
diem.SceneContainer.prototype.initLights_ = function() {
  var ambient = new THREE.AmbientLight(0xffffff);
  this.scene.add(ambient);
  // This is required for shadows.
  var directionalLight = new THREE.DirectionalLight(0xB8AE9C);
  var pos = this.camera.position;
  directionalLight.position.set(pos.x, pos.y, pos.z);
  this.scene.add(directionalLight);
};

/**
 * @returns {diem.tools.Toolbar}
 */
diem.SceneContainer.prototype.getToolbar = function() {
  return new diem.tools.Toolbar(this.toolManager_);
};


/**
 * @param {Date} now
 */
diem.SceneContainer.prototype.render = function(now) {
  if (diem.Globals.mouse == null) {
    // Before closure is loaded.
    diem.Globals.mouse = new THREE.Vector3();
  }
  var physicalPieces = diem.cloth.PhysicalPiece.getPieces();
  for (var i = 0; i < physicalPieces.length; ++i) {
    physicalPieces[i].simulate();
  }

  requestAnimationFrame(render);
  diem.Physics.get().update();
  if (this.scene == null) {
    return;
  }
  this.renderer.render(this.scene, this.camera);
  diem.storage.Storage.get().send();
};
