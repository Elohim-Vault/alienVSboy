var physicsConfig = {
    default: 'arcade',
    arcade: {
        debug: false
    }
}
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    physics: physicsConfig,
    scene: [SceneMain]
};

var floor;
var player;
var cursors;
var direction;

var game = new Phaser.Game(config);