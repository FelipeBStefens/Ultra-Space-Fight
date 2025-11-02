// Imports utility function to check if a value is within a given range (used for bullet boundary check);
import { isInInterval } from "../Utils/scriptMath.js";
// Imports a function to update the enemy count display on the Heads-Up Display (HUD);
import { updateDefeatedEnemies } from "../Gameplay/scriptHeadsUpDisplay.js";
// Imports the Explosion model to create visual effects upon enemy destruction;
import Explosion from "../Models/Explosion/scriptExplosion.js";

// Defines the EntityManager class, a static manager for all game objects;
class EntityManager {

    // Static Data Containers;
    static canvas;                  
    static player;                  
    static enemies;                 
    static bullets;                 
    static explosions;              
    static enemiesDefeated;         

    // Initializes the manager and its static collections;
    static init(canvas, player) {

        EntityManager.canvas = canvas;
        EntityManager.player = player;

        // Initializes all entity arrays and the counter;
        EntityManager.enemies = [];
        EntityManager.bullets = [];
        EntityManager.explosions = [];
        EntityManager.enemiesDefeated = 0;
    }

    // Entity Adding Methods;
    static addEnemy(enemy) {
        EntityManager.enemies.push(enemy);
    }

    static addBullet(bullet) {
        EntityManager.bullets.push(bullet);
    }

    static addExplosion(explosion) {
        EntityManager.explosions.push(explosion);
    }

    // Game Loop Methods;

    // Executes the update logic for all entities;
    static updateEntity() {
        
        EntityManager.enemies.forEach(enemy => {
            // Enemies often need references to the player and the canvas;
            enemy.update(EntityManager.player, EntityManager.canvas);
        });
    
        EntityManager.bullets.forEach(bullet => {
            bullet.update();
        });

        EntityManager.explosions.forEach(explosion => {
            explosion.update();
        });
    }

    // Executes the drawing logic for all entities;
    static drawEntity(contex) {

        // Player is typically drawn first or last depending on desired layering;
        EntityManager.player.draw(contex);

        // Draws enemies, bullets, and then explosions;
        EntityManager.enemies.forEach(enemy => {
            enemy.draw(contex);
        });
    
        EntityManager.bullets.forEach(bullet => {
            bullet.draw(contex);
        });

        EntityManager.explosions.forEach(explosion => {
            explosion.draw(contex);
        });
    }

    // Removes inactive entities from the arrays;
    static removeEntity() {

        // Iterates backwards to safely remove elements without messing up the index;
        for (let i = EntityManager.bullets.length - 1; i >= 0; i--) {
            
            const bullet = EntityManager.bullets[i];
            
            // A bullet is removed if it's inactive OR if it's outside the canvas boundaries;
            if (!bullet.active || 
                !isInInterval(bullet.position.x, 0, EntityManager.canvas.width) ||
                !isInInterval(bullet.position.y, 0, EntityManager.canvas.height)) {
                
                EntityManager.bullets.splice(i, 1);
            }
        }

        // Enemies Removal;
        for (let i = EntityManager.enemies.length - 1; i >= 0; i--) {
            
            const enemy = EntityManager.enemies[i];
            
            // An enemy is removed only if it's inactive;
            if (!enemy.active) {
                
                EntityManager.spawnExplosion(enemy); // Creates a visual effect before removing;
                EntityManager.enemies.splice(i, 1);
                
                // Updates the HUD and the game manager counter;
                updateDefeatedEnemies();
                EntityManager.enemiesDefeated++;
            }
        }

        // Explosions Removal;
        for (let i = EntityManager.explosions.length - 1; i >= 0; i--) {

            // Explosions are removed once their animation timer runs out (active = false);
            if (!EntityManager.explosions[i].active) {

                EntityManager.explosions.splice(i, 1);
            }
        }
    }

    // Utility function to create and add an explosion object;
    static spawnExplosion(enemy) {
        
        const explosion = new Explosion(
            enemy.position.x,
            enemy.position.y,
            222, // Fixed width
            259, // Fixed height
            "enemyExplosion"
        );

        EntityManager.addExplosion(explosion);
    }

    // Returns an array containing the player, enemies, and bullets;
    static getAllEntities() {
        return [EntityManager.player, ...EntityManager.enemies, ...EntityManager.bullets];
    }

    // Returns an array of entities that should be processed by the PhysicsManager;
    static getAllPhysicalEntities() {
        return [EntityManager.player, ...EntityManager.enemies];
    }
}

// Exports the static utility class;
export default EntityManager;