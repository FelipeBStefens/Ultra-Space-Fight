// Imports the constant string path for the bullet image asset;
import { BULLET_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the base class for all game objects;
import GameObject from "../scriptGameObject.js";
// Imports the SoundManager utility class for handling game audio;
import SoundManager from "../../Engine/scriptSoundManager.js";
// Imports the Explosion class to create an effect upon impact;
import Explosion from "../Explosion/scriptExplosion.js";
// Imports the math utility function for calculating the new position based on speed and angle;
import { updatePosition } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding the resulting explosion back into the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the Bullet class, specializing GameObject for moving projectiles;
class Bullet extends GameObject {
    
    // Properties to track the bullet's source and potential movement modifier;
    owner; 
    ratio; 

    // Constructor initializes the bullet's state;
    constructor(x, y, angle, speed, owner, ratio = 1) {

        // Calls the parent constructor: Sets default size (40x40), initial angle, and type ("bullet");
        super(40, 40, angle, "bullet");
        
        // Sets initial position and speed;
        this.position = { x, y };
        this.speed = speed;
        
        // Sets the image path and specific bullet properties;
        this.imagePath = BULLET_IMAGE;
        this.owner = owner;
        this.ratio = ratio;
        
        // Triggers the shooting sound effect;
        SoundManager.playSound("shoot");
    }

    // Allows for dynamic adjustment of the bullet's dimensions (used by EliteShip/EliteEnemy for larger bullets);
    setLength(width, height) {
        this.width = width;
        this.height = height;
    }
    
    // Method to update the bullet's position each game tick;
    update() {

        // Calculates the new position based on the current position, speed, angle, and ratio.
        this.position = updatePosition(this.position, this.speed, this.angle, this.ratio);
    }

    // Overridden method from GameObject to handle collision logic;
    onCollision(gameObject, startShake) {
    
        // Deactivates the bullet immediately so it's removed from the next game cycle;
        this.active = false;
        
        // Creates a new explosion effect at the point of impact:
        let explosion = new Explosion(this.position.x, this.position.y,
            44.4, 51.8, "shootExplosion");
            
        // Adds the explosion object to the game loop;
        EntityManager.addExplosion(explosion);        
    }
}

// Exports the base Bullet class;
export default Bullet;