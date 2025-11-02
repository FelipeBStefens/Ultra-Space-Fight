// Imports the base Boss class;
import Boss from "./scriptBoss.js";
// Imports the constant string path for the Space Dreadnought image asset;
import { SPACE_DREADNOUGHT_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the standard bullet type used by the boss;
import FrontBullet from "../Bullets/scriptFrontBullet.js";
// Imports math utilities: scalarLerp for smooth interpolation, getPercentOf for positioning, 
// and vector utilities for aiming;
import { scalarLerp, getPercentOf, getCenterVector, getDifferentialVectorByObject, updateAngle } from "../../Utils/scriptMath.js";
// Imports the EntityManager for managing game entities (like the player and bullets);
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the SpaceDreadnought class, specializing the Boss with intro and phase mechanics;
class SpaceDreadnought extends Boss{

    enemySpawner; // Reference to the game's EnemySpawner utility;

    shootCooldown = 100; // Initial shooting delay (frames);
    spawnCooldown = 300; // Initial enemy spawning delay (frames);
    
    // Constructor initializes the Dreadnought's size, position, and components;
    constructor(canvas, life, cash, score, enemySpawner) {
        
        // Calculates the height based on a fixed aspect ratio and the canvas width;
        const aspectRatio = 1677 / 605;
        const width = canvas.width;
        const height = width / aspectRatio;
        
        // Calls the parent Boss constructor; 
        super(0, -canvas.height * 0.3, width, height, 0, life, cash, score, "Space Dreadnought");
    
        // Intro and Animation Setup;
        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0; // Progress from 0 (start) to 1 (end);
        this.targetY = -this.height / 2; // Final resting Y position (centered vertically on screen);
        this.isShaking = false;    
        this.shakeTimer = 0;

        // Stores the reference to the spawner and sets the image path;
        this.enemySpawner = enemySpawner;
        this.imagePath = SPACE_DREADNOUGHT_IMAGE;
    }

    // Initiates the boss's entrance sequence;
    startIntro(withShake = false, shakeDuration = 0) {
        this.introActive = true;
        this.introActiveEnded = false;
        this.introProgress = 0;

        // Defines the starting Y position (completely off-screen, above);
        this.startY = -this.height; 
        this.endY = this.targetY; // Defines the final Y position;

        // Sets the initial Y position for the smooth transition;
        this.position.y = this.startY;
        this.active = true; // Set active so update runs, but combat logic is blocked by introActive;

        // Logic to activate pre-introduction screen tremor;
        if (withShake) {
            this.isShaking = true;
            this.shakeTimer = shakeDuration; 
        }
    }

    // Overrides the base update method to handle introduction, movement, and combat logic;
    update() {

        const player = EntityManager.player;

        // Screen Shake Timer (Prevents movement/intro during pre-combat shake);
        if (this.isShaking) {
            this.shakeTimer--;
            if (this.shakeTimer <= 0) {
                this.isShaking = false; 
            }
            return; 
        }

        // Introduction Phase (Smooth entrance using Linear Interpolation);
        if (this.introActive) {
            const introSpeed = 0.005; // Rate of progress increase per frame;
            this.introProgress = Math.min(1, this.introProgress + introSpeed);

            // Smoothly moves the boss from startY to endY based on introProgress;
            this.position.y = scalarLerp(this.startY, this.endY, this.introProgress);

            // Checks if the intro is complete;
            if (this.introProgress >= 1) {
                this.introActive = false;
                this.introActiveEnded = true;
                this.active = true; // Fully activate combat logic;
                this.position.y = this.endY; // Ensures final position is exact;
            }
            return; // Block combat logic during introduction;
        }

        // Combat Phase;
        if (this.active) {
            // Dynamically updates the boss's combat parameters based on remaining health;
            this.updatePhase(); 

            // Shooting Logic:
            if (this.shootCooldown <= 0) {
                this.shoot(player); 
                this.shootCooldown = this.shootInterval; // Reset cooldown based on current phase interval;
            }
            this.shootCooldown--; 

            // Enemy Spawning Logic:
            if (this.spawnCooldown <= 0) {
                this.spawnEnemies(); 
                this.spawnCooldown = this.spawnInterval; // Reset cooldown based on current phase interval;
            }
            this.spawnCooldown--;
        }
    }

    // Dynamically sets the boss's difficulty parameters based on remaining life percentage;
    updatePhase() {
        const lifePercent = this.life / this.maxLife; 
        
        if (lifePercent > 0.7) {
            this.phase = "initial";
            this.shootInterval = 200; // Slower shooting;
            this.spawnInterval = 450; // Slower spawning;
            this.spawnTypes = ["scoutEnemy", "soldierEnemy"]; // Easier enemies;
        }
        else if (lifePercent > 0.2) {
            this.phase = "conflict";
            this.shootInterval = 120; // Moderate shooting;
            this.spawnInterval = 300; // Moderate spawning;
            this.spawnTypes = ["scoutEnemy", "soldierEnemy", "tankEnemy"]; // Increased enemy variety;
        }
        else {
            this.phase = "desperate";
            this.shootInterval = 80; // Fast shooting;
            this.spawnInterval = 150; // Fast spawning;
            this.spawnTypes = ["scoutEnemy", "soldierEnemy", "tankEnemy", "eliteEnemy"]; // Hardest enemies;
        }
    }

    // Implements the boss's firing pattern;
    shoot(player) {

        // Defines the normalized positions of the two turrets (relative to the boss image);
        const turretPercents = [
            {x: 25.00, y: 70.0}, // Left turret
            {x: 75.00, y: 70.0}  // Right turret
        ];

        turretPercents.forEach(percent => {

            // Calculates the absolute (x, y) coordinates of the turret on the screen;
            const turretX = this.position.x + getPercentOf(this.width, percent.x);
            const turretY = this.position.y + getPercentOf(this.height, percent.y);

            // Aims the turret at the center of the player:
            const centerPosition = getCenterVector(player.position, player.width, player.height);
            // Calculates the vector from the turret to the player's center;
            const differentialVector = getDifferentialVectorByObject({x: centerPosition.x, y: centerPosition.y}, {objectX: turretX, objectY: turretY}); 

            // Calculates the angle required to point the bullet at the player;
            const angle = updateAngle(differentialVector);
            
            // Debugging outputs (console.log...);
            
            const bulletSpeed = 10;
            // Creates a bullet fired from the turret position, aimed directly at the player;
            const frontBullet = new FrontBullet(turretX, turretY, angle, bulletSpeed, "boss");
            
            EntityManager.addBullet(frontBullet);
        });
    }

    // Handles the boss's unique ability to spawn enemies;
    spawnEnemies() {
        let positions;

        // Defines fixed spawning positions (relative to the Boss) based on the current phase;
        if (this.phase === "initial") {
            positions = [
                {x: 0.45, y: 0.75} // Single spawn point;
            ];
        } else if (this.phase === "conflict") {
            positions = [
                {x: 0.3, y: 0.7},
                {x: 0.5, y: 0.75},
                {x: 0.7, y: 0.7} // Three spawn points;
            ];
        } else { // desperate
            positions = [
                {x: 0.2, y: 0.7},
                {x: 0.4, y: 0.75},
                {x: 0.6, y: 0.7},
                {x: 0.8, y: 0.75},
                {x: 0.5, y: 0.8} // Five spawn points (most intense);
            ];
        }

        // Spawns enemies at the defined positions:
        positions.forEach(pos => {
            // Chooses an enemy type randomly from the types available in the current phase;
            const type = this.spawnTypes[Math.floor(Math.random() * this.spawnTypes.length)];
            // Calls the spawner utility to create the enemy at the calculated position;
            this.enemySpawner.spawnEnemyAt(type, this, pos.x, pos.y);
        });
    }
}

// Exports the SpaceDreadnought class;
export default SpaceDreadnought;