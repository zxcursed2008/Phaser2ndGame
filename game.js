// Конфігурація гри
var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true
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
var powers; //зміна життів
var live = 5 //початкова кількіть життів
var lifeLine
var bombs




// Ініціалізація гри
var game = new Phaser.Game(config);

// Завантаження ресурсів
function preload() {
  this.load.image('ground', 'assets/platform.png'); // Завантаження зображення платформи
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); // Завантаження спрайту гравця
  this.load.image('house', 'assets/house.png'); // Завантаження зображення будинка
  this.load.audio('backgroundMusic', 'assets/music.mp3');
  this.load.image('ground1', 'assets/ground1.png');
  this.load.image('star', 'assets/star.png'); // Завантаження зображення платформи
  this.load.image('sky1', 'assets/sky1.png'); //Завантаження зображення неба
  this.load.image('bush', 'assets/bush.png'); // Завантаження зображення куща
  this.load.image('mushroom', 'assets/mushroom.png'); // Завантаження зображення гриба
  this.load.image('tree', 'assets/tree.png')// Завантаження зображення дерева
  this.load.image('power', 'assets/power.png'); // Завантаження зображення життя
  this.load.image('ground1', 'assets/platform2.png'); // Завантаження зображення платформи
  this.load.image('bomb', 'assets/bomb.png'); // Завантаження зображення платформи
  this.load.image('platformStart', 'assets/platformStart.png'); //Завантаження першої платформи
  this.load.image('platformOne', 'assets/platformOne.png'); //Завантаження другої платформи
  this.load.image('platformFinish', 'assets/platformFinish.png'); //Завантаження третьої платформи

}

//розмір ігрового світу
const WORLD_WIDTH = 4000;

/// Створення гри
function create() {
  {
    var music = this.sound.add('backgroundMusic', { loop: true });
    music.play();
  }



  // Додавання зображення неба та встановлення його розміру
  this.add.tileSprite(0, 0, worldWidth, 1080, 'sky1').setDepth(0).setOrigin(0, 0);


  platforms = this.physics.add.staticGroup();

  //Додаємо землю на всю ширину екрану
  for (var x = 0; x < worldWidth; x = x + 800) {
    console.log(x)
    platforms.create(x, 1080 - 150, 'ground').setOrigin(0, 0).refreshBody();
  }




  // Додавання зображення будинку на платформу
  this.add.image(400, 740, 'house').setDepth(0);

  // Створення гравця
  player = this.physics.add.sprite(610, 880, 'dude').setDepth(5).setScale(2);
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




 
//Додано статичні
  for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(600, 800)) {
    var y = Phaser.Math.FloatBetween(600, 93 * 8)
    platforms.create(x, y, 'platformStart');
    var i;
    for (i = 1; i < Phaser.Math.Between(0, 5); i++) {
      platforms.create(x + 100 * i, y, 'platformOne');
    }

    platforms.create(x + 100 * i, y, 'platformFinish');
  }



  // Встановлення меж камери
  this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Встановлення меж фізичного світу
  this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Слідкування камери за гравцем
  this.cameras.main.startFollow(player);




  bushes = this.physics.add.staticGroup();
  //Додаємо кущів на всю ширину екрану
  for (var x = 900; x < worldWidth; x = x + Phaser.Math.FloatBetween(400, 1500)) {
    console.log(' x-' + x)
    bushes.create(x, 1080 - 150, 'bush').setDepth(Phaser.Math.Between(1, 10)).setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
  }

  trees = this.physics.add.staticGroup();
  //Додаємо дерев на всю ширину екрану
  for (var x = 900; x < worldWidth; x = x + Phaser.Math.FloatBetween(400, 2500)) {
    console.log(' x-' + x)
    trees.create(x, 1080 - 150, 'tree').setDepth(Phaser.Math.Between(1, 10)).setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
  }


  mushrooms = this.physics.add.staticGroup();
  //Додаємо грибів на всю ширину екрану
  for (var x = 500; x < worldWidth; x = x + Phaser.Math.FloatBetween(400, 1500)) {
    console.log(' x-' + x)
    mushrooms.create(x, 1080 - 150, 'mushroom').setDepth(Phaser.Math.Between(1, 10)).setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
  }




  //додано життя
  powers = this.physics.add.group({
    key: 'power',
    repeat: 10,
    setXY: { x: 1000, y: 50, stepX: 1500 }
  });

  powers.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.setGravityY(300);
  });

  this.physics.add.collider(powers, platforms);
  this.physics.add.overlap(player, powers, collectPower, null, this);
  // Функція для обробки колізії з елементами "power"
  function collectPower(player, power) {
    power.disableBody(true, true);

    if (canMove) {
      // Збільшення "Live" при збиранні елементів
      live += 1;
      liveText.setText('Live: ' + live); // Оновлення тексту "Live"
    }
  }
  // Створення тексту "Live"
  liveText = this.add.text(window.innerWidth - 16, 16, 'Live: 0', { fontSize: '32px', fill: '#000' }).setOrigin(1, 0).setScrollFactor(0);




  const stars = this.physics.add.group({
    key: 'star',
    repeat: 98, // Кількість зірок (змініть за потребою)
    setXY: { x: 250, y: 50, stepX: 70 } // Відстань між зірками (змініть за потребою)
  });


  // Налаштування властивостей зірок
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
  });

  // Колізія зірок з платформами
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  scoreText = this.add.text(200000, 100006, 'Score: 0', { fontSize: '32px', fill: '#000' });


  //додано текст
  this.add.text(540, 50, 'ЗБЕРИ УСІ ЦЕГЛИНКИ ЩОБ ЗБУДУВАТИ БУДИНОК!', { fontFamily: 'Arial', fontSize: 32, color: '#101691' });
  this.add.text(2000, 50, 'ОБЕРЕЖНО! НЕБЕЗПЕКА!', { fontFamily: 'Arial', fontSize: 32, color: '#101691' });
}

//функція збору зірок
function collectStar(player, star) {
  star.disableBody(true, true);
  score += 1;
  scoreText.setText('Score:  ' + score);
  document.getElementById('score').innerHTML = '<h1>Score: ' + score + "/100</h1>";


}




// Оновлення гри
function update() {

  if (cursors.left.isDown) {
    player.setVelocityX(-160); // Рух вліво
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {

    player.setVelocityX(160); // Рух вправо
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0); // Зупинка гравця
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {

    player.setVelocityY(-330); // Пристріл вгору, тільки коли гравець на платформі
  }



}


function showLive() {

  var lifeLine = 'Життя : '

  for (var i = 0; i < life; i++) {
    lifeLine += '❤'


  }
  return lifeLine


}


