const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);


let monster, nugget, house, cursors, textScore;
let score = 0; 
let hasNugget = false; 
let background; 


function preload() {
    this.load
        .image("monster", "/assets/character/monster.gif")
        .image("nugget", "/assets/objects/nugget.png")
        .image("background", "/assets/background/background.jpg")
        .image("house", "/assets/house/house.png");

    }
function create() {   
    background = this.add.image(0, 0, "background").setOrigin(0, 0);
    resizeBackground();

    monster = this.physics.add.sprite(0, 500, "monster").setBounce(0).setCollideWorldBounds(true).setScale(2.5);
    nugget = this.physics.add.sprite(500, 500, "nugget").setScale(3);

    house = this.add.image(1100, 500, "house").setScale(0.10); 

    const style = { font: "50px Courier New", fill: "#FFFB03" };
    textScore = this.add.text(50, 30, "Nuggets Collected: " + score, style);
    cursors = this.input.keyboard.createCursorKeys();
    this.scale.on('resize', resizeBackground, this);
}

function resizeBackground() {
    const { width, height } = game.scale.gameSize;
    const scaleX = width / background.width;
    const scaleY = height / background.height;
    background.setScale(scaleX, scaleY);
}

function update() {
   
    if (cursors.left.isDown) {
        monster.setVelocityX(-160);
        monster.flipX = true;
    } else if (cursors.right.isDown) {
        monster.setVelocityX(160);
        monster.flipX = false;
    } else {
        monster.setVelocityX(0);
    }

   
    this.physics.add.overlap(monster, nugget, () => {
        if (!hasNugget) {
            hasNugget = true;
            nugget.disableBody(true, true);
            alert("Nugget achieved, return it to your dogmaster!");
        }
    });

   
    if (hasNugget && monster.x > 1000) {
        score += 100;
        textScore.setText("Nuggets Collected: " + score);
        monster.disableBody(true, true);
        alert("You have succesfully achieved the nugget!");
        hasNugget = false;
        }
    }