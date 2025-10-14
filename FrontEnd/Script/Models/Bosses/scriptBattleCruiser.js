import Boss from "./scriptBoss.js";
import { PATH_BATTLE_CRUISER_IMAGE } from "../../Gameplay/scriptConstants.js";

class BattleCruiser extends Boss {

    constructor(life, score, cash) {
        
        super(1, 1, 407, 1089, 0, life, cash, score, "Battle Cruiser");

        this.image = PATH_BATTLE_CRUISER_IMAGE
    }

    
}

export default BattleCruiser;