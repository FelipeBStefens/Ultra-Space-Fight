
import Bullet from "./scriptBullet.js";

import { updatePosition } from "../../Utils/scriptMath.js";


class LeftBullet extends Bullet {


    constructor(x, y, angle, speed, owner, ratio = 2 / 3) {




        super(x, y, angle, speed, owner, ratio);
    }
    

    update() {


        this.position = updatePosition(this.position, this.speed, this.angle, this.ratio);
    }
}


export default LeftBullet;