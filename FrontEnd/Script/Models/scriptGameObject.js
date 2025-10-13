import {updateLife, getDamage} from "../Gameplay/scriptDOM.js";
import AssetLoader from "../Gameplay/scriptAssetLoader.js";

class GameObject {

    position;
    width;
    height;
    angle;
    speed;
    image;
    imagePath;
    type;
    active;
    vx;
    vy;
    mass;
    
    constructor(width, height, angle, type) {

        this.width = width;
        this.height = height;
        this.angle = angle;
        this.type = type;
        this.active = true;
        this.imagePath = null;
        this.vx = 0; // velocity x (used for repulsion impulses)
        this.vy = 0; // velocity y
        this.mass = 1; // default mass (can be overridden by subclasses)
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

        // Lazy-resolve the image from the AssetLoader if available
        if (!this.image && this.imagePath) {
            const loaded = AssetLoader.get(this.imagePath);
            if (loaded) this.image = loaded;
        }

        if (this.image && this.image.complete) {
            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            // Fallback visual if image isn't loaded: simple rectangle (preserves orientation)
            context.fillStyle = "#fff";
            context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }

        context.restore();
    }

    onCollision(gameObject) {
        switch (this.type) {
            case "spaceship":

                //updateLife();
                if (gameObject.type === "bullet") {
                    gameObject.active = false;
                }
                break;

            case "enemy":

                if (gameObject.type === "bullet") {
                    this.updateLife(getDamage());
                } 
                break;

            case "bullet":
                
                this.active = false;
                break;
            case "boss":

                if (gameObject.type === "bullet") {
                    this.updateLife(getDamage());
                }
                break;
        }
    }
}

export default GameObject;