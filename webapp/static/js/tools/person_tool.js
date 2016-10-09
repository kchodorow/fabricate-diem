goog.provide('diem.tools.PersonTool');

goog.require('diem.tools.Tool');
goog.require('goog.events.KeyCodes');

/**
 * @param {diem.MeshWrapper} person
 * @param {goog.events.KeyCodes} dir
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.PersonTool = function(person, dir) {
  goog.base(this);
  this.name_ = diem.tools.PersonTool.NAME + dir;
  this.person_ = person;
  this.dir_ = dir;
};

goog.inherits(diem.tools.PersonTool, diem.tools.Tool);

diem.tools.PersonTool.NAME = 'PERSON';

/**
 * @param {diem.tools.Tool} activeTool Ignored.
 * @param {diem.storage.Piece} [opt_piece]
 * @override
 */
diem.tools.PersonTool.prototype.onSelect = function() {
  this.person_.move(this.dir_);
  return [];
};

/**
 * @override
 */
diem.tools.PersonTool.prototype.getKeys = function() {
  return [this.dir_];
};
