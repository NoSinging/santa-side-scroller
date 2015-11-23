var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', SantaRunner.Boot);
game.state.add('Preloader', SantaRunner.Preload);
game.state.add('MainMenu', SantaRunner.MainMenu);
game.state.add('Game', SantaRunner.Game);

game.state.start('Boot');