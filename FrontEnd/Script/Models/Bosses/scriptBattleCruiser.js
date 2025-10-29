import Boss from "./scriptBoss.js";
import { BATTLE_CRUISER_IMAGE  } from "../../Utils/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";

class BattleCruiser extends Boss {

    minDistance = 400;
    maxDistance = 700;
    lastShotTime = 0;     
    shootCooldown = 1000;

    movePoints = [];              
    isMoving = false;
    framesAtPoint = 0;
    moveDuration = 120;
    moveFrame = 0;
    currentPointIndex = 0;
    targetPointIndex = 1;

    constructor(life, score, cash, canvas) {
        
        super(0, 0, 477/2, 1089/2, Math.PI, life, cash, score, "Battle Cruiser");

        this.position.x = Math.max(100, this.width / 2 + 100);
        this.position.y = Math.max(20, this.height / 2 - 80);

        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0; // 0 a 1
        this.isShaking = false;
        this.shakeTimer = 0;

        this.imagePath = BATTLE_CRUISER_IMAGE;
        this.setMovementPoints(canvas);

        const targetMovePoint = this.movePoints[0];
        this.targetY = targetMovePoint.y - this.height / 2;

        this.isMoving = false;
        this.framesAtPoint = 0;
        // how many frames to stay at each point before moving
        this.framesToStay = 120;
        this.moveDuration = 120;
        this.moveFrame = 0;
        this.currentPointIndex = 0;
        this.targetPointIndex = 1;
    }

    setMovementPoints(canvas) {

        const marginX = Math.max(100, this.width / 2 + 100); // margem horizontal maior
        const marginY = Math.max(20, this.height / 2 - 80); // margem vertical menor


        this.movePoints = [
            // top-left
            { x: marginX, y: marginY },
            // top-right
            { x: canvas.width - marginX, y: marginY },
            // bottom-right
            { x: canvas.width - marginX, y: canvas.height - marginY },
            // bottom-left
            { x: marginX, y: canvas.height - marginY }
        ];
    }

    startIntro(withShake = false, shakeDuration = 0) {
        this.introActive = true;
        this.introActiveEnded = false;
        this.introProgress = 0;

        // A posição inicial Y deve ser fora da tela
        this.startY = -this.height; 
        // A posição final Y é o targetY que calculamos no constructor
        this.endY = this.targetY;

        // Define a posição inicial correta (FORA DA TELA)
        this.position.y = this.startY;
        this.active = true; // Não está atacando/movendo

        this.angle = Math.PI;

        // Lógica para o tremor
        if (withShake) {
            this.isShaking = true;
            this.shakeTimer = shakeDuration;
        }
    }

    update(player, bulletsArray, canvas) {

        if (this.isShaking) {
            this.shakeTimer--;
            if (this.shakeTimer <= 0) {
                this.isShaking = false; 
            }
            return; // Sai do update enquanto treme
        }

        if (this.introActive) {
            const introSpeed = 0.005; // Ajuste a velocidade se necessário (e.g., 1 / 200)
            this.introProgress = Math.min(1, this.introProgress + introSpeed);

            // Interpolação linear
            this.position.y = this.startY + (this.endY - this.startY) * this.introProgress;
            
            // Verifica se a introdução acabou
            if (this.introProgress >= 1) {
                this.introActive = false;
                this.introActiveEnded = true;
                this.active = true; // Libera o boss para o movimento e ataque
                this.position.y = this.endY;
                // O Battle Cruiser deve começar no ponto de movimento 0 (já está na posição)
                this.isMoving = false; // Garante que ele comece parado no ponto inicial
                this.framesAtPoint = 0; // Zera o contador para começar a contagem de espera
            }
            return; // Sai do update enquanto a intro está ativa (em movimento)
        }

        if (this.active) {

            this.updateMovement(canvas);

            let angleTargetX, angleTargetY;

            if (this.isMoving) {
                // 👉 Enquanto se move, olha para o destino do movimento
                angleTargetX = this.endX + this.width / 2;
                angleTargetY = this.endY + this.height / 2;
            } else {
                // 👉 Quando parado, olha para o jogador
                angleTargetX = player.position.x + player.width / 2;
                angleTargetY = player.position.y + player.height / 2;
            }

            // Calcular centro da nave
            const cx_nave = this.position.x + this.width / 2;
            const cy_nave = this.position.y + this.height / 2;

            // Calcular ângulo até o alvo (jogador ou ponto de destino)
            const dx = angleTargetX - cx_nave;
            const dy = angleTargetY - cy_nave;
            this.angle = Math.atan2(dy, dx) + Math.PI / 2;

            // Controle de tiros
            const now = Date.now();
            if (now - this.lastShotTime >= this.shootCooldown) {
                this.shoot(bulletsArray);
                this.lastShotTime = now;
            }
        }
    }

    shoot(bulletsArray) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;

        const frontOffset = this.height / 2; // distância à frente da nave
        const sideOffset = 20;               // distância lateral do canhão

        const offsets = [+1, -1]; // direita e esquerda

        for (const s of offsets) {
            const bulletX = cx
                + frontOffset * Math.cos(this.angle - Math.PI / 2)
                + s * sideOffset * Math.cos(this.angle);
            const bulletY = cy
                + frontOffset * Math.sin(this.angle - Math.PI / 2)
                + s * sideOffset * Math.sin(this.angle);

                const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, 10, "enemy");
            frontBullet.setLength(40, 100); 
            bulletsArray.push(frontBullet);
        }
    }

    updateMovement(canvas) {

        // If stationary, count frames until we should start moving
        if (!this.isMoving) {
            this.framesAtPoint++;

            if (this.framesAtPoint >= this.framesToStay) {
                this.isMoving = true;
                this.framesAtPoint = 0;

                // origin and destination (convert center points to top-left positions)
                const origin = this.movePoints[this.currentPointIndex];
                const destIndex = (this.currentPointIndex + 1) % this.movePoints.length;
                const dest = this.movePoints[destIndex];

                console.log(destIndex);

                this.startX = origin.x - this.width / 2;
                this.startY = origin.y - this.height / 2;
                this.endX = dest.x - this.width / 2;
                this.endY = dest.y - this.height / 2;

                // reset frame counters for the interpolation
                this.moveDuration = Math.max(1, this.moveDuration);
                this.moveFrame = 0;
                this.targetPointIndex = destIndex;
            }
            return;
        }

        // moving: advance frame and interpolate
        this.moveFrame++;
        const t = Math.min(1, this.moveFrame / this.moveDuration);
        this.position.x = this.startX + (this.endX - this.startX) * t;
        this.position.y = this.startY + (this.endY - this.startY) * t;
        // finished movement
        if (this.moveFrame >= this.moveDuration) {
            this.position.x = this.endX;
            this.position.y = this.endY;
            this.currentPointIndex = this.targetPointIndex;
            this.isMoving = false;
            this.framesAtPoint = 0;
        }
    }
}

export default BattleCruiser;