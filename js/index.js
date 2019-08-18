const getRandom = (max, min) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const keyFrame = (self) => {
    self.anims.create({
        key: 'run',
        frames: self.anims.generateFrameNumbers('user', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    })
    /*self.anims.create({
        key: 'jump',
        frames: self.anims.generateFrameNumbers('user', { start: 2, end: 3 }),
        frameRate: 5,
        repeat: -1
    })
    self.anims.create({
        key: 'speed',
        frames: self.anims.generateFrameNumbers('user', { start: 4, end: 5 }),
        frameRate: 5,
        repeat: -1
    })*/
    self.anims.create({
        key: 'stop',
        frames: self.anims.generateFrameNumbers('user', { start: 4, end: 5 }),
        frameRate: 5,
        repeat: -1
    })
}

const gameStart = {
    key: 'gameStart',
    preload: function(){
        this.load.image('bg1', 'image/bg1.png');
        this.load.image('footer1', 'image/footer1.png');
        this.load.image('footer', 'image/footer.png');
        this.load.image('monster', 'image/monster.png');
        this.load.image('monster1', 'image/monster1.png');
        this.load.image('monster2', 'image/monster2.png');
        this.load.image('monster3', 'image/monster3.png');
        this.load.image('gameover', 'image/gameover.png');

        this.load.spritesheet('user', 'image/turtlemove.png', {frameWidth: 400, frameHeight: 400});

        //this.iskeyJump = true;   // 是否可以跳躍
        this.monsterArr = [];    // 存放所有怪物實體
        this.monsterArr2 = [];   // 存放所有怪物實體2
        this.monsterArr3 = [];
        this.monsterArr4 = [];
        this.masIdx = 0;         // 怪物索引
        this.masIdx2 = 1;        // 怪物索引2
        this.masIdx3 = 2; 
        this.masIdx4 = 3;
        this.gameStop = false;   // 控制遊戲是否停止
        this.bgSpeed = 1.3;      // 速度
        this.TimeStep = 30;      // 遊戲時間
    },
    create: function(){
        this.bg1 = this.add.tileSprite(683, 384, 1366, 768, 'bg1');
        this.footer1 = this.add.tileSprite(683, 940, 1366, 768, 'footer1');
        this.footer = this.add.tileSprite(683, 960, 1366, 768, 'footer');

        //設定文字
        this.timeText = this.add.text(25, 30, `TIME: ${this.TimeStep}`, { fontSize: '22px', fill: '#FFFFFF' })

        // 遊戲計時器
        let gametime = setInterval(()=>{
            this.TimeStep--;
            //重新設定文字
            this.timeText.setText(`TIME: ${this.TimeStep}`);
            if(this.TimeStep < 20 && this.TimeStep > 10 ){
                this.bgSpeed = 1.6;
            }else if(this.TimeStep < 10 && this.TimeStep > 0 ){
                this.bgSpeed = 3;
            }else if(this.TimeStep <= 0){
                this.gameStop = true;
                clearInterval(gametime);
            }
        }, 1000);

        
        // 動畫影格
        //keyFrame(this);

        // 加入物理效果
        const addPhysics = GameObject =>{
            this.physics.add.existing(GameObject);
            GameObject.body.immovable = true;
            GameObject.body.moves = false;
        }

        // 怪物的座標資訊
        const masPos = [
            {name: 'monster', x: 1766, y: 320, w: 91, h: 91},
            {name: 'monster1', x: 2066, y: 150 , w: 182, h: 189},
            {name: 'monster2', x: 1800, y: 500, w: 41, h: 43},
            {name: 'monster3', x: 2000, y: 300, w: 76, h: 45},
        ]

        //碰撞到後停止遊戲
        const hittest = (player, rock) => {
            this.gameStop = true;
            this.player.setBounce(0);
            this.player.setSize(330, 250, 10);
            this.player.anims.play('stop', true);
            clearInterval(gametime);
            //let gameover = this.add.image(683, 384, 'gameover');
            //gameover.setScale(0.8);
        }
        
            
        // 產生怪物
        for (let i = 0; i < 10; i++) {
            let BoolIdx = getRandom(3, 0);
            let BoolIdx2 = getRandom(3, 0);
            let BoolIdx3 = getRandom(3, 0);
            let BoolIdx4 = getRandom(3, 0);
            this['rock'+ i] = this.add.tileSprite(masPos[BoolIdx].x, masPos[BoolIdx].y, masPos[BoolIdx].w, masPos[BoolIdx].h, masPos[BoolIdx].name);
            this['rockB'+ i] = this.add.tileSprite(masPos[BoolIdx2].x, masPos[BoolIdx2].y, masPos[BoolIdx2].w, masPos[BoolIdx2].h, masPos[BoolIdx2].name);
            this['rockC'+ i] = this.add.tileSprite(masPos[BoolIdx3].x, masPos[BoolIdx3].y, masPos[BoolIdx3].w, masPos[BoolIdx3].h, masPos[BoolIdx3].name);
            this['rockD'+ i] = this.add.tileSprite(masPos[BoolIdx4].x, masPos[BoolIdx4].y, masPos[BoolIdx4].w, masPos[BoolIdx4].h, masPos[BoolIdx4].name);
            this.monsterArr.push(this['rock'+ i]);
            this.monsterArr2.push(this['rockB'+ i]);
            this.monsterArr3.push(this['rockC'+ i]);
            this.monsterArr4.push(this['rockD'+ i]);
            addPhysics(this['rock'+i]);
            addPhysics(this['rockB'+i]);
            addPhysics(this['rockC'+i]);
            addPhysics(this['rockD'+i]);
            //this.physics.add.collider(this.player, this['rock'+i], hittest);
            //this.physics.add.collider(this.player, this['rockB'+i], hittest);
        }
        
        this.physics.add.existing(this.footer);
        this.footer.body.immovable = true;
        this.footer.body.moves = false;

        this.physics.add.existing(this.footer1);
        this.footer1.body.immovable = true;
        this.footer1.body.moves = false;

        this.player = this.physics.add.sprite(150, 300, 'user');
        this.player.setCollideWorldBounds(true); //角色邊界限制
        //this.player.setBounce(0.2);
        this.player.setSize(330, 250, 10);
        this.player.setScale(0.7);
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('user', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.footer);
        this.player.anims.play('run', true);
    },
    update: function(){
        if(this.gameStop) return;

        this.footer.tilePositionX += 4 * this.bgSpeed;
        this.footer1.tilePositionX += 3 * this.bgSpeed;

        this.monsterArr[this.masIdx].x -= 4 * this.bgSpeed;
        if(this.TimeStep < 20 && this.TimeStep > 12 ){
            this.monsterArr2[this.masIdx2].x -= 4 * this.bgSpeed;
        }
        if(this.TimeStep < 12 && this.TimeStep > 6 ){
            this.monsterArr3[this.masIdx3].x -= 4 * this.bgSpeed;
        }
        if(this.TimeStep < 6 && this.TimeStep > 0 ){
            this.monsterArr4[this.masIdx4].x -= 4 * this.bgSpeed;
        }
        // 檢測怪物是否超出邊界然後返回
        /*for (let i = 0; i < this.monsterArr.length; i++) {
            if(this.monsterArr[i].x <= -100){
                this.monsterArr[i].x = cw + 200;
                this.masIdx = getRandom(this.monsterArr.length - 1, 0);
            }
            if(this.monsterArr2[i].x <= -100){
                this.monsterArr2[i].x = cw + getRandom(400, 200);
                this.masIdx2 = getRandom(this.monsterArr2.length - 1, 0);
            }
        }*/

        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.setSize(330, 250, 10); //碰撞邊界
            this.player.anims.play('speed', true);
            this.player.flipX = false;
        } else if (cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.anims.play('speed', true);
            this.player.flipX = true;
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('run', true);
            this.player.setSize(330, 250, 10); //碰撞邊界
            this.player.flipX = false;
        }
        if (cursors.up.isDown) {
            if(this.iskeyJump){
                this.iskeyJump = false;
                this.player.setVelocityY(-300);
            }
        }else{
            this.iskeyJump = true;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1366,
    height: 768,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500
            },
            //debug: true
        },
    },
    scene: [
        gameStart,
    ]
}
const game = new Phaser.Game(config);