
class ShakeEffect {


    shakeTime;              
    shakeIntensity;         
    shakeDefaultDuration;   


    constructor() {
        this.shakeTime = 0;
        this.shakeIntensity = 0;
        this.shakeDefaultDuration = 90;
    }


    startShake(shakeDefaultDuration = this.shakeDefaultDuration, shakeIntensity = 10) {
        
        this.shakeTime = shakeDefaultDuration;
        this.shakeIntensity = shakeIntensity;
    }


    applyShake(context) {


        if (this.shakeTime > 0) {
            

            const progress = this.shakeTime / this.shakeDefaultDuration; 
            

            const currentIntensity = this.shakeIntensity * progress;



            const shakeX = (Math.random() - 0.5) * currentIntensity * 2;
            const shakeY = (Math.random() - 0.5) * currentIntensity * 2;
            


            context.translate(shakeX, shakeY);
            

            this.shakeTime--;
        }        
    }
}


export default ShakeEffect;