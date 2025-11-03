
import GameObject from "../scriptGameObject.js"; 

import { updateScore, updateCash, getDamage } from "../../Gameplay/scriptHeadsUpDisplay.js";

import { rotation } from "../../Utils/scriptMath.js";


class Enemy extends GameObject { 


    life;  
    cash;  
    score; 


    constructor(position) {


        super(140, 140, 0, "enemy");

        this.position = position;
    }


    moveLeft() {
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }

    moveUp() {
        this.position.y -= this.speed;
    }

    moveDown() {
        this.position.y += this.speed;
    }

    rotateLeft() {
        this.angle -= rotation(5);
    }

    rotateRight() {
        this.angle += rotation(5);
    }


    updateLife(damage) {
        this.life -= damage;
        

        if (this.life <= 0) {
            

            if (this.ionThruster) {
                this.ionThruster.stopSound();
            }


            this.active = false;      
            updateScore(this.score);  
            updateCash(this.cash);    
        }
    }


    update(player, bulletsArray, canvas) {}


    onCollision(gameObject, startShake) {


        if (gameObject.type === "bullet") {

            this.updateLife(getDamage());
        }
    }
}


export default Enemy;