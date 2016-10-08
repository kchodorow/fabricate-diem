goog.provide('diem.storage.Pattern');

goog.require('goog.net.XhrIo');

/**
 * @constructor
 */
diem.storage.Pattern = function() {
};

/**
 * Send a KV-pair struct to the server in the 'data' parameter.
 * @param {Object} obj
 */
diem.storage.Pattern.prototype.send = function(obj) {
  var request = new goog.net.XhrIo();
  request.send(
    window.location.pathname, 'POST', "data=" + JSON.stringify(obj));
};
