// Imports the base Bullet class;
import Bullet from "./scriptBullet.js";
// Imports the math utility function for calculating the new position based on speed and angle;
import { updatePosition } from "../../Utils/scriptMath.js";

// Defines the FrontBullet class, a direct, forward-moving projectile;
class FrontBullet extends Bullet {

    // Constructor initializes the bullet, passing all parameters directly to the parent Bullet class;
    constructor(x, y, angle, speed, owner, ratio = 1) {
        // Calls the parent Bullet constructor, which handles setting position, speed, angle, image, sound, and owner.
        super(x, y, angle, speed, owner, ratio);
    }

    // Overrides the base update method, but implements the standard forward movement;
    update() {
        // The bullet's position is updated by calculating the vector movement (speed * angle)
        // and applying the optional ratio modifier. This results in the bullet moving in a straight line
        // determined by the angle at the moment of creation.
        this.position = updatePosition(this.position, this.speed, this.angle, this.ratio);
    }
}

// Exports the FrontBullet class;
export default FrontBullet;