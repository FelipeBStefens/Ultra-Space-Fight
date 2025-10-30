import { SPEED_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";
import IonThruster from "../Thruster/scriptIonThruster.js";
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";

class SpeedShip extends Spaceship {

    ionThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = SPEED_SHIP_IMAGE;

        this.ionThruster = new IonThruster(0, this.height / 2 - 25, 0);
    }

    shoot(bulletsArray) {

        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle);
        
        const bulletSpeed = 10;
        
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");

        bulletsArray.push(leftBullet, rightBullet);
    }

    draw(context) {

        this.ionThruster.update();
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height);
        
        this.ionThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

export default SpeedShip;