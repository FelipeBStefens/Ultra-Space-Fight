
import GameObject from "../scriptGameObject.js";

import { getMiddlePosition, rotation } from "../../Utils/scriptMath.js";

import { takeLife, getSpeed } from "../../Gameplay/scriptHeadsUpDisplay.js";


class Spaceship extends GameObject { 


    constructor(canvas) {


        super(140, 140, 0, "spaceship");


        this.position = getMiddlePosition(canvas, this.width, this.height);

        this.speed = getSpeed();
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

        this.angle -= rotation(5) 
    }


    rotateRight() {

        this.angle += rotation(5);
    }


    shoot() {}


    onCollision(gameObject, startShake) {


        const died = takeLife();
        

        if (died) {

            try {


                window.dispatchEvent(new CustomEvent("playerGameOver"));
            } 
            catch (e) {

            }
        }


        if (gameObject.type === "bullet") {
            

            gameObject.active = false;
        }
    }
}


export default Spaceship;