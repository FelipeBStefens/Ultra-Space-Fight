import { STANDART_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Spaceship from "./scriptSpaceship.js";
import FireThruster from "../Thruster/scriptFireThruster.js";
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
import EntityManager from "../../Engine/scriptEntityManager.js";

class StandartShip extends Spaceship {

    fireThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = STANDART_SHIP_IMAGE;

        this.fireThruster = new FireThruster(0, this.height / 2 - 10, 0);
    }

    shoot() {

        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle);
        const bulletSpeed = 10;
        
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        
        EntityManager.addBullet(frontBullet);
    }

    draw(context) {

        this.fireThruster.update();
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height);

        this.fireThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

export default StandartShip;