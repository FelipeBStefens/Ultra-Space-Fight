import Player from "../Models/scriptPlayer.js";

const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const speed = 5;

contex.imageSmoothingEnabled = false;

const player = new Player(canvas, speed);

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false,
    space: false
};

const bullets = [];
const bulletImage = new Image();
bulletImage.src = "../../Assets/PixelArts/shit.png";

const gameLoop = () => {
    contex.clearRect(0, 0, canvas.width, canvas.height);
    
    if (keys.left && player.position.x > 0) {
        player.moveLeft();
    }
    if (keys.right && player.position.x < canvas.width - player.width) {
        player.moveRight();
    }
    if (keys.up && player.position.y > 0) {
        player.moveUp();
    }
    if (keys.down && player.position.y < canvas.height - player.height) {
        player.moveDown();
    }
    if (keys.rotateLeft) {
        player.rotateLeft();
    }
    if (keys.rotateRight) {
        player.rotateRight();
    }

    bullets.forEach((b, i) => {
        b.update();
        b.draw(contex);

        if (b.position.x < 0 || b.position.x > canvas.width ||
            b.position.y < 0 || b.position.y > canvas.height) {
            bullets.splice(i, 1);
        }
    });

    player.draw(contex);
    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "w") {
        keys.up = true;
    }
    if (key === "s") {
        keys.down = true;
    }
    if (key === "a") {
        keys.left = true;
    }
    if (key === "d") { 
        keys.right = true;
    }
    if (key === "q") {
        keys.rotateLeft = true;
    }
    if (key === "e") {
        keys.rotateRight = true;
    }
    if (key === " ") {
        keys.space = true;
        player.shoot(bullets, bulletImage);
    }
});

window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "w") {
        keys.up = false;
    }
    if (key === "s") {
        keys.down = false;
    }
    if (key === "a") {
        keys.left = false;
    }
    if (key === "d") { 
        keys.right = false;
    }
    if (key === "q") {
        keys.rotateLeft = false;
    }
    if (key === "e") {
        keys.rotateRight = false;
    }
    if (key === " ") {
        keys.space = false;
    }
});