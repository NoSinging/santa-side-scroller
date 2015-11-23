var Present = function(game, x, y, key, frame) {
  key = 'present';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(0.1);
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.body.bounce.set(0.25);
  //this.body.gravity.set(0, 180);

  this.checkWorldBounds = true;
  this.onOutOfBoundsKill = true;

  this.events.onKilled.add(this.onKilled, this);
  this.events.onRevived.add(this.onRevived, this);

};

Present.prototype = Object.create(Phaser.Sprite.prototype);
Present.prototype.constructor = Present;

Present.prototype.onRevived = function() {
  this.body.velocity.x = -100;
};

Present.prototype.onKilled = function() {
};

