// Defines the ShakeEffect class, responsible for implementing the screen shake visual effect;
class ShakeEffect {

    // Properties;
    shakeTime;              
    shakeIntensity;         
    shakeDefaultDuration;   

    // Constructor initializes the effect state to inactive;
    constructor() {
        this.shakeTime = 0;
        this.shakeIntensity = 0;
        this.shakeDefaultDuration = 90; // Default shake lasts for 90 frames (1.5 seconds at 60 FPS);
    }

    // Starts the screen shake effect with optional custom duration and intensity;
    startShake(shakeDefaultDuration = this.shakeDefaultDuration, shakeIntensity = 10) {
        
        this.shakeTime = shakeDefaultDuration;
        this.shakeIntensity = shakeIntensity;
    }

    // Applies the screen shake displacement to the canvas context, typically called before drawing all game elements;
    applyShake(context) {

        // Check if the shake effect is currently active;
        if (this.shakeTime > 0) {
            
            // Determines how far along the shake is (1.0 = start, approaching 0.0 = end);
            const progress = this.shakeTime / this.shakeDefaultDuration; 
            
            // Fades the intensity over time (e.g., shake starts strong and slowly dampens);
            const currentIntensity = this.shakeIntensity * progress;

            // Generates a random value between -0.5 and 0.5, then scales it by currentIntensity * 2
            // to produce a random shake offset within the defined intensity bounds;
            const shakeX = (Math.random() - 0.5) * currentIntensity * 2;
            const shakeY = (Math.random() - 0.5) * currentIntensity * 2;
            
            // Translates (moves) the entire canvas context (and everything drawn after) by the random offset.
            // This is the core mechanism that creates the visual "shake";
            context.translate(shakeX, shakeY);
            
            // Update Timer:
            this.shakeTime--; // Decrements the remaining shake duration;
        }        
    }
}

// Exports the utility class;
export default ShakeEffect;