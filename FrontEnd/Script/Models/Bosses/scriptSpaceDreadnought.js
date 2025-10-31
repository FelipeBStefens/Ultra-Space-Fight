import Boss from "./scriptBoss.js";
import { SPACE_DREADNOUGHT_IMAGE  } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import { scalarLerp, getPercentOf, getCenterVector, getDifferentialVectorByObject, updateAngle } from "../../Utils/scriptMath.js";

class SpaceDreadnought extends Boss{

    enemySpawner;

    shootCooldown = 100;
    spawnCooldown = 300;

    constructor(canvas, life, cash, score, enemySpawner) {
        
        const aspectRatio = 1677 / 605;
        const width = canvas.width;
        const height = width / aspectRatio;
        
        super(0, -canvas.height * 0.3, width, height, 0, life, cash, score, "Space Dreadnought");
    
        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0; // 0 a 1
        this.targetY = -this.height / 2;
        this.isShaking = false;    // <--- NOVO: Flag para saber se o shake está ativo
        this.shakeTimer = 0;

        this.enemySpawner = enemySpawner;
        this.imagePath = SPACE_DREADNOUGHT_IMAGE;
    }

    startIntro(withShake = false, shakeDuration = 0) {
        this.introActive = true;
        this.introActiveEnded = false;
        this.introProgress = 0;

        // posição inicial (totalmente fora da tela, acima)
        this.startY = -this.height; 
        this.endY = this.targetY;

        // Define a posição inicial correta (FORA DA TELA)
        this.position.y = this.startY;
        this.active = true; // Não está atacando

        // Lógica para o tremor
        if (withShake) {
            this.isShaking = true;
            this.shakeTimer = shakeDuration; // Recebe 120 frames do scriptGameplay
        }
    }

    update(player, bulletsArray, canvas) {

        if (this.isShaking) {
            this.shakeTimer--;
            if (this.shakeTimer <= 0) {
                this.isShaking = false; 
            }
            return; 
        }

        if (this.introActive) {
            const introSpeed = 0.005; 
            this.introProgress = Math.min(1, this.introProgress + introSpeed);

            this.position.y = scalarLerp(this.startY, this.endY, this.introProgress);

            if (this.introProgress >= 1) {
                this.introActive = false;
                this.introActiveEnded = true;
                this.active = true;
                this.position.y = this.endY;
            }

            return; 
        }

        if (this.active) {
            this.updatePhase(); 

            if (this.shootCooldown <= 0) {
                this.shoot(player, bulletsArray); 
                this.shootCooldown = this.shootInterval;
            }
            this.shootCooldown--; 

            if (this.spawnCooldown <= 0) {
                this.spawnEnemies(); 
                this.spawnCooldown = this.spawnInterval; 
            }
            this.spawnCooldown--;
        }
    }

    // Define fase com base na vida
    updatePhase() {
        const lifePercent = this.life / this.maxLife; // considere maxLife
        
        if (lifePercent > 0.7) {
            this.phase = "initial";
            this.shootInterval = 200; // frames
            this.spawnInterval = 450;
            this.spawnTypes = ["scoutEnemy", "soldierEnemy"];
        }
        else if (lifePercent > 0.2) {
            this.phase = "conflict";
            this.shootInterval = 120;
            this.spawnInterval = 300;
            this.spawnTypes = ["scoutEnemy", "soldierEnemy", "tankEnemy"];
        }
        else {
            this.phase = "desperate";
            this.shootInterval = 80;
            this.spawnInterval = 150;
            this.spawnTypes = ["scoutEnemy", "soldierEnemy", "tankEnemy", "eliteEnemy"];
        }
    }

    shoot(player, bulletsArray) {

        const turretPercents = [
            {x: 25.00, y: 70.0}, 
            {x: 75.00, y: 70.0}  
        ];

        turretPercents.forEach(percent => {

            const turretX = this.position.x + getPercentOf(this.width, percent.x);
            const turretY = this.position.y + getPercentOf(this.height, percent.y);

            const centerPosition = getCenterVector(player.position, player.width, player.height);
            const differentialVector = getDifferentialVectorByObject({x: centerPosition.x, y: centerPosition.y}, {objectX: turretX, objectY: turretY}); 

            const angle = updateAngle(differentialVector);
            console.log(turretX);
            console.log(turretY);
            console.log(angle);
            const bulletSpeed = 10;
            const frontBullet = new FrontBullet(turretX, turretY, angle, bulletSpeed, "boss");
            bulletsArray.push(frontBullet);
        });
    }

    spawnEnemies() {
        let positions;

        // Define posições fixas por fase (porcentagem relativa ao Boss)
        if (this.phase === "initial") {
            positions = [
                {x: 0.45, y: 0.75} // só um inimigo
            ];
        } else if (this.phase === "conflict") {
            positions = [
                {x: 0.3, y: 0.7},
                {x: 0.5, y: 0.75},
                {x: 0.7, y: 0.7}
            ];
        } else { // desperate
            positions = [
                {x: 0.2, y: 0.7},
                {x: 0.4, y: 0.75},
                {x: 0.6, y: 0.7},
                {x: 0.8, y: 0.75},
                {x: 0.5, y: 0.8}
            ];
        }

        // Spawn de inimigos nas posições definidas
        positions.forEach(pos => {
            // Escolhe tipo de inimigo aleatoriamente dentro da fase
            const type = this.spawnTypes[Math.floor(Math.random() * this.spawnTypes.length)];
            this.enemySpawner.spawnEnemyAt(type, this, pos.x, pos.y);
        });
    }
}

export default SpaceDreadnought;