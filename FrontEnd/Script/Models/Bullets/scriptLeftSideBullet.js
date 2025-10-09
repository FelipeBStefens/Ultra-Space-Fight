import Bullet from "./scriptBullet.js";

class LeftBullet extends Bullet {

    constructor(x, y, angle, speed) {
        super(x, y, angle, speed);
    }
    
    update() {
        this.position.x += this.speed * Math.cos(this.angle - Math.PI / 3);
        this.position.y += this.speed * Math.sin(this.angle - Math.PI / 3);
    }
}

export default LeftBullet;