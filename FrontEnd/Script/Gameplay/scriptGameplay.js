// Import Manager Classes and Utilities;
import EnemySpawner from "../Engine/scriptSpawner.js";
import CollisionManager from "../Engine/scriptCollisionManager.js";
import AssetLoader from "../Engine/scriptAssetLoader.js";
import InputManager from "../Engine/scriptInputManager.js";
import gameOver from "./scriptGameOver.js"; // The game-ending function;
import { values, getSelectedSpaceship } from "./scriptHeadsUpDisplay.js"; // Game metrics and player factory;
import BattleCruiser from "../Models/Bosses/scriptBattleCruiser.js"; 
import SpaceDreadnought from "../Models/Bosses/scriptSpaceDreadnought.js";
import SoundManager from "../Engine/scriptSoundManager.js"; 
import { ASSETS_IMAGES } from "../Utils/scriptConstants.js";
import ShakeEffect from "../Engine/scriptShakeEffect.js";
import PhysicsManager from "../Engine/scriptPhysicsManager.js";
import EntityManager from "../Engine/scriptEntityManager.js";
import GameManager from "../Engine/scriptGameManager.js"; // The central state controller;

// Initial Setup and User Check;
const user = JSON.parse(localStorage.getItem("user"));
// Redirects unauthenticated users to the login/enter page;
if (!user) window.location.href = "../../enter.html";

// Initialize sound effects globally before the game starts;
SoundManager.initSoundEffects();

// Get canvas context and set dimensions;
const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ensures pixel art remains sharp by disabling image smoothing;
contex.imageSmoothingEnabled = false;

// Create the player object based on user's selection/data;
const player = getSelectedSpaceship(canvas);
const shakeEffect = new ShakeEffect();
const physicsManager = new PhysicsManager(canvas);

// Initializes the Entity Manager, giving it the canvas bounds and the main player object;
EntityManager.init(canvas, player);

// Instantiates the Input Manager;
let input = new InputManager();

// CollisionManager is instantiated, giving it an empty array of entities;
let collisionManager = new CollisionManager([], () => shakeEffect.startShake()); 
let spawner = new EnemySpawner(canvas);

// Initializes the Game Manager with the sequence of boss fights;
GameManager.initBosses([
    new BattleCruiser(10000, 20, 20, canvas), 
    new SpaceDreadnought(canvas, 20000, 30, 30, spawner)
]);

// The Game Loop
const gameLoop = () => {

    // Only run game logic if the game is not paused or over;
    if (!GameManager.isPaused && !GameManager.isGameOver) {
        
        // Starts a new frame;
        contex.clearRect(0, 0, canvas.width, canvas.height);
        
        // Polls current input states;
        input.update();

        contex.save();

        // Applies the screen shake offset to the entire canvas context;
        shakeEffect.applyShake(contex);
        
        //  Translates input state into player actions;
        input.applyInputs(canvas);

        // Handles boss spawning logic and fight transitions;
        GameManager.update(spawner, shakeEffect);

        //  Updates state and cleans up inactive entities;
        EntityManager.updateEntity();
        EntityManager.removeEntity();

        //  Updates the Collision Manager's list with the latest active entities;
        collisionManager.entities = EntityManager.getAllEntities();
        
        // The current boss is often added separately as it might be handled differently (e.g., custom hitbox);
        if (GameManager.currentBoss) {
            collisionManager.entities.push(GameManager.currentBoss);
        }
        
        // Collision Detection and Resolution;
        collisionManager.update();
          
        // Applies velocity to position, damping, and boundary clamping;
        physicsManager.applyPhysics();

        // Boss is drawn before other entities;
        if (GameManager.isBossFight && GameManager.currentBoss) {
            GameManager.currentBoss.draw(contex);
        }

        // Draws all standard entities;
        EntityManager.drawEntity(contex);
        // Restores the canvas context, removing the screen shake offset for the next frame;
        contex.restore();
    }
    
    // Request the next animation frame, maintaining the loop;
    requestAnimationFrame(gameLoop);
}

// Asset Loading and Game Start;
AssetLoader.preload(ASSETS_IMAGES)
.then(() => {

    // Setup Game Over listener: The player object or another entity should dispatch this event 
    // when the player's health reaches zero;
    window.addEventListener('playerGameOver', () => {
        
        // Sets the static state flag;
        GameManager.isGameOver = true; 
        
        // Calls the game over screen function;
        gameOver(values); 
        
    }, { once: true }); // Ensures the listener is only executed once;

    // Start the game loop only after all assets are loaded;
    gameLoop();
})
.catch(error => {
    console.log(error);
    alert("The Website could not Load the Assets:", error);
});