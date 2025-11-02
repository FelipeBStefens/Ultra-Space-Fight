// Imports the constant string path for the Scout Enemy image asset;
import { SCOUT_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the base Enemy class;
import Enemy from "./scriptEnemy.js";
// Imports math utility functions essential for the pursuit behavior:
import { getDifferentialVector, getVectorMagnitude, updateAngle, getNormalizedVector } from "../../Utils/scriptMath.js";

// Defines the ScoutEnemy class, specializing the base Enemy with simple pursuit AI;
class ScoutEnemy extends Enemy{
    
    // The minimum distance the enemy will maintain from the player before stopping its pursuit;
    minDistance = 30;

    // Constructor initializes the Scout's specific stats and assets;
    constructor(position) {
        // Calls the parent Enemy constructor to set up dimensions, type, and starting position;
        super(position);
        
        // Enemy Specific Stats;
        this.speed = 8;          
        this.life = 40;          
        this.cash = 5;           
        this.score = 10;         
        this.imagePath = SCOUT_ENEMY_IMAGE;
    }

    // Overrides the base update method to implement the movement;
    update(player, canvas) {

        // Finds the difference in position (player - enemy) to get the direction vector;
        const differentialVector = getDifferentialVector(this.position, player);
        // Calculates the straight-line distance (magnitude/length) between the enemy and player;
        const magnitude = getVectorMagnitude(differentialVector);
        
        // Calculates and sets the rotation angle based on the differential vector;
        this.angle = updateAngle(differentialVector);

        // Move the enemy towards the player if they are far enough:
        if (magnitude > this.minDistance) {
            
            // Calculates the normalized vector (unit vector) of the direction vector:
            // This vector has a magnitude of 1 and points from the enemy to the player;
            const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

            // Moves the enemy by adding the normalized vector, scaled by the enemy's speed:
            // This ensures movement is always directly towards the player at a constant speed;
            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        }
    }

    // Overrides the base onCollision method to handle specific collision types;
    onCollision(gameObject, startShake) {
    
        // Checks if the collision was with the player's spaceship;
        if (gameObject.type === "spaceship") {

            // The damage value used is the enemy's entire life, ensuring its immediate destruction;
            this.updateLife(this.life);
        }    
    }
}

// Exports the ScoutEnemy class;
export default ScoutEnemy;