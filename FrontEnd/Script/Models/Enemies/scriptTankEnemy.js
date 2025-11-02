// Imports the constant string path for the Tank Enemy image asset;
import { TANK_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the basic bullet type used by this enemy;
import FrontBullet from "../Bullets/scriptFrontBullet.js";
// Imports the base Enemy class;
import Enemy from "./scriptEnemy.js";
// Imports the thruster component used for visual effect;
import IonThruster from "../Thruster/scriptIonThruster.js";
// Imports math utilities for vector calculations, angle updates, position constraints, and lateral movement;
import { getDifferentialVector, getVectorMagnitude, getNormalizedVector, getLateralFactor, maxValuePosition, getCenterVector, getFrontOffsetVector, updateAngle } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the TankEnemy class, specializing the base Enemy with heavy combat AI;
class TankEnemy extends Enemy{
    
    // Parameters; 
    minDistance = 200;     
    maxDistance = 400;     
    lastShotTime = 0;      
    shootCooldown = 1000;  
    ionThruster;           

    // Constructor initializes the Tank's specific stats and components;
    constructor(position) {
        // Calls the parent Enemy constructor to set up base properties;
        super(position);
        
        // Enemy Specific Stats;
        this.speed = 5;      
        this.life = 120;      
        this.cash = 15;      
        this.score = 30;     
        this.imagePath = TANK_ENEMY_IMAGE;

        // Instantiates a central IonThruster component (positioned near the back);
        this.ionThruster = new IonThruster(0, this.height / 3 + 5, 0);
    }

    // Overrides the base update method to implement the distance-based AI logic;
    update(player, canvas) {

        // Updates the animation and sound for the thruster effect;
        this.ionThruster.update();

        // Calculate direction and distance to the player:
        const differentialVector = getDifferentialVector(this.position, player);
        const magnitude = getVectorMagnitude(differentialVector);
        const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude); // Calculated here for reuse

        // Sets the enemy's rotation angle to face the player;
        this.angle = updateAngle(differentialVector);

        // Movement Logic;
        
        if (magnitude < this.minDistance) {
            // State: Too Close (Danger Zone) -> RETREAT;
            
            // Moves AWAY from the player;
            this.position.x -= normalizedVector.normalizedX * this.speed;
            this.position.y -= normalizedVector.normalizedY * this.speed;
        } 
        else if (magnitude > this.maxDistance) {

            // State: Too Far (Out of Range) -> APPROACH;
            
            // Moves TOWARDS the player;
            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        } 
        else {
            // State: Ideal Range -> ORBIT & SHOOT;
        
            const lateralFactor = getLateralFactor(this.speed);
            
            // Moves the ship perpendicularly to the direction vector (creates an orbiting/strafing movement):
            this.position.x += -normalizedVector.normalizedX * lateralFactor;
            this.position.y += normalizedVector.normalizedY * lateralFactor;
        }

        // Shooting Logic:
        const now = Date.now();

        // Checks if the enemy is within the shooting range (<= maxDistance) AND the cooldown period has passed;
        if (magnitude <= this.maxDistance && now - this.lastShotTime >= this.shootCooldown) {
            this.shoot();
            this.lastShotTime = now;
        }

        // Ensures the enemy stays within the canvas boundaries;
        this.position = maxValuePosition(canvas, this.width, this.height, this.position);
    }

    // Fires a single bullet straight forward;
    shoot() {
        
        // Calculates the bullet's starting position at the front center of the ship;
        const centerPosition = getCenterVector(this.position, this.width, this.height);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle);
        
        const bulletSpeed = 10;

        // Creates a new FrontBullet originating from the ship, targeted at the ship's current angle, and set as "enemy" type;
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "enemy");
        // Adds the new bullet to the game manager;
        EntityManager.addBullet(frontBullet);
    }

    // Overrides the base draw method to include drawing the thruster effect;
    draw(context) {
        // Draws the ship body first;
        super.draw(context);

        // Gets the center position to anchor the thruster drawing;
        const centerPosition = getCenterVector(this.position, this.width, this.height);  

        // Draws the thruster relative to the enemy's center and angle;
        this.ionThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }
}

// Exports the TankEnemy class;
export default TankEnemy;