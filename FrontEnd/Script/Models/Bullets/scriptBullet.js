import { PATH_BULLET_IMAGE } from "../../Gameplay/scriptConstants.js";

class Bullet {

    position;
    angle;
    speed;
    image; 
    width;
    height;
    
    constructor(x, y, angle, speed) {
        this.position = { x, y };
        this.angle = angle;
        this.speed = speed;
        this.image = this.getImage(PATH_BULLET_IMAGE);
        this.width = 20;
        this.height = 50;
    }

    setLength(width, height) {
        this.width = width;
        this.height = height;
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }
    
    update() {
        this.position.x += this.speed * Math.cos(this.angle - Math.PI / 2);
        this.position.y += this.speed * Math.sin(this.angle - Math.PI / 2);
    }
    
    draw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}

export default Bullet;