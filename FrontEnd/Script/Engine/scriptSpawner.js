// Imports all specific enemy classes;
import ScoutEnemy from "../Models/Enemies/scriptScoutEnemy.js";
import SoldierEnemy from "../Models/Enemies/scriptSoldierEnemy.js";
import TankEnemy from "../Models/Enemies/scriptTankEnemy.js";
import EliteEnemy from "../Models/Enemies/scriptEliteEnemy.js";
// Imports the Entity Manager for adding new enemies to the game loop;
import EntityManager from "./scriptEntityManager.js";
// Imports math utilities for vector calculations and clamping (used in boss spawning logic);
import { getCenterVector, getDifferentialVectorByObject, getVectorMagnitude, clamp } from "../Utils/scriptMath.js";

// Defines the EnemySpawner class, responsible for generating and placing enemy objects;
class EnemySpawner {

    // Properties;
    canvas;             
    spawnInterval;      
    lastSpawnTime;      
    limitEnemies;       

    // Constructor initializes the spawner's state;
    constructor(canvas) {
        this.canvas = canvas;

        this.limitEnemies = 10;     // Sets the maximum enemy capacity;
        this.spawnInterval = 5000;  // Sets the default spawn rate (5 seconds);
        this.lastSpawnTime = Date.now();
    }

    // Main update loop for the automatic spawn system;
    update() {
        const now = Date.now();

        // Checks if the time elapsed since the last spawn is greater than the interval;
        if (now - this.lastSpawnTime >= this.spawnInterval) {
            this.spawnEnemy(); // Triggers a new automatic spawn;
            this.lastSpawnTime = now;
        }
    }

    // Handles the automatic, random enemy spawn;
    spawnEnemy() {

        // Enforces the enemy limit;
        if (EntityManager.enemies.length >= this.limitEnemies) {
            return;
        }

        // Choose Enemy Type;
        const enemyType = this.getRandomEnemyType();

        // Selects a random position outside the canvas boundary;
        const { x, y } = this.getSpawnPosition();

        // Creates the enemy instance based on the type;
        let enemy;
        if (enemyType === "scoutEnemy") {
            enemy = new ScoutEnemy({x, y});
        }
        else if (enemyType === "soldierEnemy") {
            enemy = new SoldierEnemy({x, y});
        }
        else if (enemyType === "tankEnemy") {
            enemy = new TankEnemy({x, y});
        }
        else if (enemyType === "eliteEnemy") {
            enemy = new EliteEnemy({x, y});
        }

        // Adds the newly created enemy to the game loop;
        EntityManager.addEnemy(enemy);
    }

    // Uses random number generation to determine the enemy type based on fixed percentages (weighted spawn);
    getRandomEnemyType() {
        const rand = Math.random();

        // Defines the probability distribution:
        if (rand < 0.35) return "scoutEnemy";   // 35% chance (Scout)
        else if (rand < 0.65) return "soldierEnemy"; // 30% chance (Soldier, from 0.35 to 0.65)
        else if (rand < 0.95) return "tankEnemy";    // 30% chance (Tank, from 0.65 to 0.95)
        else return "eliteEnemy";                   // 5% chance (Elite, from 0.95 to 1.0)
    }

    // Calculates a random spawn position outside one of the four canvas boundaries;
    getSpawnPosition() {
        // Chooses one of the four sides (0=top, 1=bottom, 2=left, 3=right);
        const side = Math.floor(Math.random() * 4);
        const margin = 150; // Distance off-screen;

        switch (side) {
            case 0: // top (Random X, Y = -margin)
                return { x: Math.random() * this.canvas.width, y: -margin };
            case 1: // bottom (Random X, Y = canvas.height + margin)
                return { x: Math.random() * this.canvas.width, y: this.canvas.height + margin };
            case 2: // left (X = -margin, Random Y)
                return { x: -margin, y: Math.random() * this.canvas.height };
            case 3: // right (X = canvas.width + margin, Random Y)
                return { x: this.canvas.width + margin, y: Math.random() * this.canvas.height };
        }
    }

    // Handles boss-specific enemy spawning at a defined percentage position relative to the boss's top-left corner;
    spawnEnemyAt(enemyType, boss, xPercent, yPercent) {

        // Enforces the enemy limit;
        if (EntityManager.enemies.length >= this.limitEnemies) {
            return;
        }

        // Calculate Initial Position;
        const x = boss.position.x + boss.width * xPercent;
        const y = boss.position.y + boss.height * yPercent;

        // Creates the enemy instance;
        let enemy;
        if (enemyType === "scoutEnemy") {
            enemy = new ScoutEnemy({x, y});
        }
        else if (enemyType === "soldierEnemy") {
            enemy = new SoldierEnemy({x, y});
        }
        else if (enemyType === "tankEnemy") {
            enemy = new TankEnemy({x, y});
        }
        else if (enemyType === "eliteEnemy") {
            enemy = new EliteEnemy({x, y});
        }

        // Calculates vectors to check if the new enemy overlaps the boss;
        const bossCenterPosition = getCenterVector(boss.position, boss.width, boss.height);
        const enemyCenterPosition = getCenterVector(enemy.position, enemy.width, enemy.height);
        
        const differentialVector = getDifferentialVectorByObject(enemyCenterPosition, {objectX: bossCenterPosition.x, objectY: bossCenterPosition.y});
        const vectorMagnitude = getVectorMagnitude(differentialVector); // Distance between centers;
        
        const radiusBoss = boss.width / 2;
        const radiusEnemy = enemy.width / 2;

        // Calculates the overlap amount based on circular collision assumption;
        const overlap = radiusBoss + radiusEnemy - vectorMagnitude;

        // If overlap occurs, adjust its final position and add an initial velocity;
        if (overlap >= 0) {

            // Sets a corrected target position;
            const targetX = boss.position.x + boss.width * xPercent; 
            const targetY = boss.position.y + boss.height + 12; // 12 pixel offset below the boss;

            // Clamps the final position to ensure it stays within the canvas;
            enemy.position.x = clamp(targetX, 0, this.canvas.width - enemy.width);
            enemy.position.y = clamp(targetY, 0, this.canvas.height - enemy.height);
            
            // Applies an initial downward velocity;
            enemy.vy += Math.min(12 * 0.6 + 2, 8); 
        }
        
        // Add to Manager;
        EntityManager.addEnemy(enemy);
    }
}

// Exports the utility class;
export default EnemySpawner;