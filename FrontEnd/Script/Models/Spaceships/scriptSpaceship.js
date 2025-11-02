// Imports the base class for all game objects;
import GameObject from "../scriptGameObject.js";
// Imports math utility functions: getMiddlePosition (to center the ship) and rotation (to convert degrees to radians);
import { getMiddlePosition, rotation } from "../../Utils/scriptMath.js";
// Imports HUD/Gameplay functions: takeLife (to update player health) and getSpeed (to fetch the ship's current speed stat);
import { takeLife, getSpeed } from "../../Gameplay/scriptHeadsUpDisplay.js";

// Defines the Spaceship class, specializing the GameObject for player control;
class Spaceship extends GameObject { 

    // Constructor initializes the ship's dimensions, position, and speed;
    constructor(canvas) {

        // Calls the parent constructor: Sets width (140), height (140), initial angle (0), and type ("spaceship");
        super(140, 140, 0, "spaceship");

        // Sets the initial position to the center of the canvas;
        this.position = getMiddlePosition(canvas, this.width, this.height);
        // Retrieves the ship's speed stat dynamically from the HUD/Gameplay module;
        this.speed = getSpeed();
    }

    // Method to move the spaceship horizontally to the left;
    moveLeft() {
        this.position.x -= this.speed;
    }

    // Method to move the spaceship horizontally to the right;
    moveRight() {
        this.position.x += this.speed;
    }

    // Method to move the spaceship vertically upwards;
    moveUp() {
        this.position.y -= this.speed;
    }

    // Method to move the spaceship vertically downwards;
    moveDown() {
        this.position.y += this.speed;
    }

    // Method to rotate the spaceship counter-clockwise;
    rotateLeft() {
        // Decrements the angle by 5 degrees, converted to radians using the rotation utility;
        this.angle -= rotation(5) 
    }

    // Method to rotate the spaceship clockwise;
    rotateRight() {
        // Increments the angle by 5 degrees, converted to radians;
        this.angle += rotation(5);
    }

    // Placeholder method for firing weapons. Subclasses will implement this specific behavior;
    shoot() {}

    // Overridden method from GameObject to handle collision logic;
    onCollision(gameObject, startShake) {

        // Decrements the player's life and returns a boolean indicating if the player died;
        const died = takeLife();
        
        // Checks if the player's life reached zero;
        if (died) {

            try {

                // Dispatches a global event to signal the game over state to other parts of the engine/UI;
                window.dispatchEvent(new CustomEvent("playerGameOver"));
            } 
            catch (e) {
                // Catches potential errors during event dispatching (e.g., if the window context is unavailable);
            }
        }

        // Logic to handle collision with a bullet;
        if (gameObject.type === "bullet") {
            
            // Deactivates the bullet upon hitting the spaceship so it's removed from the game loop;
            gameObject.active = false;
        }
    }
}

// Exports the Spaceship class;
export default Spaceship;