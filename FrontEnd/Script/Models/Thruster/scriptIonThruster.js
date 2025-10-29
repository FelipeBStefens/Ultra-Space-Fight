import Thruster from "./scriptThruster.js";
import { ION_THRUSTER_IMAGE } from "../../Utils/scriptConstants.js";
import SoundManager from "../../Engine/scriptSoundManager.js";

class IonThruster extends Thruster {
    
    constructor(offsetX, offsetY, angleOffset) {

        super(60, 60, offsetX, offsetY, angleOffset);

        this.imagePath = ION_THRUSTER_IMAGE;
        this.frameSpeed = 3; 
        this.hFrame = 2;
        this.vFrame = 3;
        this.frameWidth = 480;
        this.frameHeight = 480;

        const baseAudio = SoundManager.sounds["ionThruster"];
        if (baseAudio) {
            this.thrusterAudio = baseAudio.cloneNode(true);
            this.thrusterAudio.loop = true;
            
            const user = JSON.parse(localStorage.getItem('user')) || {};
            this.thrusterAudio.volume = user.soundEffects ?? 0.5;
            this.thrusterAudio.play().catch(err => {
            });
        }
    }

    stopSound() {
        if (this.thrusterAudio) {
            this.thrusterAudio.pause();
            this.thrusterAudio.currentTime = 0;
        }
    }
}

export default IonThruster;