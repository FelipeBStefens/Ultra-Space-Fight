
import Thruster from "./scriptThruster.js";

import { FIRE_THRUSTER_IMAGE } from "../../Utils/scriptConstants.js";

import SoundManager from "../../Engine/scriptSoundManager.js";


class FireThruster extends Thruster {
    

    thrusterAudio;


    constructor(offsetX, offsetY, angleOffset) {


        super(60, 60, offsetX, offsetY, angleOffset); 


        this.imagePath = FIRE_THRUSTER_IMAGE;
        this.frameSpeed = 5; 
        this.hFrame = 3; 
        this.vFrame = 3; 
        this.frameWidth = 480;
        this.frameHeight = 480;


        const baseAudio = SoundManager.sounds["fireThruster"];
        
        if (baseAudio) {

            this.thrusterAudio = baseAudio.cloneNode(true);

            this.thrusterAudio.loop = true;
            

            const user = JSON.parse(localStorage.getItem('user')) || {};

            this.thrusterAudio.volume = user.soundEffects ?? 0.5;
            

            this.thrusterAudio.play().catch(error => {});
        }
    }


    stopSound() {
        if (this.thrusterAudio) {

            this.thrusterAudio.pause();

            this.thrusterAudio.currentTime = 0; 
        }
    }
}


export default FireThruster;