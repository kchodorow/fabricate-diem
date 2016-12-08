/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Person');
goog.require('diem.Physics');
goog.require('diem.cloth.PhysicalPiece');
goog.require('diem.storage.Storage');
goog.require('diem.tools.AddAnchorPoint');
goog.require('diem.tools.AddPiece');
goog.require('diem.tools.AnchorPoint');
goog.require('diem.tools.CameraTool');
goog.require('diem.tools.DragPiece');
goog.require('diem.tools.MovePiece');
goog.require('diem.tools.PersonTool');
goog.require('diem.tools.RemoveAnchorPoint');
goog.require('diem.tools.SeamTool');
goog.require('diem.tools.ToolManager');
goog.require('goog.events.KeyCodes');

/**
 * @constructor
 */
diem.SceneContainer = function() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 50);

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setClearColor(0xffffff);
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById(diem.Globals.WEBGL_DIV_ID).appendChild(
    this.renderer.domElement);

  this.camera.position.z = 20;
  this.camera.position.y = 10;
  this.camera.lookAt(new THREE.Vector3(0, 10, 0));

  this.toolManager_ = new diem.tools.ToolManager();
  this.toolManager_.registerTool(new diem.tools.AddAnchorPoint());
  this.toolManager_.registerTool(new diem.tools.AddPiece(this.scene));
  this.toolManager_.registerTool(new diem.tools.AnchorPoint());
  this.toolManager_.registerTool(new diem.tools.DragPiece());
  this.toolManager_.registerTool(new diem.tools.MovePiece());
  this.toolManager_.registerTool(new diem.tools.RemoveAnchorPoint());
  this.toolManager_.registerTool(new diem.tools.SeamTool());
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

  this.drawAxes_();
  this.initLights_();
  var person = new diem.Person(
    this.scene,
    goog.bind(this.toolManager_.handleIntersectables, this.toolManager_));
  this.toolManager_.registerTool(
    new diem.tools.PersonTool(person, [
      goog.events.KeyCodes.LEFT,
      goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT]));
  this.toolManager_.registerTool(
    new diem.tools.PersonTool(person, [
      goog.events.KeyCodes.RIGHT,
      goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT]));
  this.eventHandler_ = new diem.EventHandler(this.camera, this.toolManager_);

  diem.storage.Storage.get().request(goog.bind(this.load, this));

  var holder = this;
  window.addEventListener('resize', function() {
    holder.camera.aspect = window.innerWidth / window.innerHeight;
    holder.camera.updateProjectionMatrix();
    holder.renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
};

/**
 * @param {Array<diem.cloth.Workboard>} model
 */
diem.SceneContainer.prototype.load = function(model) {
  var tool = this.toolManager_.getTool(diem.tools.AddPiece.NAME);
  for (var i = 0; i < model.pieces.length; ++i) {
    var intersectables = tool.onSelect(tool, model.pieces[i]);
    this.toolManager_.handleIntersectables(intersectables);
  }
};

/**
 * @private
 */
diem.SceneContainer.prototype.drawAxes_ = function() {
  var color = 0xACCFCC;
  var material = new THREE.LineBasicMaterial({color : color});
  var x = new THREE.Line();
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(
    new THREE.Vector3(-.15, -.15, 0),
    new THREE.Vector3(.15, .15, 0)
  );
  var geometry2 = new THREE.Geometry();
  geometry2.vertices.push(
    new THREE.Vector3(-.15, .15, 0),
    new THREE.Vector3(.15, -.15, 0)
  );

  var lineMaterial = new THREE.LineBasicMaterial({color: color, linewidth: 2});
  var line1 = new THREE.Line(geometry1, lineMaterial);
  var line2 = new THREE.Line(geometry2, lineMaterial);
  var og = new THREE.CircleGeometry(.2, 8);
  var odd = false;
  for (var i = -20; i < 20; i++) {
    odd = !odd;
    for (var j = -20; j < 20; j++) {
      var dot = Math.abs(j) % 2 == (odd ? 1 : 0);
      if (dot) {
        this.scene.add(new THREE.Mesh(
          og.clone().translate(2 * i, 2 * j, -.1),
          material));
      } else {
        this.scene.add(new THREE.Line(
          geometry1.clone().translate(2 * i, 2 * j, -.1),
          lineMaterial));
        this.scene.add(new THREE.Line(
          geometry2.clone().translate(2 * i, 2 * j, -.1),
          lineMaterial));
      }
    }
  }
};

/**
 * @private
 */
diem.SceneContainer.prototype.initLights_ = function() {
  var ambient = new THREE.AmbientLight(0x101030);
  this.scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0,0,30);
  this.scene.add(directionalLight);
};

/**
 * @param {Date} now
 */
diem.SceneContainer.prototype.render = function(now) {
  if (diem.Globals.mouse == null) {
    // Before closure is loaded.
    diem.Globals.mouse = new THREE.Vector3();
  }

  requestAnimationFrame(render);
  diem.Physics.get().update();
  this.renderer.render(this.scene, this.camera);
  var tool = this.toolManager_.getTool();
  var physicalPieces = diem.cloth.PhysicalPiece.getPieces();
  for (var i = 0; i < physicalPieces.length; ++i) {
    physicalPieces[i].simulate();
  }
  diem.storage.Storage.get().send();
};
