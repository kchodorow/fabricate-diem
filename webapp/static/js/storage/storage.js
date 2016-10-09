goog.provide('diem.storage.Storage');

goog.require('diem.storage.Model');

goog.require('goog.asserts');
goog.require('goog.net.XhrIo');

/**
 * @constructor
 * @private
 */
diem.storage.Storage = function() {
  this.model_ = new diem.storage.Model();
  this.lastSend_ = Date.now();
  this.lastHash_ = diem.storage.Model.getHash(this.model_.getStorable());
};

diem.storage.Storage.INSTANCE = null;

diem.storage.Storage.getCurrent = function() {
  return diem.storage.Storage.get().model_;
};

/**
 * @param {diem.storage.Storage} storage
 */
diem.storage.Storage.setStorage = function(storage) {
  goog.asserts.assert(diem.storage.Storage.INSTANCE == null);
  diem.storage.Storage.INSTANCE = storage;
};

/**
 * @returns {diem.storage.Storage}
 */
diem.storage.Storage.get = function() {
  if (diem.storage.Storage.INSTANCE == null) {
    diem.storage.Storage.INSTANCE = new diem.storage.Storage();
  }
  return diem.storage.Storage.INSTANCE;
};

/**
 * Send a KV-pair struct to the server in the 'data' parameter.
 * @param {Object} obj
 */
diem.storage.Storage.prototype.send = function() {
  // Don't send if it's been less than 10 seconds since the last save.
  var now = Date.now();
  if (now - this.lastSend_ < 10000) {
    return;
  }

  // Don't send if it's the exact same model we sent last time.
  var json = this.model_.getStorable();
  var hash = diem.storage.Model.getHash(json);
  if (this.lastHash_ == hash) {
    this.lastSend_ = now;
    return;
  }
  this.lastHash_ = hash;

  var request = new goog.net.XhrIo();
  request.send(
    window.location.pathname, 'POST', "data=" + json);
  // TODO: wait until send was successful.
  this.lastSend_ = Date.now();
};
