goog.provide('diem.storage.Storage');

goog.require('diem.storage.Model');

goog.require('goog.asserts');
goog.require('goog.crypt.Md5');
goog.require('goog.events');
goog.require('goog.net.XhrIo');

/**
 * @constructor
 * @private
 */
diem.storage.Storage = function() {
  this.model_ = new diem.storage.Model();
  this.lastSend_ = Date.now();
  this.lastDataHash_ = this.getHash(this.model_.getStorable());
  this.lastMetadataHash_ = this.getHash(this.getMetadata_());
  this.patternLoaded_ = false;
};

diem.storage.Storage.INSTANCE = null;

/**
 * @returns {diem.storage.Model}
 */
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
 */
diem.storage.Storage.prototype.send = function() {
  // Until loading the pattern has finished, don't send an empty model
  // to the server or we'll overwrite our project!
  if (!this.patternLoaded_) {
    return;
  }

  // Don't send if it's been less than 10 seconds since the last save.
  var now = Date.now();
  if (now - this.lastSend_ < 10000) {
    return;
  }

  var post = [];
  var json = this.model_.getStorable();
  var currentDataHash = this.getHash(json);
  if (this.lastDataHash_ != currentDataHash) {
    post.push("data=" + json);
  }
  var metadata = this.getMetadata_();
  var currentMetadataHash = this.getHash(metadata);
  if (this.lastMetadataHash_ != currentMetadataHash) {
    post.push("metadata=" + this.getMetadata_());
  }

  this.lastSend_ = now;
  this.lastDataHash_ = currentDataHash;
  this.lastMetadataHash_ = currentMetadataHash;

  if (post.length == 0) {
    // There is nothing to send: nothing has changed.
    return;
  }

  var request = new goog.net.XhrIo();
  request.send(window.location.pathname, 'POST', post.join("&"));
  // TODO: update lastSend_ when the send returns success.
};

/**
 * @param {string} str
 * @return {string} the hashed digest.
 */
diem.storage.Storage.prototype.getHash = function(str) {
  var hash = new goog.crypt.Md5();
  hash.update(str);
  return "" + hash.digest();
};

/**
 * @returns {string}
 * @private
 */
diem.storage.Storage.prototype.getMetadata_ = function() {
  return JSON.stringify({
    title : document.getElementById("pattern-name").innerHTML});
};

/**
 * @param {function(Array<diem.cloth.Workboard>)} callback
 */
diem.storage.Storage.prototype.request = function(callback) {
  var request = new goog.net.XhrIo();
  var storage = this;
  // TODO: handle errors.
  goog.events.listen(request, goog.net.EventType.COMPLETE, function(e) {
    var xhr = e.target;
    if (xhr.getResponseText() != "") {
      try {
        var obj = xhr.getResponseJson();
      } catch (e) {
        // TODO: don't ignore.
        console.log(e);
        return;
      }
      // If this is a new pattern, there won't be a model to load.
      if (obj.model != null) {
        callback(obj.model);
      }
    }
    storage.patternLoaded_ = true;
  });
  request.send(window.location.pathname + "?format=json", 'GET');
};
