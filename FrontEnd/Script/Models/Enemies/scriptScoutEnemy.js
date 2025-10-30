import { SCOUT_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";
import Enemy from "./scriptEnemy.js";
import { getDifferentialVector, getVectorMagnitude, updateAngle, getNormalizedVector } from "../../Utils/scriptMath.js";

class ScoutEnemy extends Enemy{
    
    minDistance = 30;
    kamikaze = true;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.life = 20;
        this.cash = 5;
        this.score = 10;
        this.imagePath = SCOUT_ENEMY_IMAGE;
    }

    update(player, bulletsArray, canvas) {

        const differentialVector = getDifferentialVector(this.position, player);
        const magnitude = getVectorMagnitude(differentialVector);
        
        this.angle = updateAngle(differentialVector);

        if (magnitude > this.minDistance) {
            
            const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        }
    }
}

export default ScoutEnemy;