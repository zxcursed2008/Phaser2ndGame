// Конфігурація гри
var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
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
var worldWidth = 20000;
var powers; //зміна життів
var life = 5; //початкова кількіть життів
var walkSpeed = 400;
var jumpVelocity = -800;
var fasterFallVelocity = 800; // Змінна для керування швидкістю приземлення
var collectedGems = 0; // Змінна для відстеження кількості зібраних целгинок






// Ініціалізація гри
var game = new Phaser.Game(config);

// Завантаження ресурсів
function preload() {
  this.load.image('ground', 'assets/platform.png'); // Завантаження зображення платформи
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); // Завантаження спрайту гравця
  this.load.image('house', 'assets/house.png'); // Завантаження зображення будинка зломаного
  this.load.image('house2', 'assets/house2.png'); // Завантаження зображення будинка цілого
  this.load.audio('backgroundMusic', 'assets/music.mp3');
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
  this.load.image('bomb', 'assets/bomb.png'); // Завантаження зображення бомби
  this.load.spritesheet('dude2', 'assets/dude.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('dudeleft', 'assets/dudeleft.png', { frameWidth: 32, frameHeight: 32 });
  this.load.image('wall', 'assets/wall.png'); // Завантаження зображення стіни
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
  this.add.image(9500, 740, 'house2').setDepth(0);
  this.add.image(10500, 500, 'wall').setDepth(20);




  //ДОДАНО ВОРОГА 1
  pig2 = this.physics.add.group();
  player2 = this.physics.add.sprite(810, 400, 'dudeleft').setDepth(5).setScale(2);
  player2.setVelocityY(130);
  player2.setVelocityX(180);
  var direction = -1; // Починаємо з руху вліво
  player2.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player2.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player2.setCollideWorldBounds(true);
  player2.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player2.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));







  //ДОДАНО ВОРОГА 2
  player3 = this.physics.add.sprite(1210, 400, 'dudeleft').setDepth(5).setScale(2);
  player3.setVelocityY(180);
  player3.setVelocityX(130);
  var direction = -1; // Починаємо з руху вліво
  player3.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player3.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player3.setCollideWorldBounds(true);
  player3.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player3.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));
 


  //ДОДАНО ВОРОГА 3
  player4 = this.physics.add.sprite(1400, 400, 'dudeleft').setDepth(5).setScale(2);
  player4.setVelocityY(180);
  player4.setVelocityX(130);
  var direction = -1; // Починаємо з руху вліво
  player4.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player4.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player4.setCollideWorldBounds(true);
  player4.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player4.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));


  //ДОДАНО ВОРОГА 4
  player5 = this.physics.add.sprite(1610, 400, 'dudeleft').setDepth(5).setScale(2);
  player5.setVelocityY(180);
  player5.setVelocityX(130);
  var direction = -1; // Починаємо з руху вліво
  player5.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player5.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player5.setCollideWorldBounds(true);
  player5.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player5.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));



  //ДОДАНО ВОРОГА 5
  player6 = this.physics.add.sprite(2000, 400, 'dudeleft').setDepth(5).setScale(2);
  player6.setVelocityY(220);
  player6.setVelocityX(200);
  var direction = -1; // Починаємо з руху вліво
  player6.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player6.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player6.setCollideWorldBounds(true);
  player6.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player6.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));



  //ДОДАНО ВОРОГА 6
  player7 = this.physics.add.sprite(2300, 400, 'dudeleft').setDepth(5).setScale(2);
  player7.setVelocityY(200);
  player7.setVelocityX(200);
  var direction = -1; // Починаємо з руху вліво
  player7.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player7.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player7.setCollideWorldBounds(true);
  player7.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player7.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));


  //ДОДАНО ВОРОГА 7
  player8 = this.physics.add.sprite(2800, 400, 'dudeleft').setDepth(5).setScale(2);
  player8.setVelocityY(200);
  player8.setVelocityX(242);
  var direction = -1; // Починаємо з руху вліво
  player8.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player8.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player8.setCollideWorldBounds(true);
  player8.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player8.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));



  //ДОДАНО ВОРОГА 8
  player9 = this.physics.add.sprite(3000, 400, 'dudeleft').setDepth(5).setScale(2);
  player9.setVelocityY(300);
  player9.setVelocityX(202);
  var direction = -1; // Починаємо з руху вліво
  player9.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player9.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player9.setCollideWorldBounds(true);
  player9.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player9.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));



  //ДОДАНО ВОРОГА 9
  player10 = this.physics.add.sprite(3200, 400, 'dudeleft').setDepth(5).setScale(2);
  player10.setVelocityY(200);
  player10.setVelocityX(200);
  var direction = -1; // Починаємо з руху вліво
  player10.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
  player10.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  player10.setCollideWorldBounds(true);
  player10.setBounce(1);

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function () {
    // Зміна напрямку руху
    direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
    player10.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
  }, Phaser.Math.Between(1000, 35000));




  // Створення гравця головного героя 
  player = this.physics.add.sprite(610, 880, 'dude').setDepth(5).setScale(2);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);





  // Колізія гравця з платформами
  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player2, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player3, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player4, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player5, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player6, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player7, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player8, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player9, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player10, platforms);
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

  player2 = this.physics.add.group();

  this.physics.add.collider(player, player2, hitEnemy, null, this);

  this.physics.add.collider(player, player2, function () { hitEnemy(player, player2); });

  this.physics.add.collider(pig2, player2);



  //Додано статичні платформи 
  for (var x = 0; x < 9000; x = x + Phaser.Math.Between(600, 800)) {
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
  for (var x = 900; x < 9000; x = x + Phaser.Math.FloatBetween(400, 1500)) {
    console.log(' x-' + x)
    bushes.create(x, 1080 - 150, 'bush').setDepth(Phaser.Math.Between(1, 10)).setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
  }

  trees = this.physics.add.staticGroup();
  //Додаємо дерев на всю ширину екрану
  for (var x = 900; x < 9000; x = x + Phaser.Math.FloatBetween(400, 2500)) {
    console.log(' x-' + x)
    trees.create(x, 1080 - 150, 'tree').setDepth(Phaser.Math.Between(1, 10)).setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
  }


  mushrooms = this.physics.add.staticGroup();
  //Додаємо грибів на всю ширину екрану
  for (var x = 500; x < 9000; x = x + Phaser.Math.FloatBetween(400, 1500)) {
    console.log(' x-' + x)
    mushrooms.create(x, 1080 - 150, 'mushroom').setDepth(Phaser.Math.Between(1, 10)).setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody();
  }


  walls = this.physics.add.staticGroup({
    key: 'wall',
    setXY: { x: 10500, y: 500, stepX: 1500 }

  });

  this.physics.add.collider(walls, player);
  this.physics.add.collider(walls, player2);
  this.physics.add.collider(walls, player3);
  this.physics.add.collider(walls, player4);
  this.physics.add.collider(walls, player5);
  this.physics.add.collider(walls, player6);
  this.physics.add.collider(walls, player7);
  this.physics.add.collider(walls, player8);
  this.physics.add.collider(walls, player9);
  this.physics.add.collider(walls, player10);






  //додано життя
  powers = this.physics.add.group({
    key: 'power',
    repeat: 12,
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
      life += 2;
      liveText.setText(showLife()); // Оновлення тексту "Live"
    }
  }
  // Створення тексту "Live"
  liveText = this.add.text(window.innerWidth - 16, 16, 'Кількість життів: 5', { fontSize: '32px', fill: '#000' }).setOrigin(1, 0).setScrollFactor(0);




  const stars = this.physics.add.group({
    key: 'star',
    repeat: 101, // Кількість зірок (змініть за потребою)
    setXY: { x: 250, y: 50, stepX: 70 } // Відстань між зірками (змініть за потребою)
  });


  // Налаштування властивостей зірок
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
    child.setGravityY(300); // Додаємо гравітацію для падіння зірок
  });

  // Колізія зірок з платформами
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  scoreText = this.add.text(200000, 100006, 'Кількість зібраних цеглинок: 0', { fontSize: '32px', fill: '#000' });



  //додано текст
  this.add.text(540, 50, 'ЗБЕРИ УСІ ЦЕГЛИНКИ ЩОБ ЗБУДУВАТИ БУДИНОК!', { fontFamily: 'Arial', fontSize: 32, color: '#101691' });
  this.add.text(9200, 50, 'ВІТАЮ ВИ ЗБУДУВАЛИ БУДИНОК!', { fontFamily: 'Arial', fontSize: 32, color: '#101691' });
}

