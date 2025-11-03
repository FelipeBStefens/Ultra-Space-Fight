
import AssetLoader from "../Engine/scriptAssetLoader.js";


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
        this.vx = 0;
        this.vy = 0;
        this.mass = 1;
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


        if (!this.image && this.imagePath) {

            const loaded = AssetLoader.get(this.imagePath);

            if (loaded) this.image = loaded;
        }


        if (this.image && this.image.complete) {

            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        }


        context.restore();
    }



    onCollision(gameObject, startShake) {}
}


export default GameObject;