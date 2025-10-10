import { PATH_SOLDIER_ENEMY_IMAGE  } from "../../Gameplay/scriptConstants.js";
import Enemy from "./scriptEnemy.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";

class SoldierEnemy extends Enemy{
    
    minDistance = 400;
    maxDistance = 700;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.image = this.getImage(PATH_SOLDIER_ENEMY_IMAGE);
    }

    update(player, bulletsArray, canvas) {

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

        if (dist <= this.maxDistance) {

            const cx = this.position.x + this.width / 2;
            const cy = this.position.y + this.height / 2;
            const frontOffset = this.height / 2; // distância do centro até a ponta
            const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
            const bulletY = cy + frontOffset * Math.sin(this.angle - Math.PI / 2);
            const bulletSpeed = 10;
            
            const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, bulletSpeed);
            bulletsArray.push(frontBullet);
        }

        this.position.x = Math.max(0, Math.min(canvas.width - this.width, this.position.x));
        this.position.y = Math.max(0, Math.min(canvas.height - this.height, this.position.y));
    }
}

export default SoldierEnemy;