import { PATH_TANK_ENEMY_IMAGE } from "../../Gameplay/scriptConstants.js";
import Enemy from "./scriptEnemy.js";

class TankEnemy extends Enemy{
    
    constructor(position) {
        super(position);
        this.speed = 5;
        this.image = this.getImage(PATH_TANK_ENEMY_IMAGE);
    }
}

export default TankEnemy;