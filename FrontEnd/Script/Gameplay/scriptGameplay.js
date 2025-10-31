import EnemySpawner from "../Engine/scriptSpawner.js";
import CollisionManager from "../Engine/scriptCollisionManager.js";
import AssetLoader from "../Engine/scriptAssetLoader.js";
import InputManager from "../Engine/scriptInputManager.js";
import gameOver from "./scriptGameOver.js";
import { values, getSelectedSpaceship, showBossLifeBar, hideBossLifeBar, updateDefeatedEnemies } from "./scriptHeadsUpDisplay.js";
import BattleCruiser from "../Models/Bosses/scriptBattleCruiser.js"; 
import SpaceDreadnought from "../Models/Bosses/scriptSpaceDreadnought.js";
import SoundManager from "../Engine/scriptSoundManager.js"; 
import { ASSETS_IMAGES, GAMEPLAY_SOUNDTRACK, BOSS_GAMEPLAY_SOUNDTRACK } from "../Utils/scriptConstants.js";
import ShakeEffect from "../Engine/scriptShakeEffect.js";
import PhysicsManager from "../Engine/scriptPhysicsManager.js";
import EntityManager from "../Engine/scriptEntityManager.js";

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../../enter.html";

SoundManager.initSoundEffects();
SoundManager.playMusic(GAMEPLAY_SOUNDTRACK);

const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

contex.imageSmoothingEnabled = false;

const player = getSelectedSpaceship(canvas);
const shakeEffect = new ShakeEffect();
const physicsManager = new PhysicsManager(canvas);
EntityManager.init(canvas, player);

let input = new InputManager();
let isBossFight = false; 
let currentBoss = null;
let bosses = [];
let bossIndex = 0;
const enemiesToDefeatBeforeBoss = 1;

// Efeito de terremoto
let bossMusicStarted = false;
let collisionManager = new CollisionManager([], () => shakeEffect.startShake()); 
let spawner = new EnemySpawner(canvas);

// create bosses after spawner exists so we can pass it to boss constructors that need it
bosses = [
    new BattleCruiser(200, 20, 20, canvas), // Boss 1
    new SpaceDreadnought(canvas, 200, 30, 30, spawner)  // Boss 2 (needs spawner)
];

export const gameState = {
    isPaused: false,
    isGameOver: false,
};

const gameLoop = () => {

    if (!gameState.isPaused && !gameState.isGameOver) {
        contex.clearRect(0, 0, canvas.width, canvas.height);

        input.update();

        contex.save();
        shakeEffect.applyShake(contex);

        input.applyInputs(canvas);

        if (isBossFight) {

            if (currentBoss) {

                if (!bossMusicStarted && shakeEffect.shakeTime <= 0) { 
                    SoundManager.playMusic(BOSS_GAMEPLAY_SOUNDTRACK); 
                    bossMusicStarted = true;
                }

                if (currentBoss.introActive || currentBoss.active) {
                    currentBoss.update();
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
                    EntityManager.enemiesDefeated = 0;
                }
            }
        } 
        else {

            spawner.update();

            if (EntityManager.enemiesDefeated >= enemiesToDefeatBeforeBoss && !isBossFight) {
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
                shakeEffect.startShake(SHAKE_DURATION, 20);

                // Inicia a introdução imediatamente, passando a duração do shake
                currentBoss.startIntro(true, SHAKE_DURATION); 
                showBossLifeBar(currentBoss.name, currentBoss.maxLife);
            }
        }

        EntityManager.updateEntity();
        EntityManager.removeEntity();

        collisionManager.entities = EntityManager.getAllEntities();
        if (currentBoss) {
            collisionManager.entities.push(currentBoss);
        }
        collisionManager.update();
         
        physicsManager.applyPhysics();

        EntityManager.drawEntity(contex);
        contex.restore();
    }
    
    requestAnimationFrame(gameLoop);
}

AssetLoader.preload(ASSETS_IMAGES)
.then(() => {

    window.addEventListener('playerGameOver', () => {
        
        gameState.isGameOver = true;
        
        gameOver(values);
        
    }, { once: true });

    gameLoop();
})
.catch(error => {
    console.log(error);
    alert("The Website could not Load the Assets:", error);
});