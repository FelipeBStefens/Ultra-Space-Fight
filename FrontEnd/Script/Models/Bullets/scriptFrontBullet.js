import Bullet from "./scriptBullet.js";
import { updatePosition } from "../../Utils/scriptMath.js";

class FrontBullet extends Bullet {

    constructor(x, y, angle, speed, owner) {
        super(x, y, angle, speed, owner);
    }

    update() {
        this.position = updatePosition(this.position, this.speed, this.angle, 1);
    }
}

export default FrontBullet;