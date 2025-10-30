import GameObject from "../scriptGameObject.js";
import AssetLoader from "../../Engine/scriptAssetLoader.js";
import { rotateVector } from "../../Utils/scriptMath.js";

class Thruster extends GameObject {
    
    currentFrame;
    hFrame;
    vFrame;
    frameWidth;
    frameHeight;
    frameSpeed;
    tick;
    offsetX;
    offsetY;
    angleOffset;

    constructor(width, height, offsetX, offsetY, angleOffset) {
        super(width, height, 0, "thruster");
        this.currentFrame = 0;
        this.tick = 0;

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.angleOffset = angleOffset;
    }

    setLength(width, height) {
        this.width = width;
        this.height = height;
    }

    update() {
        this.tick++;
        if (this.tick >= this.frameSpeed) {
            this.tick = 0;
            this.currentFrame = (this.currentFrame + 1) % (this.hFrame * this.vFrame);
        }
    }

    draw(context, parentX, parentY, parentAngle) {
        
        if (!this.image && this.imagePath) {
            const loaded = AssetLoader.get(this.imagePath);
            if (loaded) this.image = loaded;
        }

        const rotatedVector = rotateVector({x: this.offsetX, y: this.offsetY}, parentAngle);
        rotatedVector.rotatedX += parentX;
        rotatedVector.rotatedY += parentY
        
        const angle = parentAngle + this.angleOffset;

        context.save();
        context.translate(rotatedVector.rotatedX, rotatedVector.rotatedY);
        context.rotate(angle);

        const col = this.currentFrame % this.hFrame; 
        const row = Math.floor(this.currentFrame / this.hFrame); 

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

        context.restore();

        context.restore();
    }

    stopSound() {}
}

export default Thruster;