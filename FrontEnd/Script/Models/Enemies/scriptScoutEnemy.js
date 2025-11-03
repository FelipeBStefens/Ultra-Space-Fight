
import { SCOUT_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";

import Enemy from "./scriptEnemy.js";

import { getDifferentialVector, getVectorMagnitude, updateAngle, getNormalizedVector } from "../../Utils/scriptMath.js";


class ScoutEnemy extends Enemy{
    

    minDistance = 30;


    constructor(position) {

        super(position);
        

        this.speed = 8;          
        this.life = 40;          
        this.cash = 5;           
        this.score = 10;         
        this.imagePath = SCOUT_ENEMY_IMAGE;
    }


    update(player, canvas) {


        const differentialVector = getDifferentialVector(this.position, player);

        const magnitude = getVectorMagnitude(differentialVector);
        

        this.angle = updateAngle(differentialVector);


        if (magnitude > this.minDistance) {
            


            const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);



            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        }
    }


    onCollision(gameObject, startShake) {
    
        super.onCollision(gameObject, startShake);
        
        if (gameObject.type === "spaceship") {


            this.updateLife(this.life);
        }    
    }
}


export default ScoutEnemy;