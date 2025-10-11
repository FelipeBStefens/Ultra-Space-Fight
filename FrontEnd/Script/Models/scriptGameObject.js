
class GameObject {

    position;
    width;
    hight;
    angle;
    speed;
    image;
    type;
    active;

    constructor(position, width, height, angle, type) {

        this.position = position;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.type = type;
        this.active = true;
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }

    draw(context) {

        context.save();
        context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }

    onCollision(gameObject) {
        switch (this.type) {
            case "spaceship":
                if (gameObject.type === "enemy" || gameObject.type === "bullet") {
                    this.active = false; // exemplo: player morreu
                    console.log("Player colidiu com", gameObject.type);
                }
                break;
            case "enemy":
                if (gameObject.type === "bullet") {
                    this.active = false; // inimigo destruído
                    console.log("Enemy atingido por bala");
                }
                break;
            case "bullet":
                // toda bala some ao colidir
                this.active = false;
                console.log("Bala colidiu com", gameObject.type);
                break;
        }
    }
}

export default GameObject;