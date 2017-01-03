goog.provide('diem.cloth.LinkTracker');

/**
 * This is a helper class to keep track of links between vertices, used for
 * converting THREE shapes to Ammo.
 * @param {Ammo.btSoftBody} softBody
 * @constructor
 */
diem.cloth.LinkTracker = function(softBody) {
  this.links_ = {};
  this.ammoLinks_ = softBody.get_m_links();
  this.ammoNodes_ = softBody.get_m_nodes();
  this.idx_ = 0;
};

/**
 * @param {number} a
 * @param {number} b
 */
diem.cloth.LinkTracker.prototype.connect = function(a, b) {
  if (this.isLinked_(a, b)) {
    return;
  }
  this.link_(a, b);

  var link = this.ammoLinks_.at(this.idx_++);
  link.set_m_n(0, this.ammoNodes_.at(a));
  link.set_m_n(1, this.ammoNodes_.at(b));
};

/**
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 * @private
 */
diem.cloth.LinkTracker.prototype.isLinked_ = function(a, b) {
  return a in this.links_ && this.links_[a].includes(b);
};

/**
 * @param {number} a
 * @param {number} b
 * @private
 */
diem.cloth.LinkTracker.prototype.link_ = function(a, b) {
  if (!(a in this.links_)) {
    this.links_[a] = [];
  }
  if (!(b in this.links_)) {
    this.links_[b] = [];
  }

  this.links_[a].push(b);
  this.links_[b].push(a);
};
