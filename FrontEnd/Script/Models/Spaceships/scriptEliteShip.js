import { PATH_ELITE_SHIP_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";
import IonThruster from "../Thruster/scriptIonThruster.js";

class EliteShip extends Spaceship {

    leftIonThruster;
    rightIonThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = PATH_ELITE_SHIP_IMAGE;

        this.leftIonThruster = new IonThruster(-this.width / 3, this.height / 2 - 9, 0);
        this.rightIonThruster = new IonThruster(this.width / 3, this.height / 2 - 9, 0);
    }
    
    shoot(bulletsArray) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;
        const frontOffset = this.height / 2; // distância do centro até a ponta
        const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
        const bulletY = cy + frontOffset * Math.sin(this.angle -  Math.PI / 2);
        const bulletSpeed = 10;

        const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        frontBullet.setLength(40, 100);
        const leftBullet = new LeftBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        leftBullet.setLength(40, 100);
        const rightBullet = new RightBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        rightBullet.setLength(40, 100);
            
        bulletsArray.push(frontBullet, leftBullet, rightBullet);
    }

    draw(context) {

        this.leftIonThruster.update();
        this.rightIonThruster.update();
        super.draw(context);

        const centerX = this.position.x + this.width / 2; 
        const centerY = this.position.y + this.height / 2; 

        this.leftIonThruster.draw(context, centerX, centerY, this.angle);
        this.rightIonThruster.draw(context, centerX, centerY, this.angle);
    }
}

export default EliteShip;