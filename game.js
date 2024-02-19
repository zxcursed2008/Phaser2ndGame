var config = {
    type: Phaser.AUTO,
    // Ширина вікна гри
    width: 1920,
    // Висота вікна гри
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            // Гравітація у напрямку y
            gravity: { y: 300 },
            debug: false
        }
    },

    scene: {
        // Функція завантаження ресурсів
        preload: preload,
        // Функція створення об'єктів гри
        create: create,
        // Функція оновлення стану гри
        update: update
    }
};

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('fon', 'assets/fon.png');
}

function create ()
{
    // Додавання зображення неба
    this.add.image( 255, 255, 'fon').setScale(12);
}

function update()
{

}