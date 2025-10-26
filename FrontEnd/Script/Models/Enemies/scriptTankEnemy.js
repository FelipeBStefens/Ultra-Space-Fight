import { PATH_TANK_ENEMY_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import Enemy from "./scriptEnemy.js";
import IonThruster from "../Thruster/scriptIonThruster.js";

class TankEnemy extends Enemy{
    
    minDistance = 200;
    maxDistance = 400;
    lastShotTime = 0;     
    shootCooldown = 1000;
    ionThruster;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.life = 70;
        this.cash = 15;
        this.score = 30;
        this.imagePath = PATH_TANK_ENEMY_IMAGE;

        this.ionThruster = new IonThruster(0, this.height / 3 + 5, 0);
    }

    update(player, bulletsArray, canvas) {

        this.ionThruster.update();

        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const dist = Math.hypot(dx, dy);

        this.angle = Math.atan2(dy, dx) + Math.PI / 2; 

        if (dist < this.minDistance) {
            
            const normalizedDx = dx / dist;
            const normalizedDy = dy / dist;
            this.position.x -= normalizedDx * this.speed;
            this.position.y -= normalizedDy * this.speed;

        } 
        else if (dist > this.maxDistance) {
            
            const normalizedDx = dx / dist;
            const normalizedDy = dy / dist;
            this.position.x += normalizedDx * this.speed; 
            this.position.y += normalizedDy * this.speed;

        } 
        else {
            
            const normalizedDx = dx / dist;
            const normalizedDy = dy / dist;

            // Perpendicular: (-dy, dx) ou (dy, -dx)
            const lateralFactor = Math.sin(Date.now() / 500) * this.speed * 0.3;
            this.position.x += -normalizedDy * lateralFactor;
            this.position.y += normalizedDx * lateralFactor;
        }

        const now = Date.now();
        if (dist <= this.maxDistance && now - this.lastShotTime >= this.shootCooldown) {
            this.shoot(bulletsArray);
            this.lastShotTime = now;
        }

        this.position.x = Math.max(0, Math.min(canvas.width - this.width, this.position.x));
        this.position.y = Math.max(0, Math.min(canvas.height - this.height, this.position.y));
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

    draw(context) {
        super.draw(context);

        const centerX = this.position.x + this.width / 2; 
        const centerY = this.position.y + this.height / 2; 

        this.ionThruster.draw(context, centerX, centerY, this.angle);
    }
}

export default TankEnemy;