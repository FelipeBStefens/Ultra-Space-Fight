// Imports the constant string path for the Standart Ship image asset;
import { STANDART_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the bullet type this ship fires (a simple forward-moving bullet);
import FrontBullet from "../Bullets/scriptFrontBullet.js";
// Imports the base Spaceship class;
import Spaceship from "./scriptSpaceship.js";
// Imports the specific thruster type used by this ship;
import FireThruster from "../Thruster/scriptFireThruster.js";
// Imports math utilities for calculating position vectors;
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the StandartShip class, specializing the base Spaceship for the starting vessel;
class StandartShip extends Spaceship {

    // Property to hold the instance of the single, central thruster effect;
    fireThruster;

    // Constructor to set up the ship's specific assets and components;
    constructor(canvas) {
        // Calls the parent Spaceship constructor to set up dimensions, position, and speed;
        super(canvas);
        // Sets the specific image path for the Standart Ship body;
        this.imagePath = STANDART_SHIP_IMAGE;

        // Instantiates a single, central FireThruster component:
        // Positioned at X=0 (center) and near the back (height/2 - 10), with no angular offset (0);
        this.fireThruster = new FireThruster(0, this.height / 2 - 10, 0);
    }

    // Overrides the base shoot method to implement the Standart Ship's simple firing pattern (single shot);
    shoot() {

        // Calculate the bullet's starting position:
        // Gets the absolute center of the ship;
        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        // Calculates the position vector at the very front of the ship (based on current angle);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle);
        
        // Defines the base speed for the generated bullet;
        const bulletSpeed = 10;
        
        // Creates the bullet firing straight forward from the front offset;
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        
        // Add the bullet to the game entity manager for processing;
        EntityManager.addBullet(frontBullet);
    }

    // Overrides the base draw method to include drawing the thruster effect;
    draw(context) {

        // Updates the animation frame for the single Fire Thruster effect;
        this.fireThruster.update();
        // Calls the parent (Spaceship) draw method, which draws the ship body;
        super.draw(context);

        // Recalculates the center position for drawing the child object;
        const centerPosition = getCenterVector(this.position, this.width, this.height);

        // Draws the central Fire Thruster relative to the ship's center and angle;
        this.fireThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

// Exports the specialized StandartShip class;
export default StandartShip;