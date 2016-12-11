goog.provide('diem.Button');

/**
 * @returns {diem.Button.Builder}
 */
diem.Button.builder = function() {
  return new diem.Button.Builder();
};

/**
 * @constructor
 * @private
 */
diem.Button.Builder = function() {
  this.button_ = document.createElement('button');
  this.button_.className = 'btn btn-default';
  this.button_.setAttribute('style', 'float: left;');
  // TODO: setup CSS positioning.
};

diem.Button.Builder.prototype.setTooltip = function(tooltip) {
  this.button_.setAttribute('title', tooltip);
  return this;
};

diem.Button.Builder.prototype.setIcon = function(icon) {
  this.button_.innerHTML = '<img src="' + icon + '" style="width: 30px;" />';
  return this;
};

diem.Button.Builder.prototype.setInnerHtml = function(html) {
  this.button_.innerHTML = html;
  return this;
};

diem.Button.Builder.prototype.build = function() {
  return this.button_;
};
