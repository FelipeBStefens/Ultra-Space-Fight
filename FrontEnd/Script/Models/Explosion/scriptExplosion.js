import GameObject from "../scriptGameObject.js";
import AssetLoader from "../../Engine/scriptAssetLoader.js";
import SoundManager from "../../Engine/scriptSoundManager.js";
import { EXPLOSION_IMAGE } from "../../Utils/scriptConstants.js";

class Explosion extends GameObject {

    constructor(x, y, width, height, type) {

        super(width, height, 0, "explosion");

        this.position = {x, y};
        this.imagePath = EXPLOSION_IMAGE;

        this.image = null;

        this.hFrame = 3;         
        this.vFrame = 2;         
        this.frameWidth = 2000 / this.hFrame;   // 2000px total / 3 colunas
        this.frameHeight = 1554 / this.vFrame;  // 1554px total / 2 linhas
        this.frameSpeed = 5;    
        this.currentFrame = 0;
        this.tick = 0;
        this.finished = false;

        SoundManager.playSound(type);
    }

    update() {
        if (!this.active) return;

        this.tick++;
        if (this.tick >= this.frameSpeed) {
            this.tick = 0;
            this.currentFrame++;

            // Quando chega no fim do spritesheet, a explosão termina
            if (this.currentFrame >= this.hFrame * this.vFrame) {
                this.active = false;  // o motor do jogo pode remover
                this.finished = true;
            }
        }
    }

    draw(context) {
        if (!this.active) return;

        if (!this.image && this.imagePath) {
            const loaded = AssetLoader.get(this.imagePath);
            if (loaded) this.image = loaded;
        }

        if (!this.image || !this.image.complete) return;

        const col = this.currentFrame % this.hFrame;
        const row = Math.floor(this.currentFrame / this.hFrame);

        context.save();
        context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
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
    }
}

export default Explosion;