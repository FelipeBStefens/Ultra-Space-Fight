// Imports the base Bullet class;
import Bullet from "./scriptBullet.js";
// Imports the math utility function for calculating the new position based on speed and angle;
import { updatePosition } from "../../Utils/scriptMath.js";

// Defines the RightBullet class, a projectile designed to spread slightly to the right;
class RightBullet extends Bullet{

    // Constructor initializes the bullet, setting a default 'ratio' for the rightward spread;
    constructor(x, y, angle, speed, owner, ratio = 4 / 3) {
        // Calls the parent Bullet constructor, passing the custom 'ratio' value:
        // The ratio of 4/3 (or ~1.33) is applied to the angle calculation within updatePosition 
        // to create a constant angular offset, making the bullet travel slightly right 
        // relative to the ship's front direction.
        super(x, y, angle, speed, owner, ratio);
    }
    
    // Overrides the base update method, but uses the standard movement calculation;
    update() {
        // The updatePosition function uses the stored angle and the custom 'ratio' (4/3) 
        // to calculate the bullet's new position, resulting in the rightward trajectory.
        this.position = updatePosition(this.position, this.speed, this.angle, this.ratio);
    }
}

// Exports the RightBullet class;
export default RightBullet;