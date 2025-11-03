
import SoundManager from "./scriptSoundManager.js";

import { GAMEPLAY_SOUNDTRACK, BOSS_GAMEPLAY_SOUNDTRACK } from "../Utils/scriptConstants.js";

import { showBossLifeBar, hideBossLifeBar } from "../Gameplay/scriptHeadsUpDisplay.js";

import EntityManager from "./scriptEntityManager.js";


class GameManager {


    static SHAKE_DURATION = 240; 
    static isPaused = false;
    static isGameOver = false;
    static isBossFight = false;        
    static bossMusicStarted = false; 
    static currentBoss = null;       
    static bossIndex = 0;            
    static bosses = [];              
    static enemiesToDefeatBeforeBoss = 50; 
    

    static initBosses(bossList) {

        this.bosses = bossList;

        this.isPaused = false;
        this.isGameOver = false;
        this.isBossFight = false;
        this.currentBoss = null;
        this.bossMusicStarted = false;
        this.bossIndex = 0;


        SoundManager.playMusic(GAMEPLAY_SOUNDTRACK);
    }


    static update(spawner, shakeEffect) {
        

        if (this.isBossFight) {
            

            this.updateBossMusic(shakeEffect);

            const boss = this.currentBoss;
            if (boss) {

                boss.update(); 
                


                if (boss.finished && boss.introActiveEnded) {
                    this.endBossFight();

                    EntityManager.enemiesDefeated = 0;
                }
            }
        } 

        else {

            spawner.update();


            if (EntityManager.enemiesDefeated >= this.enemiesToDefeatBeforeBoss) {
                this.startBossFight(shakeEffect);
            }
        }
    }


    static startBossFight(shakeEffect) {

        if (this.isBossFight) {
            return;
        }

        this.isBossFight = true;

        this.currentBoss = this.bosses[this.bossIndex];

        this.currentBoss.reset();


        SoundManager.stopMusic();
        SoundManager.playSound("earthquake");


        shakeEffect.startShake(this.SHAKE_DURATION, 20);


        this.currentBoss.startIntro(true, this.SHAKE_DURATION);


        showBossLifeBar(this.currentBoss.name, this.currentBoss.maxLife);

        this.bossMusicStarted = false;
    }


    static updateBossMusic(shakeEffect) {

        if (!this.isBossFight || this.bossMusicStarted) {
            return;
        }


        if (shakeEffect.shakeTime <= 0) {

            SoundManager.playMusic(BOSS_GAMEPLAY_SOUNDTRACK);

            this.bossMusicStarted = true;
        }
    }


    static endBossFight() {
        
        if (!this.isBossFight) {
            return;
        }

        this.isBossFight = false;

        this.bossIndex = (this.bossIndex + 1) % this.bosses.length;
        

        SoundManager.playMusic(GAMEPLAY_SOUNDTRACK);
        hideBossLifeBar();

        this.currentBoss = null;
        this.bossMusicStarted = false;
    }
}


export default GameManager;