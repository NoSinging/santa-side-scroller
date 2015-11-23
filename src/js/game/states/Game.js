SantaRunner.Game = function() {
  this.houseRate = 1000;
  this.houseTimer = 0;
  };

SantaRunner.Game.prototype = {
  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height-100, 'sky');
    this.background.autoScroll(-100, 0);

    this.ground = this.game.add.tileSprite(0, this.game.height - 100, this.game.width, 100, 'ground');
    this.ground.autoScroll(-300, 0);

    this.player = this.add.sprite(200, this.game.height/3, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.3);

    this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.houses = this.game.add.group();
  },
  update: function() {

    if(this.houseTimer < this.game.time.now) {
      this.createhouse();
      this.houseTimer = this.game.time.now + this.houseRate;
    }
  },
  shutdown: function() {

  },

  createhouse: function() {
    var x = this.game.width;
    var y = this.game.world.height - 100 - 186/4; // 100 is ground, 186 is building size

    var house = this.houses.getFirstExists(false);
    if(!house) {
      house = new House(this.game, 0, 0);
      this.houses.add(house);
    }

    house.reset(x, y);
    house.revive();
    
  }
};