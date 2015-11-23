SantaRunner.Game = function() {
  this.houseRate = 1000;
  this.houseTimer = 0;
  this.presentRate = 500;
  this.nextPresent = 0;
  };

SantaRunner.Game.prototype = {
  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height-100, 'sky');
    this.background.autoScroll(-100, 0);

    this.ground = this.game.add.tileSprite(0, this.game.height - 100, this.game.width, 100, 'ground');
    this.ground.autoScroll(-300, 0);

    this.player = this.add.sprite(this.game.width/2, this.game.height/3, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.3);

    this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 400;

    this.game.physics.arcade.enableBody(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.houses = this.game.add.group();
    this.presents = this.game.add.group();
  },
  update: function() {

    if(this.houseTimer < this.game.time.now) {
      this.createhouse();
      this.houseTimer = this.game.time.now + this.houseRate;
    }

    if (game.input.activePointer.isDown)
    {

      if (game.time.now > this.nextPresent)
      {
        this.nextPresent = game.time.now + this.presentRate;
        this.dropPresent();
      }
    }


    this.game.physics.arcade.collide(this.ground, this.presents, this.groundHit, null, this);
    this.game.physics.arcade.overlap(this.houses, this.presents, this.houseHit, null, this);

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
    
  },

  dropPresent: function() {
    var present = this.presents.getFirstExists(false);
    if(!present) {
      present = new Present(this.game, 0, 0);
      this.presents.add(present);
    }

    present.reset(this.game.width/2, this.game.height/3);
    present.revive();
    
  },

  groundHit: function(ground, present) {
    present.body.velocity.x = -300;
  },

  houseHit: function(house, present) {
    present.body.velocity.x = -300;
    //add to the score
  }

};