// Imports the constant string path for the Speed Ship image asset;
import { SPEED_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the two bullet types this ship fires (Left and Right spreading shots);
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
// Imports the base Spaceship class;
import Spaceship from "./scriptSpaceship.js";
// Imports the specific thruster type used by this ship;
import IonThruster from "../Thruster/scriptIonThruster.js";
// Imports math utilities for calculating position vectors;
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the SpeedShip class, a specialized player vessel;
class SpeedShip extends Spaceship {

    // Property to hold the instance of the single, central thruster effect;
    ionThruster;

    // Constructor to set up the ship's specific components;
    constructor(canvas) {
        // Calls the parent Spaceship constructor to set up dimensions, position, and speed;
        super(canvas);
        // Sets the specific image path for the Speed Ship body;
        this.imagePath = SPEED_SHIP_IMAGE;

        // Instantiates a single, central IonThruster component:
        // Positioned at X=0 (center) and near the back (height/2 - 25), with no angular offset (0);
        this.ionThruster = new IonThruster(0, this.height / 2 - 25, 0);
    }

    // Overrides the base shoot method to implement the Speed Ship's specific firing pattern (dual side-shot);
    shoot() {

        // Gets the absolute center of the ship;
        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        // Calculates the position vector at the very front of the ship (based on current angle);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle);
        
        // Defines the base speed for the generated bullets;
        const bulletSpeed = 10;
        
        // Creates the bullet firing slightly to the left;
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        // Creates the bullet firing slightly to the right;
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");

        // Add the bullets to the game entity manager for processing;
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
    }

    // Overrides the base draw method to include drawing the thruster effect;
    draw(context) {

        // Updates the animation frame for the single Ion Thruster effect;
        this.ionThruster.update();
        // Calls the parent (Spaceship) draw method, which draws the ship body;
        super.draw(context);

        // Recalculates the center position for drawing the child objects;
        const centerPosition = getCenterVector(this.position, this.width, this.height);
        
        // Draws the central Ion Thruster relative to the ship's center and angle;
        this.ionThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

// Exports the specialized SpeedShip class;
export default SpeedShip;