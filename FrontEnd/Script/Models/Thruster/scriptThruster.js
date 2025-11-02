// Imports the base class for all game objects;
import GameObject from "../scriptGameObject.js";
// Imports the AssetLoader utility for managing image assets;
import AssetLoader from "../../Engine/scriptAssetLoader.js";
// Imports a mathematical utility function to rotate a vector (point) around an origin;
import { rotateVector } from "../../Utils/scriptMath.js";

// Defines the Thruster class, inheriting basic properties and methods from GameObject;
class Thruster extends GameObject {
    
    // Properties specific to animation (sprite sheet handling):
    currentFrame; 
    hFrame;       
    vFrame;       
    frameWidth;   
    frameHeight;  
    frameSpeed;   
    tick;         

    // Properties for positioning relative to a parent object:
    offsetX;      
    offsetY;      
    angleOffset;  

    // Constructor to set initial animation state and positional offsets;
    constructor(width, height, offsetX, offsetY, angleOffset) {
        // Calls the parent constructor with basic dimensions, angle (0, as it's relative), and type;
        super(width, height, 0, "thruster");
        this.currentFrame = 0;
        this.tick = 0; // Starts the frame timer at 0;

        // Stores the positional and angular offsets;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.angleOffset = angleOffset;
    }

    // Utility method to explicitly set the drawing size of the thruster effect;
    setLength(width, height) {
        this.width = width;
        this.height = height;
    }

    // Method to update the thruster's animation state;
    update() {
        this.tick++; // Increments the tick counter;
        
        // Checks if enough ticks have passed to change the frame;
        if (this.tick >= this.frameSpeed) {
            this.tick = 0; // Resets the tick counter;
            
            // Cycles the current frame index using the modulo operator to loop through all frames;
            this.currentFrame = (this.currentFrame + 1) % (this.hFrame * this.vFrame);
        }
    }

    // Overridden draw method for objects attached to a parent (takes parent's state as input);
    draw(context, parentX, parentY, parentAngle) {
        
        // Lazy-loads the image from the AssetLoader if it hasn't been loaded yet;
        if (!this.image && this.imagePath) {
            const loaded = AssetLoader.get(this.imagePath);
            if (loaded) this.image = loaded;
        }

        // 1. Calculate the Thruster's absolute position:
        // Rotates the local offset vector (offsetX, offsetY) by the parent's angle;
        const rotatedVector = rotateVector({x: this.offsetX, y: this.offsetY}, parentAngle);
        // Adds the parent's position to the rotated offset to get the final absolute position;
        rotatedVector.rotatedX += parentX;
        rotatedVector.rotatedY += parentY
        
        // 2. Calculate the Thruster's absolute angle:
        // The thruster's angle is the parent's angle plus its own offset;
        const angle = parentAngle + this.angleOffset;

        // Saves the current state of the canvas;
        context.save();
        // Translates the canvas origin to the thruster's calculated absolute position;
        context.translate(rotatedVector.rotatedX, rotatedVector.rotatedY);
        // Rotates the canvas by the thruster's final angle;
        context.rotate(angle);

        // 3. Calculate the source frame coordinates (for sprite sheet animation):
        // Determines the column index of the current frame;
        const col = this.currentFrame % this.hFrame; 
        // Determines the row index of the current frame;
        const row = Math.floor(this.currentFrame / this.hFrame); 

        // 4. Draws the current frame from the sprite sheet:
        context.drawImage(
            this.image,
            col * this.frameWidth,      // Source X (start of frame in sprite sheet)
            row * this.frameHeight,     // Source Y
            this.frameWidth,            // Source Width (width of frame to crop)
            this.frameHeight,           // Source Height
            -this.width / 2,            // Destination X (centered drawing at origin)
            -this.height / 2,           // Destination Y
            this.width,                 // Destination Width (drawing size on canvas)
            this.height                 // Destination Height
        );

        // Restores the canvas state from the first save (after translation/rotation);
        context.restore();
        context.restore();
    }

    // Placeholder method for stopping sound effects associated with the thruster (if any);
    stopSound() {}
}

// Exports the Thruster class;
export default Thruster;