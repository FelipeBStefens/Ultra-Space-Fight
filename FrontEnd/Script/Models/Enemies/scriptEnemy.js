import GameObject from "../scriptGameObject"; 

class Enemy extends GameObject { 

    constructor(position) {

        super(position, 140, 140, 0, "enemy");
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

    update(player, bulletsArray, canvas) {}
}

export default Enemy;