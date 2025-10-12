import { PATH_TANK_ENEMY_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Enemy from "./scriptEnemy.js";

class TankEnemy extends Enemy{
    
    minDistance = 30;
    maxDistance = 700;
    lastShotTime = 0;     
    shootCooldown = 1000;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.life = 70;
        this.cash = 15;
        this.score = 30;
        this.image = this.getImage(PATH_TANK_ENEMY_IMAGE);
    }

    update(player, bulletsArray, canvas) {

        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        
        const dir = Math.hypot(dx, dy);
        
        this.angle = Math.atan2(dy, dx) + Math.PI / 2;

        if (dir > this.minDistance) {
            const normalizedDx = dx / dir;
            const normalizedDy = dy / dir;

            this.position.x += normalizedDx * this.speed;
            this.position.y += normalizedDy * this.speed;
        }

        const now = Date.now();
        if (dir <= this.maxDistance && now - this.lastShotTime >= this.shootCooldown) {
            this.shoot(bulletsArray);
            this.lastShotTime = now;
        }
    }

    shoot(bulletsArray) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;
        const frontOffset = this.height / 2;
        const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
        const bulletY = cy + frontOffset * Math.sin(this.angle - Math.PI / 2);
        const bulletSpeed = 10;

    const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, bulletSpeed, "enemy");
        bulletsArray.push(frontBullet);
    }
}

export default TankEnemy;