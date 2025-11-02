// Imports the AssetLoader utility class, which is responsible for managing loaded images/assets;
import AssetLoader from "../Engine/scriptAssetLoader.js";

// Defines the base class for all entities in the game;
class GameObject {

    // Properties defining the object's physical and mechanical state:
    position; 
    width;    
    height;   
    angle;    
    speed;    
    image;    
    imagePath;
    type;     
    active;   
    vx;       
    vy;       
    mass;    
    
    // Constructor to initialize basic properties upon object creation;
    constructor(width, height, angle, type) {

        this.width = width;
        this.height = height;
        this.angle = angle;
        this.type = type;
        this.active = true; // Objects start as active by default;
        this.imagePath = null; // Image path must be set by subclasses;
        this.vx = 0; // Initializes X velocity;
        this.vy = 0; // Initializes Y velocity;
        this.mass = 1; // Default mass;
    }

    // Utility method to create a new HTML Image object (old/deprecated way, usually overridden by AssetLoader usage);
    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }

    // Method to draw the GameObject onto the canvas context;
    draw(context) {

        // Saves the current state of the canvas (matrix, style, etc.);
        context.save();
        
        // Translates the origin point to the center of the object (important for rotation);
        context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        // Rotates the canvas by the object's angle;
        context.rotate(this.angle);

        // Lazy-resolves: Checks if the image is not yet loaded but a path is provided;
        if (!this.image && this.imagePath) {
            // Tries to retrieve the image object from the global AssetLoader cache;
            const loaded = AssetLoader.get(this.imagePath);
            // If the image is found in the cache, sets it to the object's image property;
            if (loaded) this.image = loaded;
        }

        // Draws the image centered at the translated origin point;
        if (this.image && this.image.complete) {
            // context.drawImage(image, dx, dy, dWidth, dHeight);
            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        }

        // Restores the canvas state to what it was before translation and rotation;
        context.restore();
    }

    // Placeholder method to be called when a collision with another object occurs;
    // Subclasses will override this method to define specific collision responses;
    onCollision(gameObject, startShake) {}
}

// Exports the GameObject class for use in other modules;
export default GameObject;