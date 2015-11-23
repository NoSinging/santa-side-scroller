var House = function(game, x, y, key, frame) {
  key = 'house';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(0.5);
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;
  this.onOutOfBoundsKill = true;

  this.events.onKilled.add(this.onKilled, this);
  this.events.onRevived.add(this.onRevived, this);

};

House.prototype = Object.create(Phaser.Sprite.prototype);
House.prototype.constructor = House;

House.prototype.onRevived = function() {
  this.body.velocity.x = -300;
};

House.prototype.onKilled = function() {
};

