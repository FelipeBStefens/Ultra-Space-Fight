import { PATH_STANDART_SHIP_IMAGE } from "../Gameplay/scriptConstants.js";
import Bullet from "./scriptBullet.js";

class Player {

    width;
    height;
    position; 
    speed;
    image;
    angle;  

    constructor(canvas, speed) {
        this.speed = speed;
        this.width = 140;
        this.height = 140;
        this.position = {
            x: canvas.width / 2 - this.width / 2, 
            y: canvas.height / 2 - this.height / 2
        };
        this.angle = 0; // <── começa sem rotação
        this.image = this.getImage(PATH_STANDART_SHIP_IMAGE);
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }

    draw(context) {
        context.save();

        // Move o ponto de origem para o centro do player
        context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        // Rotaciona o contexto temporariamente
        context.rotate(this.angle);
        // Desenha a imagem no novo sistema rotacionado
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        context.restore();
    }

    moveLeft() {
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }

    moveUp() {
        this.position.y -= this.speed;
    }

    moveDown() {
        this.position.y += this.speed;
    }

    rotateLeft() {
        this.angle -= Math.PI / 180 * 5; // 5 graus
    }

    rotateRight() {
        this.angle += Math.PI / 180 * 5; // 5 graus
    }

    shoot(bulletsArray, bulletImage) {
        const cx = this.position.x + this.width / 2;
        const cy = this.position.y + this.height / 2;
        const frontOffset = this.height / 2; // distância do centro até a ponta
        const bulletX = cx + frontOffset * Math.cos(this.angle - Math.PI / 2);
        const bulletY = cy + frontOffset * Math.sin(this.angle -  Math.PI / 2);
        const bulletSpeed = 10;

        const bullet = new Bullet(bulletX, bulletY, this.angle, bulletSpeed, bulletImage);
        bulletsArray.push(bullet);
    }
}

export default Player;
