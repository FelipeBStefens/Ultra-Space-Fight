import { SOLDIER_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";
import Enemy from "./scriptEnemy.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import IonThruster from "../Thruster/scriptIonThruster.js";
import { getDifferentialVector, getVectorMagnitude, getNormalizedVector, getLateralFactor, maxValuePosition, getCenterVector, getFrontOffsetVector, updateAngle } from "../../Utils/scriptMath.js";
import EntityManager from "../../Engine/scriptEntityManager.js";

class SoldierEnemy extends Enemy{
    
    minDistance = 400;
    maxDistance = 700;
    lastShotTime = 0;     
    shootCooldown = 1000;
    ionThruster;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.life = 15;
        this.cash = 10;
        this.score = 20;
        this.imagePath = SOLDIER_ENEMY_IMAGE;

        this.ionThruster = new IonThruster(0, this.height / 6 + 5, 0);
    }

    update(player, canvas) {

        this.ionThruster.update();

        const differentialVector = getDifferentialVector(this.position, player);
        const magnitude = getVectorMagnitude(differentialVector);

        this.angle = updateAngle(differentialVector);

        if (magnitude < this.minDistance) {
            
            const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

            this.position.x -= normalizedVector.normalizedX * this.speed;
            this.position.y -= normalizedVector.normalizedY * this.speed;
        } 
        else if (magnitude > this.maxDistance) {
               
            const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        } 
        else {
            
            const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

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

        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "enemy");
        
        EntityManager.addBullet(frontBullet);
    }

    draw(context) {
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height);  

        this.ionThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

export default SoldierEnemy;