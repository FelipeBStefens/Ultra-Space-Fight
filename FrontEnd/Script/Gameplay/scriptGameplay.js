import { getSelectedSpaceship } from "./scriptDOM.js";
import EnemySpawner from "./scriptSpawner.js";
import CollisionManager from "./scriptCollisionManager.js";
import SpaceDreadnought from "../Models/Bosses/scriptSpaceDreadnought.js";
import AssetLoader from "./scriptAssetLoader.js";
import * as PATHS from "./scriptConstants.js";
import InputManager from "./scriptInputManager.js";
 
const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

contex.imageSmoothingEnabled = false;

const player = getSelectedSpaceship(canvas);

let input = new InputManager();
let enemies = [];
let bullets = [];

let collisionManager = new CollisionManager([]); 
let spawner = new EnemySpawner(canvas, enemies, player);

let spaceDreadnought = new SpaceDreadnought(canvas, 10, 10, 10, spawner); 
// Auto-fire control
let autoFireState = {
    holding: false,
    holdStart: 0,
    lastShot: 0,
    holdDelay: 300, // ms before continuous fire begins
    autoFireInterval: 120 // ms between shots when holding
};

const gameLoop = () => {
    contex.clearRect(0, 0, canvas.width, canvas.height);

    input.update();

    if (input.keys.left && player.position.x > 0) player.moveLeft();
    if (input.keys.right && player.position.x < canvas.width - player.width) player.moveRight();
    if (input.keys.up && player.position.y > 0) player.moveUp();
    if (input.keys.down && player.position.y < canvas.height - player.height) player.moveDown();

    // --- Rotação (por botões Q/E ou LB/RB) ---
    if (input.keys.rotateLeft) player.rotateLeft();
    if (input.keys.rotateRight) player.rotateRight();

    // --- Tiro (Espaço ou ZR/R2/RT): single on press, continuous when held ---
    const now = Date.now();
    if (input.keys.spacePressed) {
        // immediate single shot on press
        player.shoot(bullets);
        autoFireState.holding = true;
        autoFireState.holdStart = now;
        autoFireState.lastShot = now;
    }

    if (input.keys.space) {
        // if still holding and hold delay passed, fire at interval
        if (autoFireState.holding) {
            if (now - autoFireState.holdStart >= autoFireState.holdDelay) {
                if (now - autoFireState.lastShot >= autoFireState.autoFireInterval) {
                    player.shoot(bullets);
                    autoFireState.lastShot = now;
                }
            }
        } else {
            // if space becomes held without edge (rare), initialize holding state
            autoFireState.holding = true;
            autoFireState.holdStart = now;
            autoFireState.lastShot = now;
        }
    } else {
        // released
        autoFireState.holding = false;
    }

    bullets.forEach(b => {
        b.update();
        b.draw(contex);
    });

    enemies.forEach(e => {
        e.update(player, bullets, canvas);
        e.draw(contex);
    });

    spaceDreadnought.draw(contex);
    spaceDreadnought.update(player, bullets);

    collisionManager.entities = [player, spaceDreadnought,  ...enemies, ...bullets];
    collisionManager.update();

    // Integrate repulsion velocities for player and enemies (simple impulse integration + damping)
    const integrateEntities = [player, ...enemies];
    integrateEntities.forEach(ent => {
        if (ent.vx || ent.vy) {
            // apply small movement from impulse
            ent.position.x += ent.vx;
            ent.position.y += ent.vy;

            // damping - reduce velocity gradually (lower damping => bouncier)
            ent.vx *= 0.75;
            ent.vy *= 0.75;

            // clamp tiny velocities to zero
            if (Math.abs(ent.vx) < 0.01) ent.vx = 0;
            if (Math.abs(ent.vy) < 0.01) ent.vy = 0;
            
            // Prevent entities (especially the player) from leaving the canvas due to impulses
            const minX = 0;
            const minY = 0;
            const maxX = canvas.width - ent.width;
            const maxY = canvas.height - ent.height;

            // clamp X
            if (ent.position.x < minX) {
                ent.position.x = minX;
                if (ent.vx < 0) ent.vx = 0; // stop outward velocity
            } else if (ent.position.x > maxX) {
                ent.position.x = maxX;
                if (ent.vx > 0) ent.vx = 0;
            }

            // clamp Y
            if (ent.position.y < minY) {
                ent.position.y = minY;
                if (ent.vy < 0) ent.vy = 0;
            } else if (ent.position.y > maxY) {
                ent.position.y = maxY;
                if (ent.vy > 0) ent.vy = 0;
            }
        }
    });

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

    player.draw(contex);
    requestAnimationFrame(gameLoop);
}

// Build assets list from known constants and start after preload
const assets = [
    PATHS.PATH_STANDART_SHIP_IMAGE,
    PATHS.PATH_SPEED_SHIP_IMAGE,
    PATHS.PATH_DESTROYER_SHIP_IMAGE,
    PATHS.PATH_FREIGHTER_SHIP_IMAGE,
    PATHS.PATH_ELITE_SHIP_IMAGE,
    PATHS.PATH_SCOUT_ENEMY_IMAGE,
    PATHS.PATH_SOLDIER_ENEMY_IMAGE,
    PATHS.PATH_TANK_ENEMY_IMAGE,
    PATHS.PATH_ELITE_ENEMY_IMAGE,
    PATHS.PATH_SPACE_DREADNOUGHT_IMAGE,
    PATHS.PATH_BATTLE_CRUISER_IMAGE,
    PATHS.PATH_BULLET_IMAGE
].filter(Boolean);

AssetLoader.preload(Array.from(new Set(assets)), (progress) => {
    // optional: show loading progress if you have a UI element
    // console.log(`Loading assets: ${(progress * 100).toFixed(0)}%`);
}).then(() => {
    console.log("✅ Todos os assets carregados!");
    gameLoop();
}).catch(err => {
    console.error("Falha ao pré-carregar assets:", err);
    // still start the loop to allow fallback visuals
    gameLoop();
});