import { PATH_BULLET_IMAGE } from "../../Gameplay/scriptConstants.js";
import GameObject from "../scriptGameObject.js";
import SoundManager from "../../Gameplay/scriptSoundManager.js";
import Explosion from "../Explosion/scriptExplosion.js";

class Bullet extends GameObject {
    
    owner;

    constructor(x, y, angle, speed, owner) {

        super(40, 40, angle, "bullet");
        this.position = { x, y };
        this.speed = speed;
        this.imagePath = PATH_BULLET_IMAGE;
        this.owner = owner;

        SoundManager.playSound("shoot");
    }

    setLength(width, height) {
        this.width = width;
        this.height = height;
    }
    
    update() {
        this.position.x += this.speed * Math.cos(this.angle - Math.PI / 2);
        this.position.y += this.speed * Math.sin(this.angle - Math.PI / 2);
    }

    onDestroy(explosions) {

        this.active = false;
        let explosion = new Explosion(this.position.x, this.position.y,
            44.4, 51.8, "shootExplosion");
        explosions.push(explosion);
    }
}

export default Bullet;