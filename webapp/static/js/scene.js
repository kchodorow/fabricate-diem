/* global THREE */
goog.require('diem.SceneContainer');

var sceneContainer;

function render() {
  var now = Date.now();
  sceneContainer.render(now);
};

function init() {
  sceneContainer = new diem.SceneContainer();
  render();
}
