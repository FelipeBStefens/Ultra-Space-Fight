// Imports the utility function to restrict a value within a minimum and maximum range;
import { clamp } from "../Utils/scriptMath.js";
// Imports the EntityManager to access all objects that require physics updates;
import EntityManager from "./scriptEntityManager.js";

// Defines the PhysicsManager class, responsible for updating physical properties (movement and bounds);
class PhysicsManager {

    canvas; // Reference to the canvas element (used for boundary checks);

    // Constructor initializes the manager with the game canvas reference;
    constructor(canvas) {
        
        this.canvas = canvas;
    }

    // Main method to apply physics rules to all registered physical entities;
    applyPhysics() {

        // Iterates through every game object tagged as physical;
        EntityManager.getAllPhysicalEntities().forEach(gameObject => {

            // Updates position based on current velocity components;
            gameObject.position.x += gameObject.vx;
            gameObject.position.y += gameObject.vy;

            // Damping Reduces velocity each frame;
            gameObject.vx *= 0.75;
            gameObject.vy *= 0.75;

            // If velocity is near zero, snap it to zero to ensure a clean stop;
            if (Math.abs(gameObject.vx) < 0.01) {
                gameObject.vx = 0;
            }
            if (Math.abs(gameObject.vy) < 0.01) {
                gameObject.vy = 0;
            }
                
            // Keeps the object entirely within the canvas dimensions (clamping);
            const clampX = clamp(gameObject.position.x, 0, this.canvas.width - gameObject.width);
            const clampY = clamp(gameObject.position.y, 0, this.canvas.height - gameObject.height); 
            
            // Applies the clamped position back to the game object;
            gameObject.position.x = clampX;
            gameObject.position.y = clampY;
        });
    }
}

// Exports the PhysicsManager class;
export default PhysicsManager;