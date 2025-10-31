import GameObject from "../scriptGameObject.js";
import Explosion from "../Explosion/scriptExplosion.js";
import SoundManager from "../../Engine/scriptSoundManager.js";
import { updateDefeatedBoss, updateBossLifeBar, hideBossLifeBar } from "../../Gameplay/scriptHeadsUpDisplay.js";
import EntityManager from "../../Engine/scriptEntityManager.js";

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
    }

    updateLife(damage, startShake) {
        this.life -= damage;
        updateBossLifeBar(this.life);

        if (this.life <= 0 && this.active) {
            hideBossLifeBar();
            updateDefeatedBoss();
            
            this.startDeathAnimation(startShake);
        }
    }

    reset() {
        this.life = this.maxLife; 
        this.finished = false;
        this.active = false;
        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0;
        this.isShaking = false;
        this.shakeTimer = 0;
    }

    startDeathAnimation(startShake) {

        SoundManager.stopMusic();
        SoundManager.playSound("scream");
        this.active = false;

        const explosionCount = 10; // número de pequenas explosões
        const explosionDelay = 150; // intervalo entre elas (ms)

        for (let i = 0; i < explosionCount; i++) {
            setTimeout(() => {
                const offsetX = Math.random() * this.width * 0.8 + this.width * 0.1;
                const offsetY = Math.random() * this.height * 0.8 + this.height * 0.1;
                const explosion = new Explosion(
                    this.position.x + offsetX,
                    this.position.y + offsetY,
                    111 + Math.random() * 100, // tamanho pequeno
                    129 + Math.random() * 100,
                    "shootExplosion"
                );
                EntityManager.addExplosion(explosion);
            }, i * explosionDelay);
        }

        setTimeout(() => {
            const finalExplosion = new Explosion(
                this.position.x,
                this.position.y, 
                666, 777,
                "enemyExplosion"
            );
            EntityManager.addExplosion(finalExplosion);

            if (startShake) startShake(90, 25);

            setTimeout(() => {
                this.finished = true;
            }, 1000);
        }, explosionCount * explosionDelay + 500);
    }
}

export default Boss;