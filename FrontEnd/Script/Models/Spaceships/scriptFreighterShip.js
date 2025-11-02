// Imports the constant string path for the Freighter Ship image asset;
import { FREIGHTER_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the bullet type used (a simple forward-moving bullet);
import FrontBullet from "../Bullets/scriptFrontBullet.js";
// Imports the base Spaceship class;
import Spaceship from "./scriptSpaceship.js";
// Imports the specific thruster type used by this ship;
import IonThruster from "../Thruster/scriptIonThruster.js";
// Imports math utilities for calculating position vectors;
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the FreighterShip class, a specialized player vessel;
class FreighterShip extends Spaceship {

    // Properties to hold the instances of the Ion Thruster effects;
    leftIonThruster;
    rightIonThruster;

    // Constructor to set up the ship's specific components;
    constructor(canvas) {
        // Calls the parent Spaceship constructor to set up dimensions, position, and speed;
        super(canvas);
        // Sets the specific image path for the Freighter Ship body;
        this.imagePath = FREIGHTER_SHIP_IMAGE;

        // Instantiates the left IonThruster component:
        // Positioned at -1/4 width and near the back (height/2 - 9);
        this.leftIonThruster = new IonThruster(-this.width / 4, this.height / 2 - 9, 0);
        // Instantiates the right IonThruster component:
        // Positioned at +1/4 width and near the back;
        this.rightIonThruster = new IonThruster(this.width / 4, this.height / 2 - 9, 0);
    }

    // Overrides the base shoot method to implement the Freighter Ship's specific firing pattern (dual parallel shot);
    shoot() {

        // Gets the absolute center of the ship;
        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        // Calculates the position vector at the very front of the ship (based on current angle);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 
        
        // Defines the fixed offset distance for the dual bullets from the center line;
        const sideOffset = 20; 
        // Defines the multipliers for the parallel positions (left: 1, right: -1, or vice-versa, based on cosine/sine application);
        const offsets =  [1, -1]; 

        // Loop to create the two parallel bullets:
        for (const offset of offsets) {
            
            // Calculates the final X position: Takes the front center X and adds the rotated side offset (sideOffset * cos(angle));
            // This ensures the parallel bullets are correctly spaced relative to the ship's angle;
            const bulletX = frontOffset.x + offset * sideOffset * Math.cos(this.angle);
            
            // Calculates the final Y position: Takes the front center Y and adds the rotated side offset (sideOffset * sin(angle));
            const bulletY = frontOffset.y + offset * sideOffset * Math.sin(this.angle);

            // Creates a new FrontBullet at the calculated parallel position;
            const frontBullet = new FrontBullet(bulletX, bulletY, this.angle, 10, "spaceship");
            // Sets the size of the bullet (large, 40x100);
            frontBullet.setLength(40, 100);
            
            // Adds the bullet to the game entity manager;
            EntityManager.addBullet(frontBullet);
        }        
    }

    // Overrides the base draw method to include drawing the thruster effects;
    draw(context) {

        // Updates the animation frame for both Ion Thruster effects;
        this.leftIonThruster.update();
        this.rightIonThruster.update();
        
        // Calls the parent (Spaceship) draw method, which draws the ship body;
        super.draw(context);

        // Recalculates the center position for drawing the child objects;
        const centerPosition = getCenterVector(this.position, this.width, this.height); 

        // Draws the thrusters relative to the ship's center and angle;
        this.leftIonThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
        this.rightIonThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

// Exports the specialized FreighterShip class;
export default FreighterShip;