import { PATH_SCOUT_ENEMY_IMAGE  } from "../../Gameplay/scriptConstants.js";
import Enemy from "./scriptEnemy.js";

class ScoutEnemy extends Enemy{
    
    minDistance = 30;

    constructor(position) {
        super(position);
        this.speed = 5;
        this.life = 20;
        this.cash = 5;
        this.score = 10;
        this.image = this.getImage(PATH_SCOUT_ENEMY_IMAGE);
    }

    update(player, bulletsArray, canvas) {

        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        
        const dir = Math.hypot(dx, dy);
        
        this.angle = Math.atan2(dy, dx) - Math.PI / 2;

        if (dir > this.minDistance) {
            const normalizedDx = dx / dir;
            const normalizedDy = dy / dir;

            this.position.x += normalizedDx * this.speed;
            this.position.y += normalizedDy * this.speed;
        }
    }
}

export default ScoutEnemy;