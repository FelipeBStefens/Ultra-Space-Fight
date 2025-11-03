
import Bullet from "./scriptBullet.js";

import { updatePosition } from "../../Utils/scriptMath.js";


class FrontBullet extends Bullet {


    constructor(x, y, angle, speed, owner, ratio = 1) {

        super(x, y, angle, speed, owner, ratio);
    }


    update() {



        this.position = updatePosition(this.position, this.speed, this.angle, this.ratio);
    }
}


export default FrontBullet;