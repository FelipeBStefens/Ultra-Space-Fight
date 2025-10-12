import {updateLife} from "../Gameplay/scriptDOM.js";

class GameObject {

    position;
    width;
    height;
    angle;
    speed;
    image;
    type;
    active;

    constructor(width, height, angle, type) {

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

                //updateLife();
                if (gameObject.type === "enemy") {
                    this.applyPush(gameObject, 0.5);
                }
                else if (gameObject.type === "bullet") {
                    gameObject.active = false;
                }
                
                break;

            case "enemy":

                if (gameObject.type === "bullet") {
                    gameObject.active = false;
                    
                }
                else if (gameObject.type === "enemy") {
                    this.applyPush(gameObject, 0.5);
                }
                else if (gameObject.type === "spaceship") {
                    this.applyPush(gameObject, 0.5);
                }
                
                break;

            case "bullet":
                
                this.active = false;
                break;
        }
    }

    applyPush(gameObject, pushFactor = 0.5) {
        const dx = this.position.x - gameObject.position.x;
        const dy = this.position.y - gameObject.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return; // evita divisão por zero

        const rA = this.width / 2;
        const rB = gameObject.width / 2;

        const overlap = rA + rB - dist;

        
        const nx = dx / dist;
        const ny = dy / dist;

        // Aplica empurrão
        this.position.x += nx * overlap * pushFactor;
        this.position.y += ny * overlap * pushFactor;

        gameObject.position.x -= nx * overlap * (1 - pushFactor);
        gameObject.position.y -= ny * overlap * (1 - pushFactor);
    }
}

export default GameObject;