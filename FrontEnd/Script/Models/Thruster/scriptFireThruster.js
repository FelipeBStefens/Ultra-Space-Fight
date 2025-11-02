// Imports the base Thruster class, which handles position calculation and animation logic;
import Thruster from "./scriptThruster.js";
// Imports the constant string path for the Fire Thruster sprite sheet image;
import { FIRE_THRUSTER_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the SoundManager utility class for managing game audio assets;
import SoundManager from "../../Engine/scriptSoundManager.js";

// Defines the FireThruster class, specializing the generic Thruster for a fire effect;
class FireThruster extends Thruster {
    
    // The thrusterAudio property will hold the specific Audio object for the sound effect;
    thrusterAudio;

    // Constructor initializes the specific characteristics of the Fire Thruster;
    constructor(offsetX, offsetY, angleOffset) {

        // Calls the parent Thruster constructor with default size (60x60) and parent offsets;
        super(60, 60, offsetX, offsetY, angleOffset); 

        // Animation Setup; 
        this.imagePath = FIRE_THRUSTER_IMAGE;
        this.frameSpeed = 5; 
        this.hFrame = 3; 
        this.vFrame = 3; 
        this.frameWidth = 480;
        this.frameHeight = 480;

        // Tries to retrieve the base audio element for "fireThruster" from the SoundManager's cache;
        const baseAudio = SoundManager.sounds["fireThruster"];
        
        if (baseAudio) {
            // Creates a clone of the base audio element for independent playback control;
            this.thrusterAudio = baseAudio.cloneNode(true);
            // Sets the audio to loop continuously;
            this.thrusterAudio.loop = true;
            
            // Retrieves user settings to apply sound effect volume;
            const user = JSON.parse(localStorage.getItem('user')) || {};
            // Sets the volume based on user preferences, defaulting to 0.5;
            this.thrusterAudio.volume = user.soundEffects ?? 0.5;
            
            // Attempts to start playback, catching potential autoplay errors;
            this.thrusterAudio.play().catch(error => {});
        }
    }

    // Overrides the inherited method to stop the thruster's sound effect;
    stopSound() {
        if (this.thrusterAudio) {
            // Pauses playback;
            this.thrusterAudio.pause();
            // Resets the audio playback position to the start;
            this.thrusterAudio.currentTime = 0; 
        }
    }
}

// Exports the specialized FireThruster class;
export default FireThruster;