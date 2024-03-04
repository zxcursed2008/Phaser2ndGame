// Конфігурація гри

//21111111111111111111111111111111111111111111111111111111111111111111
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, 

            debug: false 
        }
    },
    scene: {
        preload: preload, // Передзавантаження ресурсів
        create: create, // Створення гри
        update: update // Оновлення гри

    }
  };

     var score = 0; // Початковий рахунок гравця
    var scoreText; // Текст рахунку
    var canMove = true;
    var timer = 0; // *100 мс
    var timerText; // текстова змінна для таймера
    var worldWidth = 20000;

  
  // Ініціалізація гри
  var game = new Phaser.Game(config);
  
  // Завантаження ресурсів
  function preload() {
    this.load.image('sky', 'assets/sky.png'); // Завантаження зображення неба
    this.load.image('ground', 'assets/platform.png'); // Завантаження зображення платформи
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); // Завантаження спрайту гравця
    this.load.image('house', 'assets/house.png'); // Завантаження зображення будинка
    this.load.audio('backgroundMusic', 'assets/music.mp3');
    this.load.image('ground1', 'assets/ground1.png');
    this.load.image('star', 'assets/star.png'); // Завантаження зображення платформи
    this.load.image('sky1', 'assets/sky1.png');
    this.load.image('bush', 'assets/bush.png'); // Завантаження зображення куща
    this.load.image('mushroom', 'assets/mushroom.png'); // Завантаження зображення гриба
    this.load.image('tree', 'assets/tree.png')
  }

  const WORLD_WIDTH = 4000;
  
  /// Створення гри
  function create() {
    {
        var music = this.sound.add('backgroundMusic', { loop: true });
        music.play();
    }
  

    // Додавання зображення неба та встановлення його розміру
    this.add.tileSprite(0,0,worldWidth,1080,'sky1').setOrigin(0,0);
    

    platforms = this.physics.add.staticGroup();


    platforms = this.physics.add.staticGroup();
    //Додаємо землю на всю ширинуекрану
    for(var x = 0; x<worldWidth; x=x+800){
        console.log(x)
        platforms.create(x,1080-150,'ground').setOrigin(0,0).refreshBody();
    }
  

// Розташовуємо другу платформу далі вправо, за межами екрану
    // platforms.create(1500, 800, 'ground1').setScale(2).refreshBody();
    // platforms.create(2000, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(2500, 850, 'ground1').setScale(2).refreshBody();
    // platforms.create(3000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(3500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(4000, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(4500, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(5000, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(5500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(6000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(6500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(7500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(8000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(8500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(9000, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(9500, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(10000, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(10500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(11000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(11500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(12000, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(12500, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(13000, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(13500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(14000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(14500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(15000, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(15500, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(16000, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(16500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(17000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(17500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(18000, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(18500, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(19000, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(19500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(20000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(21000, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(21500, 650, 'ground1').setScale(2).refreshBody();
    // platforms.create(22000, 600, 'ground1').setScale(2).refreshBody();
    // platforms.create(22500, 450, 'ground1').setScale(2).refreshBody();
    // platforms.create(23000, 650, 'ground1').setScale(2).refreshBody();

//1
    

    // Додавання зображення будинку на платформу
    this.add.image(400, 740, 'house');

    // Створення гравця
    player = this.physics.add.sprite(610, 880, 'dude').setScale(2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Колізія гравця з платформами
    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();

    // Налаштування анімацій гравця
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
  

  // Встановлення меж камери
  this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Встановлення меж фізичного світу
  this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Слідкування камери за гравцем
  this.cameras.main.startFollow(player);




  bushes = this.physics.add.staticGroup();
//Додаємо кущів на всю ширину екрану
for(var x = 900; x<worldWidth; x=x+Phaser.Math.FloatBetween(400, 1500)){
    console.log(' x-'+ x)
    bushes.create(x,1080-150,'bush').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
}

trees = this.physics.add.staticGroup();
//Додаємо кущів на всю ширину екрану
for(var x = 900; x<worldWidth; x=x+Phaser.Math.FloatBetween(400, 2500)){
    console.log(' x-'+ x)
    trees.create(x,1080-150,'tree').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
}


mushrooms = this.physics.add.staticGroup();
//Додаємо грибів на всю ширину екрану
for(var x = 500; x<worldWidth; x=x+Phaser.Math.FloatBetween(400, 1500)){
    console.log(' x-'+ x)
    mushrooms.create(x, 1080-150,'mushroom').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
}


  const stars = this.physics.add.group({
    key: 'star',
    repeat: 1000, // Кількість зірок (змініть за потребою)
    setXY: { x: 250, y: 50, stepX: 70 } // Відстань між зірками (змініть за потребою)
});

 // Налаштування властивостей зірок
 stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
});

// Колізія зірок з платформами
this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);
scoreText = this.add.text(200000, 100006, 'Score: 0', { fontSize: '32px', fill: '#000' });





  this.add.text(540, 50, 'ЗБЕРИ УСІ ЦЕГЛИНКИ ЩОБ ЗБУДУВАТИ БУДИНОК!', { fontFamily: 'Arial', fontSize: 32, color: '#101691' });
  this.add.text(2000, 50, 'ОБЕРЕЖНО! НЕБЕЗПЕКА!', { fontFamily: 'Arial', fontSize: 32, color: '#101691' });
}


function collectStar(player, star) {
    star.disableBody(true, true);
    score += 1;
    scoreText.setText('Score:  ' + score );
    document.getElementById('score').innerHTML='<h1>Score:' + score + "</h1>";

   
    }
  
  // Оновлення гри
  function update() {
    
    if (cursors.left.isDown) {
        player.setVelocityX(-160); // Рух вліво
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {

        player.setVelocityX(160); // Рух вправо
        player.anims.play('right', true);
    } else 
    {
        player.setVelocityX(0); // Зупинка гравця
        player.anims.play('turn');
    }
  
    if (cursors.up.isDown && player.body.touching.down) {

        player.setVelocityY(-330); // Пристріл вгору, тільки коли гравець на платформі
    }
  }

  // Оновлення часу гри
function updateTime() {
    time++;
    document.getElementById("time").innerHTML = "Time: " + formatTime(time);
}


  