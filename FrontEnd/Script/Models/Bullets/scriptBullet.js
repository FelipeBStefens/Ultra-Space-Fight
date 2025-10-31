import { BULLET_IMAGE } from "../../Utils/scriptConstants.js";
import GameObject from "../scriptGameObject.js";
import SoundManager from "../../Engine/scriptSoundManager.js";
import Explosion from "../Explosion/scriptExplosion.js";
import { updatePosition } from "../../Utils/scriptMath.js";

class Bullet extends GameObject {
    
    owner;
    ratio;

    constructor(x, y, angle, speed, owner, ratio = 1) {

        super(40, 40, angle, "bullet");
        this.position = { x, y };
        this.speed = speed;
        this.imagePath = BULLET_IMAGE;
        this.owner = owner;
        this.ratio = ratio;
        
        SoundManager.playSound("shoot");
    }

    setLength(width, height) {
        this.width = width;
        this.height = height;
    }
    
    update() {
        this.position = updatePosition(this.position, this.speed, this.angle, this.ratio);
    }

    onDestroy(explosions) {

        this.active = false;
        let explosion = new Explosion(this.position.x, this.position.y,
            44.4, 51.8, "shootExplosion");
        explosions.push(explosion);
    }
}

export default Bullet;