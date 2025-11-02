// Imports the base class for all game objects;
import GameObject from "../scriptGameObject.js"; 
// Imports functions from the HeadsUpDisplay (HUD) module for updating game stats;
import { updateScore, updateCash, getDamage } from "../../Gameplay/scriptHeadsUpDisplay.js";
// Imports the math utility function for converting degrees to radians;
import { rotation } from "../../Utils/scriptMath.js";

// Defines the Enemy class, specializing the GameObject for antagonist entities;
class Enemy extends GameObject { 

    // Properties specific to enemy game mechanics:
    life;  
    cash;  
    score; 

    // Constructor initializes the enemy's state;
    constructor(position) {

        // Calls the parent constructor: Sets default size (140x140), angle (0), and type ("enemy");
        super(140, 140, 0, "enemy");
        // Sets the initial position based on the argument;
        this.position = position;
    }

    // Movement Methods;
    moveLeft() {
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }

    moveUp() {
        this.position.y -= this.speed;
    }

    moveDown() {
        this.position.y += this.speed;
    }

    rotateLeft() {
        this.angle -= rotation(5);
    }

    rotateRight() {
        this.angle += rotation(5);
    }

    // Handles damage received and checks for destruction;
    updateLife(damage) {
        this.life -= damage;
        
        // Checks if the enemy has been destroyed;
        if (this.life <= 0) {
            
            // Stops the thruster sound if the enemy has one (like IonThruster/FireThruster);
            if (this.ionThruster) {
                this.ionThruster.stopSound();
            }

            // Update HUD values;
            this.active = false;      
            updateScore(this.score);  
            updateCash(this.cash);    
        }
    }

    // Placeholder method for complex movemen or firing logic;
    update(player, bulletsArray, canvas) {}

    // Overridden method from GameObject to handle collision logic;
    onCollision(gameObject, startShake) {

        // Checks if the collision was with a bullet (likely from the player);
        if (gameObject.type === "bullet") {
            // Reduces the enemy's life by the current player bullet damage (fetched dynamically from the HUD);
            this.updateLife(getDamage());
        }
    }
}

// Exports the base Enemy class;
export default Enemy;