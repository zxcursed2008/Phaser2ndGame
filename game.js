// Конфігурація гри
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 220 }, 
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
    var time = 0;
  
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
  }

  const WORLD_WIDTH = 4000;
  
  /// Створення гри
  function create() {
    {
        var music = this.sound.add('backgroundMusic', { loop: true });
        music.play();
    }
  

    // Додавання зображення неба та встановлення його розміру
    this.add.image(4200,540, 'sky').setDisplaySize(10000, 1080);

    platforms = this.physics.add.staticGroup();
  
    // Розташовуємо першу платформу з самого низу екрану
    platforms.create(700, 950, 'ground').setScale(2).refreshBody();
  
    // Розташовуємо другу платформу далі вправо, за межами екрану
    platforms.create(2200, 950, 'ground').setScale(2).refreshBody();
    platforms.create(3700, 950, 'ground').setScale(2).refreshBody(); 
    platforms.create(5200, 950, 'ground').setScale(2).refreshBody();
    platforms.create(6500, 950, 'ground').setScale(2).refreshBody();
    platforms.create(7000, 950, 'ground').setScale(2).refreshBody();
    platforms.create(8500, 950, 'ground').setScale(2).refreshBody();

    platforms.create(1500, 600, 'ground1').setScale(2).refreshBody();
    platforms.create(2000, 450, 'ground1').setScale(2).refreshBody();
    platforms.create(2500, 650, 'ground1').setScale(2).refreshBody();
    platforms.create(3000, 600, 'ground1').setScale(2).refreshBody();
    platforms.create(3500, 450, 'ground1').setScale(2).refreshBody();
    platforms.create(4000, 650, 'ground1').setScale(2).refreshBody();
    platforms.create(4500, 600, 'ground1').setScale(2).refreshBody();
    platforms.create(5000, 450, 'ground1').setScale(2).refreshBody();
    platforms.create(5500, 650, 'ground1').setScale(2).refreshBody();
    platforms.create(6000, 600, 'ground1').setScale(2).refreshBody();
    platforms.create(6500, 450, 'ground1').setScale(2).refreshBody();
    platforms.create(7000, 650, 'ground1').setScale(2).refreshBody();
    

    // Додавання зображення будинку на платформу
    this.add.image(400, 610, 'house');

    // Створення гравця
    player = this.physics.add.sprite(610, 600, 'dude').setScale(2);
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
    scoreText.setText('Score: ' + score);
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



context.fillText("Час гри: " + formatTime(time), board.width / 2, board.height / 2 + 60);
  