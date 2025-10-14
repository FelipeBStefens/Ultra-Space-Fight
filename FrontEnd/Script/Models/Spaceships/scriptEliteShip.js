import { PATH_ELITE_SHIP_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";

class EliteShip extends Spaceship {

    constructor(canvas) {
        super(canvas);
    this.speed = 5;
    this.imagePath = PATH_ELITE_SHIP_IMAGE;
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
}

export default EliteShip;