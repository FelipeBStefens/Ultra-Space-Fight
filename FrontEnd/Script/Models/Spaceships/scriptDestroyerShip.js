// Imports the constant string path for the Destroyer Ship image asset;
import { DESTROYER_SHIP_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the different bullet types this ship fires;
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
// Imports the base Spaceship class;
import Spaceship from "./scriptSpaceship.js";
// Imports the specific thruster type used by this ship;
import FireThruster from "../Thruster/scriptFireThruster.js";
// Imports math utilities for calculating the ship's center and the front position offset;
import { getCenterVector, getFrontOffsetVector } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the DestroyerShip class, specializing the base Spaceship;
class DestroyerShip extends Spaceship {

    // Properties to hold the instances of the thruster effects;
    leftFireThruster;
    rightFireThruster;

    // Constructor to initialize the ship's specific assets and components;
    constructor(canvas) {
        // Calls the parent Spaceship constructor to set up dimensions, position, and speed;
        super(canvas);
        // Sets the specific image path for the Destroyer Ship body;
        this.imagePath = DESTROYER_SHIP_IMAGE;

        // Instantiates the left FireThruster component:
        // Positioned slightly to the left (-width/4 + 5) and near the back (height/2 - 15), with no angular offset (0);
        this.leftFireThruster = new FireThruster(-this.width / 4 + 5, this.height / 2 - 15, 0);
        // Instantiates the right FireThruster component:
        // Positioned slightly to the right (width/4 - 5) and near the back, with no angular offset (0);
        this.rightFireThruster = new FireThruster(this.width / 4 - 5, this.height / 2 - 15, 0);    
    }

    // Overrides the base shoot method to implement the Destroyer's specific firing pattern (tri-shot);
    shoot() {

        // Gets the absolute center of the ship;
        const centerPosition = getCenterVector(this.position, this.width, this.height); 
        // Calculates the position vector at the very front of the ship (based on current angle);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 
        
        // Defines the speed for the generated bullets;
        const bulletSpeed = 10;
        
        // Creates the main bullet firing straight forward;
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        // Creates a bullet firing slightly to the left;
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");
        // Creates a bullet firing slightly to the right;
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "spaceship");

        // Add the bullets to the game entity manager for processing;
        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
    }

    // Overrides the base draw method to include drawing the thruster effects;
    draw(context) {

        // Updates the animation frame for both thruster effects;
        this.leftFireThruster.update();
        this.rightFireThruster.update();
        
        // Calls the parent (Spaceship) draw method, which draws the ship body itself;
        super.draw(context);

        // Recalculates the center position (needed as the thrusters draw relative to the center);
        const centerPosition = getCenterVector(this.position, this.width, this.height); 

        // Draws the left thruster, passing the ship's center and angle as parent reference;
        this.leftFireThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
        // Draws the right thruster, passing the ship's center and angle as parent reference;
        this.rightFireThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

// Exports the specialized DestroyerShip class;
export default DestroyerShip;