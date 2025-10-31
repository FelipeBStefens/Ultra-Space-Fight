import { ELITE_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";
import { updateDefeatedElite } from "../../Gameplay/scriptHeadsUpDisplay.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
import Enemy from "./scriptEnemy.js";
import IonThruster from "../Thruster/scriptIonThruster.js";
import { getDifferentialVector, getVectorMagnitude, getNormalizedVector, getLateralFactor, maxValuePosition, getCenterVector, getFrontOffsetVector, updateAngle } from "../../Utils/scriptMath.js";
import EntityManager from "../../Engine/scriptEntityManager.js";

class EliteEnemy extends Enemy {
    
    minDistance = 400;
    maxDistance = 700;
    lastShotTime = 0;     
    shootCooldown = 1000;
    ionThruster;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.life = 50;
        this.cash = 20;
        this.score = 40;
        this.imagePath = ELITE_ENEMY_IMAGE;
    
        this.ionThruster = new IonThruster(0, this.height / 3 + 13, 0);
    }

    update(player, canvas) {

        this.ionThruster.update();

        const differentialVector = getDifferentialVector(this.position, player);
        const magnitude = getVectorMagnitude(differentialVector);
        const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

        this.angle = updateAngle(differentialVector);

        if (magnitude < this.minDistance) {
            
            this.position.x -= normalizedVector.normalizedX * this.speed;
            this.position.y -= normalizedVector.normalizedY * this.speed;
        } 
        else if (magnitude > this.maxDistance) {
            
            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        } 
        else {
            
            const lateralFactor = getLateralFactor(this.speed);
            this.position.x += -normalizedVector.normalizedX * lateralFactor;
            this.position.y += normalizedVector.normalizedY * lateralFactor;
        }

        const now = Date.now();
        if (magnitude <= this.maxDistance && now - this.lastShotTime >= this.shootCooldown) {
            this.shoot();
            this.lastShotTime = now;
        }

        this.position = maxValuePosition(canvas, this.width, this.height, this.position);
    }

    shoot() {

        const centerPosition = getCenterVector(this.position, this.width, this.height);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 

        const bulletSpeed = 10;

        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        frontBullet.setLength(40, 100);
        
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        leftBullet.setLength(40, 100);
        
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        rightBullet.setLength(40, 100);

        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
    }

    draw(context) {
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height); 

        this.ionThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }

    updateLife(damage) {

        super.updateLife(damage);
        if (this.life <= 0) {
            updateDefeatedElite();
        }
    }
}

export default EliteEnemy;