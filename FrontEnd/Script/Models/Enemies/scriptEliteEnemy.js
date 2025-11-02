// Imports the constant string path for the Elite Enemy image asset;
import { ELITE_ENEMY_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the function to update the count of defeated elite enemies in the HUD/game state;
import { updateDefeatedElite } from "../../Gameplay/scriptHeadsUpDisplay.js";
// Imports the three bullet types this elite enemy fires;
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
// Imports the base Enemy class;
import Enemy from "./scriptEnemy.js";
// Imports the thruster component for visual effect;
import IonThruster from "../Thruster/scriptIonThruster.js";
// Imports math utilities for vector calculations, angle updates, position constraints, and lateral movement;
import { getDifferentialVector, getVectorMagnitude, getNormalizedVector, getLateralFactor, maxValuePosition, getCenterVector, getFrontOffsetVector, updateAngle } from "../../Utils/scriptMath.js";
// Imports the EntityManager for adding new bullets to the game loop;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the EliteEnemy class, a specialized high-tier antagonist;
class EliteEnemy extends Enemy {
    
    // Parameters 
    minDistance = 400;     
    maxDistance = 700;     
    lastShotTime = 0;      
    shootCooldown = 1000;  
    ionThruster;           

    // Constructor initializes the Elite's specific stats and components;
    constructor(position) {
        // Calls the parent Enemy constructor to set up base properties;
        super(position);
        
        // Elite Enemy Specific Stats
        this.speed = 7;
        this.life = 150;      
        this.cash = 20;      
        this.score = 40;     
        this.imagePath = ELITE_ENEMY_IMAGE;
        
        // Instantiates a central IonThruster component;
        this.ionThruster = new IonThruster(0, this.height / 3 + 13, 0);
    }

    // Overrides the base update method, using the SoldierEnemy's distance-based AI logic;
    update(player, canvas) {

        // Updates the animation and sound for the thruster effect;
        this.ionThruster.update();

        // Calculate direction and distance to the player:
        const differentialVector = getDifferentialVector(this.position, player);
        const magnitude = getVectorMagnitude(differentialVector);
        const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, magnitude);

        // Sets the enemy's rotation angle to face the player;
        this.angle = updateAngle(differentialVector);

        // Movement Logic (Identical to SoldierEnemy):
        
        if (magnitude < this.minDistance) {
            // State: Too Close -> RETREAT;
            this.position.x -= normalizedVector.normalizedX * this.speed;
            this.position.y -= normalizedVector.normalizedY * this.speed;
        } 
        else if (magnitude > this.maxDistance) {
            // State: Too Far -> APPROACH;
            this.position.x += normalizedVector.normalizedX * this.speed;
            this.position.y += normalizedVector.normalizedY * this.speed;
        } 
        else {
            // State: Ideal Range -> ORBIT & SHOOT;
            const lateralFactor = getLateralFactor(this.speed);
            this.position.x += -normalizedVector.normalizedX * lateralFactor;
            this.position.y += normalizedVector.normalizedY * lateralFactor;
        }

        // Shooting Logic:
        const now = Date.now();

        // Checks if the enemy is in range AND the cooldown has passed;
        if (magnitude <= this.maxDistance && now - this.lastShotTime >= this.shootCooldown) {
            this.shoot();
            this.lastShotTime = now;
        }

        // Boundary Check:
        this.position = maxValuePosition(canvas, this.width, this.height, this.position);
    }

    // Implements the powerful tri-shot firing pattern;
    shoot() {

        // Calculates the bullet's starting position;
        const centerPosition = getCenterVector(this.position, this.width, this.height);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 

        const bulletSpeed = 10;

        // Creates the main forward bullet:
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        frontBullet.setLength(40, 100); // Sets the bullet size (large/powerful);
        
        // Creates the left spreading bullet:
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        leftBullet.setLength(40, 100);
        
        // Creates the right spreading bullet:
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        rightBullet.setLength(40, 100);

        // Adds all three large bullets to the game;
        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
    }

    // Overrides the base draw method to include drawing the thruster effect;
    draw(context) {
        super.draw(context);

        const centerPosition = getCenterVector(this.position, this.width, this.height); 

        this.ionThruster.draw(context, centerPosition.x, centerPosition.y, this.angle);
    }

    // Overrides the base updateLife to add specific post-death logic;
    updateLife(damage) {

        // Calls the parent method to apply damage, check for life <= 0, stop thruster sound, award cash/score, and set active = false;
        super.updateLife(damage);
        
        // If the enemy has just died (life is 0 or less, which is handled by super.updateLife to set active=false):
        if (this.life <= 0) {
            // Notifies the HUD/game state that an Elite Enemy has been defeated;
            updateDefeatedElite();
        }
    }
}

// Exports the EliteEnemy class;
export default EliteEnemy;