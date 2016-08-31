/* global THREE */

goog.provide('diem.cloth.physics.Column');

/**
 * @param {number} size
 * @constructor
 */
diem.cloth.physics.Column = function(size) {
  this.origStart = -1;
  this.start = -1;
  this.length = 0;
  this.y = new Array(size);
  for (var i = 0; i < size; ++i) {
    this.y[i] = -1;
  }
};

/**
 * @param {number} i the index of the vertex
 * @param {number} y the y-coordinate of the vertex
 */
diem.cloth.physics.Column.prototype.add = function(i, y) {
  if (this.start == -1) {
    this.start = y;
    this.origStart = y;
  }
  this.length++;
  this.y[y] = i;
};

/**
 * @returns {boolean}
 */
diem.cloth.physics.Column.prototype.isEmpty = function() {
  return this.start == -1;
};

/**
 * Restarts the iterator.
 */
diem.cloth.physics.Column.prototype.restart = function() {
  this.start = this.origStart;
};

/**
 * @returns {number}
 */
diem.cloth.physics.Column.prototype.current = function() {
  return this.y[this.start];
};

/**
 * @returns {number}
 */
diem.cloth.physics.Column.prototype.next = function() {
  for (var i = this.start + 1; i < this.y.length; ++i) {
    if (this.y[i] != -1) {
      this.start = i;
      return this.y[i];
    }
  }
  goog.asserts.fail('Should have found a next');
  return -1;  // unreachable.
};

/**
 * @returns {boolean}
 */
diem.cloth.physics.Column.prototype.hasNext = function() {
  for (var i = this.start + 1; i < this.y.length; ++i) {
    if (this.y[i] != -1) {
      return true;
    }
  }
  return false;
};
