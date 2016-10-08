goog.provide('diem.events.EventBuilder');

goog.require('goog.asserts');

/**
 * @constructor
 */
diem.events.EventBuilder = function() {
  this.actions_ = [];
};

/**
 * @returns {Object}
 */
diem.events.EventBuilder.prototype.build = function() {
  goog.asserts.assert(this.actions_.length > 0);
  return {
    actions : this.actions_
  };
};

/**
 * @param {Object} action
 * @returns {diem.events.EventBuilder}
 */
diem.events.EventBuilder.prototype.addAction = function(action) {
  goog.asserts.assert(action.id != null);
  goog.asserts.assert(action.type != null);
  this.actions_.push(action);
  return this;
};

/**
 * @param {diem.events.EventBuilder} event
 * @returns {diem.events.EventBuilder}
 */
diem.events.EventBuilder.prototype.addEvent = function(event) {
  for (var i = 0; i < event.actions.length; ++i) {
    this.addAction(event.actions[i]);
  }
  return this;
};
