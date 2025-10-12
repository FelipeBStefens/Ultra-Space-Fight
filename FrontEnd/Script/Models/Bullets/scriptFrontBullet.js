import Bullet from "./scriptBullet.js";

class FrontBullet extends Bullet {

    constructor(x, y, angle, speed, owner) {
        super(x, y, angle, speed, owner);
    }

    update() {
        this.position.x += this.speed * Math.cos(this.angle - Math.PI / 2);
        this.position.y += this.speed * Math.sin(this.angle - Math.PI / 2);
    }
}

export default FrontBullet;