import { DESTROYER_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";
import FireThruster from "../Thruster/scriptFireThruster.js";

class DestroyerShip extends Spaceship {

    leftFireThruster;
    rightFireThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = DESTROYER_SHIP_IMAGE;

        this.leftFireThruster = new FireThruster(-this.width / 4 + 5, this.height / 2 - 15, 0);
        this.rightFireThruster = new FireThruster(this.width / 4 - 5, this.height / 2 - 15, 0);    
    }

    shoot(bulletsArray) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;
        const frontOffset = this.height / 2; // distância do centro até a ponta
        const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
        const bulletY = cy + frontOffset * Math.sin(this.angle -  Math.PI / 2);
        const bulletSpeed = 10;
        
        const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        const leftBullet = new LeftBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        const rightBullet = new RightBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");

        bulletsArray.push(frontBullet, leftBullet, rightBullet);
    }

    draw(context) {

        this.leftFireThruster.update();
        this.rightFireThruster.update();
        super.draw(context);

        const centerX = this.position.x + this.width / 2; 
        const centerY = this.position.y + this.height / 2; 

        this.leftFireThruster.draw(context, centerX, centerY, this.angle);
        this.rightFireThruster.draw(context, centerX, centerY, this.angle);
    }
}

export default DestroyerShip;