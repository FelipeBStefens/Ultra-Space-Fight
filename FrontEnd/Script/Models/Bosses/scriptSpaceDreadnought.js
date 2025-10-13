import Boss from "./scriptBoss.js";
import { PATH_SPACE_DREADNOUGHT_IMAGE } from "../../Gameplay/scriptConstants.js";
import FrontBullet from "../Bullets/scriptFrontBullet.js";

class SpaceDreadnought extends Boss{

    constructor(canvas, life, cash, score) {
        
        const aspectRatio = 1677 / 968;
        const width = canvas.width;
        const height = width / aspectRatio;
        
        super(0, -450, width, height, 0, life, cash, score, "Space Dreadnought");
        
        this.imagePath = PATH_SPACE_DREADNOUGHT_IMAGE;
    }

    shoot(player, bulletsArray) {

        // Posições das torretas como porcentagem da largura e altura do Boss
        const turretPercents = [
            {x: 0.25, y: 0.7}, // torreta esquerda
            {x: 0.75, y: 0.7}  // torreta direita
        ];

        turretPercents.forEach(percent => {
            // Converte para coordenadas absolutas
            const turretX = this.position.x + this.width * percent.x;
            const turretY = this.position.y + this.height * percent.y;

            // Calcula diferença de posição entre Player e torreta
            const dx = (player.position.x + player.width / 2) - turretX;
            const dy = (player.position.y + player.height / 2) - turretY;

            // Ângulo para mirar no Player
            const angle = Math.atan2(dy, dx) + Math.PI / 2;

            const bulletSpeed = 10;
            const frontBullet = new FrontBullet(turretX, turretY, angle, bulletSpeed, "boss");
            bulletsArray.push(frontBullet);
        });
    }
}

export default SpaceDreadnought;