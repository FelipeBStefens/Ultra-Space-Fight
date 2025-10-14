import Bullet from "./scriptBullet.js";

class RightBullet extends Bullet{

    constructor(x, y, angle, speed, owner) {
        super(x, y, angle, speed, owner);
    }
    
    update() {
        this.position.x += this.speed * Math.cos(this.angle - 2 * Math.PI / 3);
        this.position.y += this.speed * Math.sin(this.angle - 2 * Math.PI / 3);
    }
}

export default RightBullet;