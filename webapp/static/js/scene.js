/* global THREE, location */
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

/**
 * Add toolbar buttons.
 * @param {diem.SceneContainer} sceneContainer
 */
diem.Scene.addButtons = function(sceneContainer) {
  var div = document.createElement('div');
  div.setAttribute('style', 'position: absolute; left: 30px; top: 150px;');
  var toolbar = sceneContainer.getToolbar();
  var buttons = toolbar.createButtons();
  for (var i = 0; i < buttons.length; ++i) {
    div.appendChild(buttons[i]);
  }
  // Add other, non-tool-related buttons.
  var button = new diem.Button.builder()
        .setInnerHtml('PDF')
        .setTooltip('Export to PDF')
        .build();
  button.onclick = diem.Scene.toPDF;
  div.appendChild(button);
  document.getElementById('model-box').appendChild(div);
};

/**
 * Redirect to the PDF version of this page.
 */
diem.Scene.toPDF = function() {
  location.href = location.pathname + '?format=pdf';
};
