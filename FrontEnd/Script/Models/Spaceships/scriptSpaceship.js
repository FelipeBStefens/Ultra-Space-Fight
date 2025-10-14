import GameObject from "../scriptGameObject.js";

class Spaceship extends GameObject { 

    constructor(canvas) {

        super(140, 140, 0, "spaceship");

        this.position = {
            x: canvas.width / 2 - this.width / 2, 
            y: canvas.height / 2 - this.height / 2
        };
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
        this.angle -= Math.PI / 180 * 5; // 5 graus
    }

    rotateRight() {
        this.angle += Math.PI / 180 * 5; // 5 graus
    }

    shoot(bulletsArray) {}
}

export default Spaceship;