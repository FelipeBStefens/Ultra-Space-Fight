import { DESTROYER_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Spaceship from "./scriptSpaceship.js";
import FireThruster from "../Thruster/scriptFireThruster.js";
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
import EntityManager from "../../Engine/scriptEntityManager.js";

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

    shoot() {

        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 
        
        const bulletSpeed = 10;
        
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");

        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
    }

    draw(context) {

        this.leftFireThruster.update();
        this.rightFireThruster.update();
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height); 

        this.leftFireThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
        this.rightFireThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

export default DestroyerShip;