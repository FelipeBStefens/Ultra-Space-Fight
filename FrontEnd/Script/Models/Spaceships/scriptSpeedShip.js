import { SPEED_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";
import IonThruster from "../Thruster/scriptIonThruster.js";

class SpeedShip extends Spaceship {

    ionThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = SPEED_SHIP_IMAGE;

        this.ionThruster = new IonThruster(0, this.height / 2 - 25, 0);
    }

    shoot(bulletsArray) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;
        const frontOffset = this.height / 2; // distância do centro até a ponta
        const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
        const bulletY = cy + frontOffset * Math.sin(this.angle -  Math.PI / 2);
        const bulletSpeed = 10;
        
        const leftBullet = new LeftBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        const rightBullet = new RightBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");

        bulletsArray.push(leftBullet, rightBullet);
    }

    draw(context) {

        this.ionThruster.update();
        super.draw(context);

        const centerX = this.position.x + this.width / 2; 
        const centerY = this.position.y + this.height / 2; 

        this.ionThruster.draw(context, centerX, centerY, this.angle);
    }
}

export default SpeedShip;