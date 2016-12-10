/* global THREE */
goog.provide('diem.Scene');

goog.require('diem.Button');
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
 * @export
 */
function init() {
  sceneContainer = new diem.SceneContainer();
  diem.Scene.addButtons(sceneContainer);
  render();
}

diem.Scene.addButtons = function(sceneContainer) {
  var toolbar = sceneContainer.getToolbar();
  var buttons = toolbar.createButtons();
  for (var i = 0; i < buttons.length; ++i) {
    document.body.appendChild(buttons[i]);
  }
  // Add other, non-tool-related buttons.
  var button = new diem.Button.builder()
        .setInnerHtml('PDF')
        .setTooltip('Export to PDF')
        .build();
  document.body.appendChild(button);
};
