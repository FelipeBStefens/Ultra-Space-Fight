import GameObject from "../scriptGameObject.js"; 
import { updateScore, updateCash } from "../../Gameplay/scriptDOM.js";

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
        this.angle -= Math.PI / 180 * 5; // 5 graus
    }

    rotateRight() {
        this.angle += Math.PI / 180 * 5; // 5 graus
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
}

export default Enemy;