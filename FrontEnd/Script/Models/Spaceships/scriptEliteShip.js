import { ELITE_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";
import IonThruster from "../Thruster/scriptIonThruster.js";
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
import EntityManager from "../../Engine/scriptEntityManager.js";

class EliteShip extends Spaceship {

    leftIonThruster;
    rightIonThruster;

    constructor(canvas) {
        super(canvas);
        this.speed = 5;
        this.imagePath = ELITE_SHIP_IMAGE;

        this.leftIonThruster = new IonThruster(-this.width / 3, this.height / 2 - 9, 0);
        this.rightIonThruster = new IonThruster(this.width / 3, this.height / 2 - 9, 0);
    }
    
    shoot() {

        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 
        
        const bulletSpeed = 10;

        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        frontBullet.setLength(40, 100);
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        leftBullet.setLength(40, 100);
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        rightBullet.setLength(40, 100);
            
        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
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

export default EliteShip;