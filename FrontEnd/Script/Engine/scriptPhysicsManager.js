
import { clamp } from "../Utils/scriptMath.js";

import EntityManager from "./scriptEntityManager.js";


class PhysicsManager {

    canvas;


    constructor(canvas) {
        
        this.canvas = canvas;
    }


    applyPhysics() {


        EntityManager.getAllPhysicalEntities().forEach(gameObject => {


            gameObject.position.x += gameObject.vx;
            gameObject.position.y += gameObject.vy;


            gameObject.vx *= 0.75;
            gameObject.vy *= 0.75;


            if (Math.abs(gameObject.vx) < 0.01) {
                gameObject.vx = 0;
            }
            if (Math.abs(gameObject.vy) < 0.01) {
                gameObject.vy = 0;
            }
                

            const clampX = clamp(gameObject.position.x, 0, this.canvas.width - gameObject.width);
            const clampY = clamp(gameObject.position.y, 0, this.canvas.height - gameObject.height); 
            

            gameObject.position.x = clampX;
            gameObject.position.y = clampY;
        });
    }
}


export default PhysicsManager;