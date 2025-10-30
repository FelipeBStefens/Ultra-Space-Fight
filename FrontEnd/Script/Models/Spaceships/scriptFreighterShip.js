import { FREIGHTER_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Spaceship from "./scriptSpaceship.js";
import IonThruster from "../Thruster/scriptIonThruster.js";
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";

class FreighterShip extends Spaceship {

    leftIonThruster;
    rightIonThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = FREIGHTER_SHIP_IMAGE;

        this.leftIonThruster = new IonThruster(-this.width / 4, this.height / 2 - 9, 0);
        this.rightIonThruster = new IonThruster(this.width / 4, this.height / 2 - 9, 0);
    }

    shoot(bulletsArray) {

        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 
        
        const sideOffset = 20;               
        const offsets =  [1, -1];

        for (const offset of offsets) {
            
            const bulletX = frontOffset.x + offset * sideOffset * Math.cos(this.angle);
            const bulletY = frontOffset.y + offset * sideOffset * Math.sin(this.angle);

            const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, 10, "spaceship");
            frontBullet.setLength(40, 100);
            bulletsArray.push(frontBullet);
        }        
    }

    draw(context) {

        this.leftIonThruster.update();
        this.rightIonThruster.update();
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height); 

        this.leftIonThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
        this.rightIonThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

export default FreighterShip;