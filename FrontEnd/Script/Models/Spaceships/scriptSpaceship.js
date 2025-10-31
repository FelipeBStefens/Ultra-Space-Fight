import GameObject from "../scriptGameObject.js";
import { getMiddlePosition, rotation } from "../../Utils/scriptMath.js";

class Spaceship extends GameObject { 

    constructor(canvas) {

        super(140, 140, 0, "spaceship");

        this.position = getMiddlePosition(canvas, this.width, this.height);
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
}

export default Spaceship;