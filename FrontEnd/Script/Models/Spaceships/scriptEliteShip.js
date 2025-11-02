// Imports the constant string path for the Elite Ship image asset;
import { ELITE_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the bullet types this ship fires;
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
// Imports the base Spaceship class;
import Spaceship from "./scriptSpaceship.js";
// Imports the specific thruster type used by this ship (Ion Thruster);
import IonThruster from "../Thruster/scriptIonThruster.js";
// Imports math utilities for calculating position vectors;
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the EliteShip class, a specialized player vessel;
class EliteShip extends Spaceship {

    // Properties to hold the instances of the Ion Thruster effects;
    leftIonThruster;
    rightIonThruster;

    // Constructor to set up the ship's specific components;
    constructor(canvas) {
        // Calls the parent Spaceship constructor to set up dimensions, position, and speed;
        super(canvas);
        // Sets the specific image path for the Elite Ship body;
        this.imagePath = ELITE_SHIP_IMAGE;

        // Instantiates the left IonThruster component:
        // Positioned at -1/3 width and near the back (height/2 - 9);
        this.leftIonThruster = new IonThruster(-this.width / 3, this.height / 2 - 9, 0);
        // Instantiates the right IonThruster component:
        // Positioned at +1/3 width and near the back;
        this.rightIonThruster = new IonThruster(this.width / 3, this.height / 2 - 9, 0);
    }
    
    // Overrides the base shoot method to implement the Elite Ship's specific firing pattern;
    shoot() {

        // Calculate the starting position for the bullets:
        // Gets the absolute center of the ship;
        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        // Calculates the position vector at the very front of the ship (based on current angle);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 
        
        // Defines the base speed for the generated bullets;
        const bulletSpeed = 10;

        // Instantiate and configure the three bullets (Tri-Shot):
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        // Sets the size of the bullet, making it larger/longer (40x100);
        frontBullet.setLength(40, 100); 
        
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        // Sets the size of the left bullet;
        leftBullet.setLength(40, 100); 
        
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        // Sets the size of the right bullet;
        rightBullet.setLength(40, 100); 
            
        // Add the bullets to the game entity manager for processing;
        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
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

        // Draws the left Ion Thruster relative to the ship's center and angle;
        this.leftIonThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
        // Draws the right Ion Thruster relative to the ship's center and angle;
        this.rightIonThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

// Exports the specialized EliteShip class;
export default EliteShip;