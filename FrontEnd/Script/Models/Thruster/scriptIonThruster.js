// Imports the base Thruster class;
import Thruster from "./scriptThruster.js";
// Imports the constant string path for the Ion Thruster sprite sheet image;
import { ION_THRUSTER_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the SoundManager utility class for handling game audio;
import SoundManager from "../../Engine/scriptSoundManager.js";

// Defines the IonThruster class, specializing the generic Thruster behavior;
class IonThruster extends Thruster {
    
    // The thrusterAudio property will hold the specific Audio object for the sound effect;
    thrusterAudio;

    // Constructor initializes the specific characteristics of the Ion Thruster;
    constructor(offsetX, offsetY, angleOffset) {

        // Calls the parent Thruster constructor with default size (60x60) and parent offsets;
        super(60, 60, offsetX, offsetY, angleOffset);

        // Animation Setup;
        this.imagePath = ION_THRUSTER_IMAGE; 
        this.frameSpeed = 3; 
        this.hFrame = 2; 
        this.vFrame = 3; 
        this.frameWidth = 480;
        this.frameHeight = 480;

        // Tries to retrieve the base audio element from the SoundManager's cache;
        const baseAudio = SoundManager.sounds["ionThruster"];
        
        if (baseAudio) {
            // Creates a clone of the base audio element to allow parallel playback/independent control;
            this.thrusterAudio = baseAudio.cloneNode(true);
            // Sets the audio to loop continuously;
            this.thrusterAudio.loop = true;
            
            // Retrieves user settings to apply sound effect volume;
            const user = JSON.parse(localStorage.getItem('user')) || {};
            // Sets the volume based on user preferences, defaulting to 0.5 if not set;
            this.thrusterAudio.volume = user.soundEffects ?? 0.5;
            
            // Attempts to start playback. Uses .catch() to handle potential
            this.thrusterAudio.play().catch(error => {});
        }
    }

    // Overrides the placeholder method from the parent/base class to stop the sound;
    stopSound() {
        if (this.thrusterAudio) {
            // Pauses playback;
            this.thrusterAudio.pause();
            // Resets the audio playback position to the start;
            this.thrusterAudio.currentTime = 0;
        }
    }
}

// Exports the specialized IonThruster class;
export default IonThruster;