class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    
    preload() {
        this.load.image("bullet", "assets/fogo.png");
        this.load.image('floor', "assets/chao.png");
        this.load.spritesheet('player', 'assets/personagem.png', {frameWidth: 45, frameHeight: 66});
    }
    create() {
        this.add.image(400, 300, 'floor');
        player = this.physics.add.sprite(100, 450, 'player');
        player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();

        // Player
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4}),
            frameRate: 18,
            repeat: 0
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {start: 5, end: 9}),
            frameRate: 18,
            repeat: 0,
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 10, end: 14}),
            frameRate: 18,
            repeat: 0,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 15, end: 18}),
            frameRate: 18,
            repeat: 0,
        });

        // Fireball
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet'
        });

    }
    shoot(direction) {
        // Default values = facing left
        var bulletDirectionY = 200
        var bulletDirectionX = 0
        var bulletSpawnY = player.y + 40;
        var bulletSpawnX = player.x;

        switch (direction){
            case 'up':
                // Where the bullet go
                bulletDirectionY = -200
                bulletDirectionX = 0
                // Where the bullet spawn
                bulletSpawnY = player.y - 40;
                bulletSpawnX = player.x;
                break
            case 'right':
                bulletDirectionX = 200
                bulletDirectionY = 0
                bulletSpawnY = player.y;
                bulletSpawnX = player.x + 40;
                break
            case 'left':
                bulletDirectionX = -200;
                bulletDirectionY = 0
                bulletSpawnY = player.y;
                bulletSpawnX = player.x - 40;
                break
        }
        var bullet = this.bullets.get(bulletSpawnX , bulletSpawnY);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = bulletDirectionY
            bullet.body.velocity.x = bulletDirectionX 
        }
    }
    update() {
        // Input
        player.body.velocity.x = 0
        player.body.velocity.y = 0

        if(cursors.up.isDown){
            player.body.velocity.y -= 180;
            player.anims.play('up', true);
            direction = 'up'
        }
        
        else if(cursors.down.isDown){
            player.body.velocity.y += 180;
            player.anims.play('down', true);
            direction = 'down'
        }

        else if(cursors.left.isDown){
            player.body.velocity.x -= 180;
            player.anims.play('left', true);
            direction = 'left'
        }

        else if(cursors.right.isDown){
            player.body.velocity.x += 180;
            player.anims.play('right', true);
            direction = 'right';
        }
        
        if(cursors.space.isDown){
            this.shoot(direction)
        }

        // Shoot
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));

        
    }
}