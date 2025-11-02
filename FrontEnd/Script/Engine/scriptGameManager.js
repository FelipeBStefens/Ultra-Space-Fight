// Imports the SoundManager utility for controlling music and sound effects;
import SoundManager from "./scriptSoundManager.js";
// Imports the constants for the standard and boss music tracks;
import { GAMEPLAY_SOUNDTRACK, BOSS_GAMEPLAY_SOUNDTRACK } from "../Utils/scriptConstants.js";
// Imports HUD functions specifically for the boss health bar;
import { showBossLifeBar, hideBossLifeBar } from "../Gameplay/scriptHeadsUpDisplay.js";
// Imports the EntityManager to check game state (e.g., how many enemies defeated);
import EntityManager from "./scriptEntityManager.js";

// Defines the GameManager class, responsible for overall game state and flow control;
class GameManager {

    // Static State Properties;
    static SHAKE_DURATION = 240; 
    static isPaused = false;
    static isGameOver = false;
    static isBossFight = false;        
    static bossMusicStarted = false; 
    static currentBoss = null;       
    static bossIndex = 0;            
    static bosses = [];              
    static enemiesToDefeatBeforeBoss = 50; 
    
    // Initializes the game state and sets the list of bosses for the session;
    static initBosses(bossList) {

        this.bosses = bossList;
        // Resets all necessary flags for a new game;
        this.isPaused = false;
        this.isGameOver = false;
        this.isBossFight = false;
        this.currentBoss = null;
        this.bossMusicStarted = false;
        this.bossIndex = 0; // Starts from the first boss;

        // Starts the standard background music;
        SoundManager.playMusic(GAMEPLAY_SOUNDTRACK);
    }

    // Main game logic update loop;
    static update(spawner, shakeEffect) {
        
        // Boss Fight Mode; 
        if (this.isBossFight) {
            
            // Checks if the boss intro screen shake has ended to start the music;
            this.updateBossMusic(shakeEffect);

            const boss = this.currentBoss;
            if (boss) {

                boss.update(); 
                
                // Checks if the boss has finished its death animation 
                // and has completed its introduction;
                if (boss.finished && boss.introActiveEnded) {
                    this.endBossFight();
                    // Resets the defeated enemy counter to start working towards the next boss;
                    EntityManager.enemiesDefeated = 0;
                }
            }
        } 
        // Standard Gameplay Mode;
        else {

            spawner.update(); // Allows the EnemySpawner to randomly generate enemies;

            // Logic to transition into the boss fight:
            if (EntityManager.enemiesDefeated >= this.enemiesToDefeatBeforeBoss) {
                this.startBossFight(shakeEffect);
            }
        }
    }

    // Initiates the boss entrance sequence;
    static startBossFight(shakeEffect) {

        if (this.isBossFight) {
            return;
        }

        this.isBossFight = true;
        // Selects the next boss in the array;
        this.currentBoss = this.bosses[this.bossIndex];
        // Resets the boss's internal state;
        this.currentBoss.reset();

        // Sets up the dramatic introduction:
        SoundManager.stopMusic();
        SoundManager.playSound("earthquake"); // Plays a loud sound effect for impact;

        // Triggers a long, intense screen shake;
        shakeEffect.startShake(this.SHAKE_DURATION, 20);

        // Tells the boss to start its intro sequence, linking the boss's internal state to the main screen shake;
        this.currentBoss.startIntro(true, this.SHAKE_DURATION);

        // Displays the boss's health bar and name on the HUD;
        showBossLifeBar(this.currentBoss.name, this.currentBoss.maxLife);

        this.bossMusicStarted = false; // Resets the flag for music;
    }

    // Checks if the screen shake is over and starts the boss battle music;
    static updateBossMusic(shakeEffect) {

        if (!this.isBossFight || this.bossMusicStarted) {
            return;
        }

        // The music starts exactly when the dramatic screen shake ends;
        if (shakeEffect.shakeTime <= 0) {

            SoundManager.playMusic(BOSS_GAMEPLAY_SOUNDTRACK);

            this.bossMusicStarted = true;
        }
    }

    // Transitions the game state back to standard gameplay after a boss is defeated;
    static endBossFight() {
        
        if (!this.isBossFight) {
            return;
        }

        this.isBossFight = false;
        // Cycles to the next boss for the next fight (using modulo for list wrap-around);
        this.bossIndex = (this.bossIndex + 1) % this.bosses.length;
        
        // Resumes the standard gameplay music;
        SoundManager.playMusic(GAMEPLAY_SOUNDTRACK);
        hideBossLifeBar(); // Removes the boss HUD element;

        this.currentBoss = null;
        this.bossMusicStarted = false;
    }
}

// Exports the static utility class;
export default GameManager;