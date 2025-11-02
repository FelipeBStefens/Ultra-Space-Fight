// Imports the base class for all game objects;
import GameObject from "../scriptGameObject.js";
// Imports the Explosion class to create visual effects;
import Explosion from "../Explosion/scriptExplosion.js";
// Imports the SoundManager utility class for audio control;
import SoundManager from "../../Engine/scriptSoundManager.js";
// Imports HUD functions for boss-specific UI updates:
import { updateDefeatedBoss, updateBossLifeBar, hideBossLifeBar, getDamage } from "../../Gameplay/scriptHeadsUpDisplay.js";
// Imports the EntityManager for adding new explosions to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the Boss class, specializing the GameObject for large, unique antagonists;
class Boss extends GameObject {

    // Properties specific to boss game mechanics:
    maxLife; 
    life;    
    cash;    
    score;   
    name;    

    // Constructor initializes the boss's state and core stats;
    constructor(x, y, width, height, angle, life, cash, score, name) {

        // Calls the parent constructor: Sets dimensions, angle, and type ("boss");
        super(width, height, angle, "boss");
        
        // Sets initial position and custom properties;
        this.position = {x, y};
        this.name = name;
        this.life = life;
        this.maxLife = life; 
        this.cash = cash;
        this.score = score;
    }

    // Handles damage received and updates the HUD life bar;
    updateLife(damage, startShake) {
        this.life -= damage;
        // Updates the visual boss health bar in the HUD;
        updateBossLifeBar(this.life);

        // Checks if the boss has been destroyed and is still active;
        if (this.life <= 0 && this.active) {
            // Hides the boss health bar from the HUD;
            hideBossLifeBar();
            // Notifies the HUD/game state that a boss has been defeated;
            updateDefeatedBoss();
            
            // Starts the multi-stage destruction sequence;
            this.startDeathAnimation(startShake);
        }
    }

    // Resets the boss state, often used for restarting a stage or game;
    reset() {
        this.life = this.maxLife; // Restores full health;
        this.finished = false;
        this.active = false;
        // Resets various properties related to boss introduction (intro scene) and screen shake;
        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0;
        this.isShaking = false;
        this.shakeTimer = 0;
    }

    // Manages the visual and audio effects for the boss's destruction;
    startDeathAnimation(startShake) {

        // Stops the game music for dramatic effect;
        SoundManager.stopMusic();
        // Plays a unique sound effect;
        SoundManager.playSound("scream");
        // Immediately deactivates the boss object itself (no more movement/collision);
        this.active = false;

        const explosionCount = 10; // Number of small, continuous explosions;
        const explosionDelay = 150; // Interval between each small explosion (in milliseconds);

        // Loop to create sequential small explosions across the boss's body;
        for (let i = 0; i < explosionCount; i++) {
            setTimeout(() => {
                // Calculates a random offset within 80% of the boss's dimensions (plus a 10% margin);
                const offsetX = Math.random() * this.width * 0.8 + this.width * 0.1;
                const offsetY = Math.random() * this.height * 0.8 + this.height * 0.1;
                
                // Creates a small explosion object at the random offset position;
                const explosion = new Explosion(
                    this.position.x + offsetX,
                    this.position.y + offsetY,
                    111 + Math.random() * 100, // Random size for visual variation;
                    129 + Math.random() * 100,
                    "shootExplosion" // Uses the smaller explosion sprite;
                );
                EntityManager.addExplosion(explosion);
            }, i * explosionDelay);
        }

        // Sets a delayed final sequence after all small explosions have finished;
        setTimeout(() => {
            // Creates the massive final explosion at the boss's position;
            const finalExplosion = new Explosion(
                this.position.x,
                this.position.y, 
                666, 777, // Massive size for the final explosion;
                "enemyExplosion" // Uses the large explosion sprite;
            );
            EntityManager.addExplosion(finalExplosion);

            // Triggers the screen shake effect;
            if (startShake) startShake(90, 25); // Shake for 90 frames with intensity 25;

            // Sets the 'finished' flag after a final delay, allowing the final explosion to play out;
            setTimeout(() => {
                this.finished = true;
                // The Entity Manager will typically remove the boss from the game loop when finished=true.
            }, 1000);
        }, explosionCount * explosionDelay + 500); // Waits for small explosions + 0.5 sec buffer;
    }

    // Overridden method from GameObject to handle collision logic;
    onCollision(gameObject, startShake) {
        
        // Checks if the collision was with a bullet (likely from the player);
        if (gameObject.type === "bullet") {
            // Reduces the boss's life by the current player bullet damage (fetched dynamically);
            this.updateLife(getDamage(), startShake);
        }
    }
}

// Exports the base Boss class;
export default Boss;