//функція збору зірок
function collectStar(player, star) {
  star.disableBody(true, true);
  score += 1;
  scoreText.setText('Кількість зібраних цеглинок:  ' + score);
  document.getElementById('score').innerHTML = '<h1>Кількість зібраних цеглинок: ' + score + "/100</h1>";
  createBomb.call(this, star); // Виклик функції для створення бомби


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


  // Обробник клавіш для руху вліво та вправо
  if (cursors.left.isDown) {
    player.setVelocityX(-walkSpeed); // Рух вліво
    player.anims.play('left', true); // Запуск анімації руху вліво
  } else if (cursors.right.isDown) {
    player.setVelocityX(walkSpeed); // Рух вправо
    player.anims.play('right', true); // Запуск анімації руху вправо
  } else {
    player.setVelocityX(0); // Зупинка гравця, якщо жодна з клавіш не натиснута
    player.anims.play('turn'); // Запуск анімації стоячого стану
  }



  // Керування швидкістю приземлення
  if (!player.body.touching.down) {
    // Якщо гравець не торкається платформи знизу (знаходиться у повітрі)
    player.setGravityY(fasterFallVelocity); // Встановлення швидкості приземлення
  } else {
    // Якщо гравець торкається платформи знизу (на землі)
    // Скидання швидкості приземлення до значення за замовчуванням (якщо потрібно)
    player.setGravityY(300); // Значення за замовчуванням, можна змінити за необхідності
  }



  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(jumpVelocity); // Встановлення швидкості прижка, якщо гравець торкається платформи знизу
  }



}

