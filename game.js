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
    
}

function createPlayer() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    // Create player image
    var playerImage = new Image();
    playerImage.src = "assets/player.png"; 
    playerImage.onload = function() {
        // Draw the player image
        context.drawImage(playerImage, 30, canvas.height - 340, 170, 170); 
    };
}



