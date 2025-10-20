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

        // Boss UI (life bar) will be shown by the gameplay/stage manager when
        // the boss fight actually starts to avoid lifecycle and ordering issues.
    }

    updateLife(damage) {
        this.life -= damage;
        updateBossLifeBar(this.life);

        if (this.life <= 0) {
            this.active = false;
            hideBossLifeBar();
        }
    }

    reset() {
        this.life = this.maxLife; 
        this.active = false;
        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0;
        this.isShaking = false;
        this.shakeTimer = 0;
    }
}

export default Boss;