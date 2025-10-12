import { getSelectedSpaceship } from "./scriptDOM.js";
import EnemySpawner from "./scriptSpawner.js";
import CollisionManager from "./scriptCollisionManager.js";

const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

contex.imageSmoothingEnabled = false;

const player = getSelectedSpaceship(canvas);

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false,
    space: false
};

let enemies = [];
let bullets = [];

let collisionManager = new CollisionManager([]); 
let spawner = new EnemySpawner(canvas, enemies, player);

const gameLoop = () => {
    contex.clearRect(0, 0, canvas.width, canvas.height);
    
    spawner.update();
    
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

    bullets.forEach(b => {
        b.update();
        b.draw(contex);
    });

    enemies.forEach(e => {
        e.update(player, bullets, canvas);
        e.draw(contex);
    });

    collisionManager.entities = [player, ...enemies, ...bullets];
    collisionManager.update();

    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        if (!b.active ||
            b.position.x < 0 || b.position.x > canvas.width ||
            b.position.y < 0 || b.position.y > canvas.height) {
            bullets.splice(i, 1);
        }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].active) enemies.splice(i, 1);
    }

    [ player, ...enemies, ...bullets ].forEach(obj => drawCollisionCircle(contex, obj));
    
    player.draw(contex);
    requestAnimationFrame(gameLoop);
}

function drawCollisionCircle(ctx, obj) {
  ctx.beginPath();
  ctx.arc(obj.position.x + obj.width / 2, obj.position.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 0, 0, 1)";
  ctx.stroke();
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
        player.shoot(bullets);
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