import { PATH_BULLET_IMAGE } from "../../Gameplay/scriptConstants.js";
import GameObject from "../scriptGameObject.js";

class Bullet extends GameObject {
    
    owner;

    constructor(x, y, angle, speed, owner) {

        super(20, 50, angle, "bullet");
        this.position = { x, y };
        this.speed = speed;
        this.imagePath = PATH_BULLET_IMAGE;
        this.owner = owner;
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