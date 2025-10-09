import { PATH_FREIGHTER_SHIP_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Spaceship from "./scriptSpaceship.js";

class FreighterShip extends Spaceship {

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.image = this.getImage(PATH_FREIGHTER_SHIP_IMAGE);
    }

    shoot(bulletsArray) {

        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;

        const frontOffset = this.height / 2; // distância à frente da nave
        const sideOffset = 20;               // distância lateral do canhão

        const offsets = [+1, -1]; // direita e esquerda

        for (const s of offsets) {
            const bulletX = cx
                + frontOffset * Math.cos(this.angle - Math.PI / 2)
                + s * sideOffset * Math.cos(this.angle);
            const bulletY = cy
                + frontOffset * Math.sin(this.angle - Math.PI / 2)
                + s * sideOffset * Math.sin(this.angle);

            const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, 10);
            frontBullet.setLength(40, 100); 
            bulletsArray.push(frontBullet);
        }
    }
}

export default FreighterShip;