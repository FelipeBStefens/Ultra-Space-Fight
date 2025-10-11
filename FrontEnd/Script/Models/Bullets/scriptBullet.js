import { PATH_BULLET_IMAGE } from "../../Gameplay/scriptConstants.js";
import GameObject from "../scriptGameObject.js";

class Bullet extends GameObject {
    
    constructor(x, y, angle, speed) {

        super({ x, y }, 20, 50, angle, "bullet");
        this.speed = speed;
        this.image = this.getImage(PATH_BULLET_IMAGE);
    }

    setLength(width, height) {
        this.width = width;
        this.height = height;
    }
    
    update() {
        this.position.x += this.speed * Math.cos(this.angle - Math.PI / 2);
        this.position.y += this.speed * Math.sin(this.angle - Math.PI / 2);
    }
}

export default Bullet;