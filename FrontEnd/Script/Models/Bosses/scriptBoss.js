import GameObject from "../scriptGameObject.js";
import { showBossLifeBar, updateBossLifeBar, hideBossLifeBar } from "../../Gameplay/scriptDOM.js";

class Boss extends GameObject {

    maxLife;
    life;
    cash;
    score;
    name;

    constructor(x, y, width, height, angle, life, cash, score, name) {

        super(width, height, angle, "boss");
        this.position = {x, y};
        this.name = name;
        this.life = life;
        this.maxLife = life;
        this.cash = cash;
        this.score = score;

        showBossLifeBar(this.name, this.life);
    }

    updateLife(damage) {
        this.life -= damage;
        updateBossLifeBar(this.life);

        if (this.life <= 0) {
            this.active = false;
            hideBossLifeBar();
        }
    }
}

export default Boss;