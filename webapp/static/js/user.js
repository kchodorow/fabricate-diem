goog.provide('diem.User.delete');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.net.XhrIo');

/**
 * @param {string} project
 * @export
 */
diem.User.delete = function(project) {
  var request = new goog.net.XhrIo();
  // TODO: handle errors.
  goog.events.listen(request, goog.net.EventType.COMPLETE, function(e) {
    var row = goog.dom.getElement(project);
    goog.dom.removeNode(row);
  });
  request.send(window.location.pathname, 'POST', 'delete=' + project);
};
