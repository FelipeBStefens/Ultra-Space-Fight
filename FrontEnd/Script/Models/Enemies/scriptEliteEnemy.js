import { PATH_ELITE_ENEMY_IMAGE  } from "../../Gameplay/scriptConstants";
import Enemy from "./scriptEnemy";

class EliteEnemy extends Enemy {
    
    constructor(position) {
        super(position);
        this.speed = 5;
        this.image = this.getImage(PATH_ELITE_ENEMY_IMAGE);
    }
}

export default EliteEnemy;