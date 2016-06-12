/* global THREE */

goog.provide('diem.Pin');

goog.require('goog.asserts');

diem.Pin = function(particle) {
  goog.asserts.assert(particle != null);
  this.particle_ = particle;
  this.sprite_ = new THREE.Sprite(diem.Pin.MATERIAL);
  this.sprite_.position.copy(particle.position);
  this.sprite_.scale.x = this.sprite_.scale.y = 16;
};

diem.Pin.MATERIAL = new THREE.SpriteCanvasMaterial({
  color: 0x000000,
  program: function (context) {
    context.beginPath();
    context.arc(0, 0, 0.5, 0, Math.PI * 2, true);
    context.fill();
  }
});
// THREE has an explicit check for map !== null, which then dereferences map.
diem.Pin.MATERIAL.map = null;

diem.Pin.prototype.getSprite = function() {
  return this.sprite_;
};

diem.Pin.prototype.getParticle = function() {
  return this.particle_;
};
