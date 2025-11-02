// Imports the base class for all game objects;
import GameObject from "../scriptGameObject.js";
// Imports the AssetLoader utility for managing loaded images/assets;
import AssetLoader from "../../Engine/scriptAssetLoader.js";
// Imports the SoundManager utility class for handling game audio;
import SoundManager from "../../Engine/scriptSoundManager.js";
// Imports the constant string path for the explosion sprite sheet image;
import { EXPLOSION_IMAGE } from "../../Utils/scriptConstants.js";

// Defines the Explosion class, a specialized, transient game object;
class Explosion extends GameObject {

    // Constructor initializes the explosion's position, size, and animation parameters;
    constructor(x, y, width, height, type) {

        // Calls the parent constructor: Sets width, height, angle (0), and type ("explosion");
        super(width, height, 0, "explosion");

        // Sets the explosion's initial position;
        this.position = {x, y};
        // Sets the image path for loading;
        this.imagePath = EXPLOSION_IMAGE;
        this.image = null; 

        // Sprite Sheet Configuration
        this.hFrame = 3; 
        this.vFrame = 2; 
        // Calculates the pixel width of a single frame (assuming a 2000px wide image);
        this.frameWidth = 2000 / this.hFrame; 
        // Calculates the pixel height of a single frame (assuming a 1554px tall image);
        this.frameHeight = 1554 / this.vFrame;
        this.frameSpeed = 5;
        this.currentFrame = 0;
        this.tick = 0; 
        this.finished = false;

        // Triggers the sound effect associated with the explosion type;
        SoundManager.playSound(type);
    }

    // Method to update the explosion's animation state;
    update() {
        // Exits early if the object is no longer active;
        if (!this.active) return;

        this.tick++; // Increments the animation tick;
        
        // Checks if it's time to advance to the next frame;
        if (this.tick >= this.frameSpeed) {
            this.tick = 0; 
            this.currentFrame++; 

            // Checks if the frame index has gone past the total number of frames;
            if (this.currentFrame >= this.hFrame * this.vFrame) {
                this.active = false;  // Deactivates the object so the game loop can remove it;
                this.finished = true; // Sets the finished flag;
            }
        }
    }

    // Method to draw the current frame of the explosion animation;
    draw(context) {
        // Exits early if the object is no longer active;
        if (!this.active) return;

        // Loads the image from the AssetLoader cache if not already loaded;
        if (!this.image && this.imagePath) {
            const loaded = AssetLoader.get(this.imagePath);
            if (loaded) this.image = loaded;
        }

        // Exits if the image object is not yet loaded or complete;
        if (!this.image || !this.image.complete) return;

        // Calculates the column and row index for the current frame;
        const col = this.currentFrame % this.hFrame;
        const row = Math.floor(this.currentFrame / this.hFrame);

        // Saves the current canvas state;
        context.save();
        
        // Translates the origin to the center of the explosion for drawing;
        context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        
        // Draws the current frame from the sprite sheet;
        context.drawImage(
            this.image,
            col * this.frameWidth,      
            row * this.frameHeight,     
            this.frameWidth,            
            this.frameHeight,           
            -this.width / 2,            
            -this.height / 2,           
            this.width,                 
            this.height                 
        );
        // Restores the canvas state;
        context.restore();
    }
}

// Exports the Explosion class;
export default Explosion;