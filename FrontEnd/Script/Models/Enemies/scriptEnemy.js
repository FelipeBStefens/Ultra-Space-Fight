
class Enemy {

    width;
    height;
    position; 
    speed;
    image;
    angle;  

    constructor(position) {
        this.width = 140;
        this.height = 140;
        this.position = position;
        this.angle = 0; // <── começa sem rotação
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

    update(player, bulletsArray, canvas) {}
}

export default Enemy;