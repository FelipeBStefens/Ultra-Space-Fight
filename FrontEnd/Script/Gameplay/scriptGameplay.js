import { getSelectedSpaceship } from "./scriptDOM.js";
import EnemySpawner from "../Engine/scriptSpawner.js";
import CollisionManager from "../Engine/scriptCollisionManager.js";
import AssetLoader from "../Engine/scriptAssetLoader.js";
import InputManager from "../Engine/scriptInputManager.js";
import gameOver from "./scriptGameOver.js";
import { values } from "./scriptDOM.js";
import BattleCruiser from "../Models/Bosses/scriptBattleCruiser.js"; 
import SpaceDreadnought from "../Models/Bosses/scriptSpaceDreadnought.js";
import { showBossLifeBar, hideBossLifeBar, updateDefeatedEnemies } from "./scriptDOM.js";
import SoundManager from "../Engine/scriptSoundManager.js"; 
import Explosion from "../Models/Explosion/scriptExplosion.js";
import { ASSETS_IMAGES, GAMEPLAY_SOUNDTRACK, BOSS_GAMEPLAY_SOUNDTRACK } from "../Utils/scriptConstants.js";

SoundManager.initSoundEffects();
SoundManager.playMusic(GAMEPLAY_SOUNDTRACK);

const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

contex.imageSmoothingEnabled = false;

const player = getSelectedSpaceship(canvas);

let input = new InputManager();
let enemies = [];
let bullets = [];
let explosions = [];
let isBossFight = false; 
let currentBoss = null;
let bosses = [];
let bossIndex = 0;
let enemiesDefeated = 0;
const enemiesToDefeatBeforeBoss = 1;

// Efeito de terremoto
let shakeTime = 0;
let shakeIntensity = 0;
let bossMusicStarted = false;

function startShake(durationFrames = 90, intensity = 10) {
    shakeTime = durationFrames;
    shakeIntensity = intensity;
}

function applyShake(context) {
    if (shakeTime > 0) {
        const progress = shakeTime / 90; // normaliza (0–1)
        const currentIntensity = shakeIntensity * progress; // diminui ao longo do tempo
        const dx = (Math.random() - 0.5) * currentIntensity * 2;
        const dy = (Math.random() - 0.5) * currentIntensity * 2;
        context.translate(dx, dy);
        shakeTime--;
    }
}

let collisionManager = new CollisionManager([], explosions, startShake); 
let spawner = new EnemySpawner(canvas, enemies, player);

// create bosses after spawner exists so we can pass it to boss constructors that need it
bosses = [
    new BattleCruiser(200, 20, 20, canvas), // Boss 1
    new SpaceDreadnought(canvas, 200, 30, 30, spawner)  // Boss 2 (needs spawner)
];

// Auto-fire control
let autoFireState = {
    holding: false,
    holdStart: 0,
    lastShot: 0,
    holdDelay: 300, // ms before continuous fire begins
    autoFireInterval: 240, // ms between shots when holding
    nextAutoShot: 0 // timestamp for next auto shot
};

export const gameState = {
    isPaused: false,
    isGameOver: false,
};

const gameLoop = () => {

    if (!gameState.isPaused && !gameState.isGameOver) {
        contex.clearRect(0, 0, canvas.width, canvas.height);

        input.update();

        contex.save();
        applyShake(contex);

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
            // schedule first auto-shot after holdDelay
            autoFireState.nextAutoShot = now + autoFireState.holdDelay;
        }

        if (input.keys.space) {
            if (autoFireState.holding && autoFireState.nextAutoShot) {
                // when time reaches nextAutoShot, fire and schedule next
                if (now >= autoFireState.nextAutoShot) {
                    player.shoot(bullets);
                    autoFireState.nextAutoShot = now + autoFireState.autoFireInterval;
                }
            } else if (!autoFireState.holding) {
                // space is held but we didn't see an edge; initialize schedule
                autoFireState.holding = true;
                autoFireState.nextAutoShot = now + autoFireState.holdDelay;
            }
        } else {
            // released
            autoFireState.holding = false;
            autoFireState.nextAutoShot = 0;
        }

        if (isBossFight) {

            if (currentBoss) {

                if (!bossMusicStarted && shakeTime <= 0) { 
                    SoundManager.playMusic(BOSS_GAMEPLAY_SOUNDTRACK); 
                    bossMusicStarted = true;
                }

                if (currentBoss.introActive || currentBoss.active) {
                    currentBoss.update(player, bullets, canvas);
                    currentBoss.draw(contex);
                }

                if (currentBoss.introActive || currentBoss.active || !currentBoss.finished) {
                    currentBoss.draw(contex);
                }

                if (currentBoss.finished && currentBoss.introActiveEnded) {
                    isBossFight = false;
                    bossIndex = (bossIndex + 1) % bosses.length;

                    SoundManager.playMusic(GAMEPLAY_SOUNDTRACK); 
                    bossMusicStarted = false;

                    // hide boss life bar when fight ends
                    hideBossLifeBar();
                    currentBoss = null;
                    enemiesDefeated = 0;
                }
            }
        } 
        else {

            spawner.update();

            if (enemiesDefeated >= enemiesToDefeatBeforeBoss && !isBossFight) {
                // Garante que só entra aqui uma vez
                isBossFight = true;
                currentBoss = bosses[bossIndex];

                currentBoss.reset();

                // Duração do tremor em frames
                const SHAKE_DURATION = 240; // 120 frames (~2 segundos)

                SoundManager.stopMusic();
                SoundManager.playSound("earthquake"); 
                bossMusicStarted = false;

                // Efeito de terremoto
                startShake(SHAKE_DURATION, 20);

                // Inicia a introdução imediatamente, passando a duração do shake
                currentBoss.startIntro(true, SHAKE_DURATION); 
                showBossLifeBar(currentBoss.name, currentBoss.maxLife);
            }
        }

        bullets.forEach(b => {
            b.update();
            b.draw(contex);
        });

        enemies.forEach(e => {
            e.update(player, bullets, canvas);
            e.draw(contex);
        });

        collisionManager.entities = [player, ...enemies];
        collisionManager.explosions = explosions;
        if (currentBoss) collisionManager.entities.push(currentBoss);
        collisionManager.entities.push(...bullets);
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
            if (!enemies[i].active) {

                const enemy = enemies[i];
                const explosion = new Explosion(
                    enemy.position.x,
                    enemy.position.y,
                    222,
                    259,
                    "enemyExplosion"
                );
                explosions.push(explosion);

                enemies.splice(i, 1);
                updateDefeatedEnemies();
                enemiesDefeated++;
                console.log("Enemy defeated");
            }
        }

        for (let i = explosions.length - 1; i >= 0; i--) {
            const explosion = explosions[i];
            explosion.update();
            explosion.draw(contex);

            if (!explosion.active) {
                explosions.splice(i, 1);
            }
        }

        player.draw(contex);

        contex.restore();
    }
    
    requestAnimationFrame(gameLoop);
}

AssetLoader.preload(ASSETS_IMAGES)
.then(() => {

    window.addEventListener('playerGameOver', () => {
        
        gameState.isGameOver = true;
        
        const user = JSON.parse(localStorage.getItem('user'));
        gameOver(user, values);
        
    }, { once: true });

    gameLoop();
})
.catch(error => {

    alert("The Website could not Load the Assets:", error);
});