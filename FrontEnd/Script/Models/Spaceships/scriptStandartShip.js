import { STANDART_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Spaceship from "./scriptSpaceship.js";
import FireThruster from "../Thruster/scriptFireThruster.js";

class StandartShip extends Spaceship {

    fireThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = STANDART_SHIP_IMAGE;

        this.fireThruster = new FireThruster(0, this.height / 2 - 10, 0);
    }

    shoot(bulletsArray) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;
        const frontOffset = this.height / 2; // distância do centro até a ponta
        const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
        const bulletY = cy + frontOffset * Math.sin(this.angle -  Math.PI / 2);
        const bulletSpeed = 10;
        
        const bullet = new FrontBullet(bulletX, bulletY, this.angle, bulletSpeed, "spaceship");
        bulletsArray.push(bullet);
    }

    draw(context) {

        this.fireThruster.update();
        super.draw(context);

        const centerX = this.position.x + this.width / 2; 
        const centerY = this.position.y + this.height / 2; 

        this.fireThruster.draw(context, centerX, centerY, this.angle);
    }
}

export default StandartShip;