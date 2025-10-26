import { PATH_FREIGHTER_SHIP_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Spaceship from "./scriptSpaceship.js";
import IonThruster from "../Thruster/scriptIonThruster.js";

class FreighterShip extends Spaceship {

    leftIonThruster;
    rightIonThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = PATH_FREIGHTER_SHIP_IMAGE;

        this.leftIonThruster = new IonThruster(-this.width / 4, this.height / 2 - 9, 0);
        this.rightIonThruster = new IonThruster(this.width / 4, this.height / 2 - 9, 0);
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

        const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, 10, "spaceship");
            frontBullet.setLength(40, 100); 
            bulletsArray.push(frontBullet);
        }
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

export default FreighterShip;