import GameObject from "../scriptGameObject.js";
import AssetLoader from "../../Gameplay/scriptAssetLoader.js";

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

        const x = parentX + this.offsetX * Math.cos(parentAngle) - this.offsetY * Math.sin(parentAngle);
        const y = parentY + this.offsetX * Math.sin(parentAngle) + this.offsetY * Math.cos(parentAngle);
        const angle = parentAngle + this.angleOffset;

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        const col = this.currentFrame % this.hFrame; // MUDANÇA: Use this.hFrame
        const row = Math.floor(this.currentFrame / this.hFrame); // MUDANÇA: Use this.hFrame

        if (this.image && this.image.complete) { // VERIFICAÇÃO EXTRA: se a imagem realmente carregou
            context.drawImage(
                this.image,
                col * this.frameWidth,   // origem x
                row * this.frameHeight,  // origem y
                this.frameWidth,         // largura do frame (source width)
                this.frameHeight,        // altura do frame (source height)
                -this.width / 2,         // destino x (usando this.width/height do construtor)
                -this.height / 2,        // destino y
                this.width,              // largura do destino
                this.height              // altura do destino
            );
        }
        context.restore();

        context.restore();
    }

    stopSound() {}
}

export default Thruster;