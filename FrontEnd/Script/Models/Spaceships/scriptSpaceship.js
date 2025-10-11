import GameObject from "../scriptGameObject";

class Spaceship extends GameObject { 

    constructor(canvas) {

        const position = {
            x: canvas.width / 2 - width / 2, 
            y: canvas.height / 2 - height / 2
        };
        
        super(position, 140, 140, 0, "spaceship");
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