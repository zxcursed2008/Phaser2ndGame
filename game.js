


window.onload = function() {
    createBackground(); 
    createPlatforms(); 
    createPlayer(); 
};
  
function createBackground() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
  
    // Create background image
    var backgroundImage = new Image();
    backgroundImage.src = "assets/fon.png"; 
    backgroundImage.onload = function() {
        // Draw the background image
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
}

function createPlatforms() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
  
    // Завантаження зображення платформи
    var platformImage = new Image();
    platformImage.src = "assets/platform.png"; // Шлях до зображення платформи
    platformImage.onload = function() {
        // Малювання платформи вздовж нижнього краю канвасу
        var platformY = 815; // Y-координата для платформи
        var platformX = 0; // X-координата для платформи (починається зліва)
  
        // Малювання платформи доки вона не покриє весь канвас
        while (platformX < canvas.width) {
            context.drawImage(platformImage, platformX, platformY);
            platformX += platformImage.width; // Переміщення вправо для наступної платформи

            var houseImage = new Image();
        houseImage.src = "assets/broken-house.png"; // Шлях до зображення будинку
        houseImage.onload = function() {
            // Розміщення будинку на першій платформі
            var houseX = 1200; // X-координата для будинку
            var houseY = 375; // Y-координата для будинку (розміщення зверху платформи)
            context.drawImage(houseImage, houseX, houseY);
        };
    };
}
}



function createPlayer() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    // Create player image
    var playerImage = new Image();
    playerImage.src = "assets/player.png"; 
    playerImage.onload = function() {
        // Draw the player image
        context.drawImage(playerImage, 30, canvas.height - 410, 170, 170); 
    };
}