function createBomb(star) {
  // Створення бомби під час збору зірки
  var bomb = this.physics.add.image(star.x, star.y - 900, 'bomb').setGravityY(300); // Змінені координати для з'явлення бомби зверху
  this.physics.add.collider(bomb, platforms, function (bomb, platform) {
    bomb.setVelocityY(-600); // Задайте вектор швидкості у протилежному напрямку від вертикальної швидкості платформи
  });
  // Задання горизонтальної швидкості бомби
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // Випадково вибираємо напрямок (-1 або 1)
  var horizontalSpeed = Phaser.Math.Between(100, 200) * direction; // Горизонтальна швидкість
  bomb.setVelocityX(horizontalSpeed);

  // Зміна напрямку бомб, якщо вона зіштовхується з верхніми платформами
  this.physics.add.collider(bomb, platforms, function (bomb, platform) {
    bomb.setVelocityX(-bomb.body.velocity.x); // Змінюємо напрямок бомби, віднімаючи її поточну горизонтальну швидкість
  });
  bomb.setCollideWorldBounds(true);
  bomb.setBounce(1);
  this.physics.add.collider(player, bomb, function () { hitBomb(player, bomb); }); // Додайте колізію гравця з бомбою та обробник
}




// Функція обробки зіткнення гравця з бомбою
function hitBomb(player, bomb) {
  life -= 1;
  liveText.setText(showLife());
  console.log('boom');
  player.anims.play('turn');
  if (life === 0) {

    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
  }
}


function hitEnemy(player, player2) {

  life -= 3;
  liveText.setText(showLife());
  console.log('boom');
}


function refreshBody() {
  console.log('game over')
  this.scene.restart();
};



// Функція для відображення кількості життів
function showLife() {
  var lifeLine = 'Кількість життів:';
  for (var i = 0; i < life; i++) {
    lifeLine += '💕';
  }
  return lifeLine;

}



function gameOver() {
  console.log('Гра закінчилася!');

}



// Функція перезапуску гри
function restartGame() {
  // Перезапуск гри лише у випадку, якщо гра завершилася
  if (gameOver) {


    // Перезапуск гри
    this.scene.restart();

    // Скидання рахунку та статусу завершення гри
    score = 0;
    gameOver = false;

    // Оновлення відображення рахунку
    scoreText.setText('Кількість зібраних цеглинок: ' + score);

    // Приховання вікна з повідомленням про кінець гри
    document.getElementById('gameOverWindow').style.display = 'none';


  }


}


