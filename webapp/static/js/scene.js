/* global THREE */
goog.require('diem.SceneContainer');

var sceneContainer;

/**
 * Render the scene. Called at least 60x/sec (hopefully).
 */
function render() {
  var now = Date.now();
  sceneContainer.render(now);
}

/**
 * Initializes the scene container after Closure is loaded.
 */
function init() {
  sceneContainer = new diem.SceneContainer();
  render();
}
