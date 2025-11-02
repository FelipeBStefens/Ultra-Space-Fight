// Imports the base Boss class;
import Boss from "./scriptBoss.js";
// Imports the constant string path for the Battle Cruiser image asset;
import { BATTLE_CRUISER_IMAGE } from "../../Utils/scriptConstants.js";
// Imports the three bullet types used for the spread shot;
import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";
// Imports math utilities: scalarLerp for intro, vectorLerp for path movement, 
// and vector/angle utilities for aiming;
import { scalarLerp, vectorLerp, getDifferentialVectorByObject, getCenterVector, updateAngle, getFrontOffsetVector } from "../../Utils/scriptMath.js";
// Imports the EntityManager for managing game entities;
import EntityManager from "../../Engine/scriptEntityManager.js";

// Defines the BattleCruiser class, specializing the Boss with complex, path-based movement;
class BattleCruiser extends Boss {

    // Basic Combat Parameters;
    minDistance = 400;
    maxDistance = 700;
    lastShotTime = 0;     
    shootCooldown = 1000; // Milliseconds between shots;

    // Movement Properties;
    movePoints = [];               
    isMoving = false;              
    framesAtPoint = 0;             
    framesToStay = 120;            
    moveDuration = 120;            
    moveFrame = 0;                 
    currentPointIndex = 0;         
    targetPointIndex = 1;          

    // Constructor initializes the Battle Cruiser's complex movement and stats;
    constructor(life, score, cash, canvas) {
        
        // Calls the parent Boss constructor;
        super(0, 0, 477/2, 1089/2, Math.PI, life, cash, score, "Battle Cruiser");

        // Sets initial position on the screen;
        this.position.x = Math.max(100, this.width / 2 + 100);
        this.position.y = Math.max(20, this.height / 2 - 80);

        // Intro Setup;
        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0;
        this.isShaking = false;
        this.shakeTimer = 0;

        this.imagePath = BATTLE_CRUISER_IMAGE;
        // Calculates the fixed patrol points based on canvas size;
        this.setMovementPoints(canvas); 

        // Initial setup for the intro final position (targetY is the Y position of the first patrol point);
        const targetMovePoint = this.movePoints[0];
        this.targetY = targetMovePoint.y - this.height / 2; // Convert center coordinate to top-left coordinate;

        // Movement State Initialization
        this.isMoving = false;
        this.framesAtPoint = 0;
        this.framesToStay = 120;
        this.moveDuration = 120;
        this.moveFrame = 0;
        this.currentPointIndex = 0;
        this.targetPointIndex = 1;
    }

    // Defines the corner coordinates for the movement path;
    setMovementPoints(canvas) {

        // Defines margins to keep the large boss within the screen bounds;
        const marginX = Math.max(100, this.width / 2 + 100); 
        const marginY = Math.max(20, this.height / 2 - 80); 

        // Defines the four fixed points (using center coordinates for consistency)
        // for the boss to patrol (likely a square/rectangular path);
        this.movePoints = [
            { x: marginX, y: marginY },                          // top-left
            { x: canvas.width - marginX, y: marginY },           // top-right
            { x: canvas.width - marginX, y: canvas.height - marginY }, // bottom-right
            { x: marginX, y: canvas.height - marginY }           // bottom-left
        ];
    }

    // Starts the boss's entrance sequence (slide-in from the top);
    startIntro(withShake = false, shakeDuration = 0) {
        this.introActive = true;
        this.introActiveEnded = false;
        this.introProgress = 0;

        // Start Y position (off-screen above);
        this.startY = -this.height; 
        // End Y position (calculated in constructor, aligned with the first patrol point);
        this.endY = this.targetY; 

        this.position.y = this.startY;
        this.active = true; // Allows update to run;
        this.angle = Math.PI; // Ensures the boss is facing the default direction (down/towards the player);

        // Screen shake logic for the introduction;
        if (withShake) {
            this.isShaking = true;
            this.shakeTimer = shakeDuration;
        }
    }

    // Main update loop for the Battle Cruiser;
    update() {

        const player = EntityManager.player;

        // Screen Shake Block;
        if (this.isShaking) {
            this.shakeTimer--;
            if (this.shakeTimer <= 0) {
                this.isShaking = false; 
            }
            return; 
        }

        // Introduction Phase (Vertical slide-in via scalarLerp);
        if (this.introActive) {
            const introSpeed = 0.005;
            this.introProgress = Math.min(1, this.introProgress + introSpeed);

            this.position.y = scalarLerp(this.startY, this.endY, this.introProgress);
            
            if (this.introProgress >= 1) {
                this.introActive = false;
                this.introActiveEnded = true;
                this.active = true; // Start combat/movement logic;
                this.position.y = this.endY;
                // Reset movement state to start the patrol loop;
                this.isMoving = false; 
                this.framesAtPoint = 0; 
            }
            return; 
        }

        // Combat Phase (Movement, Aiming, Shooting);
        if (this.active) {

            this.updateMovement(); // Handles the patrol path interpolation;

            let angleTargetX, angleTargetY;

            // Determines the target for the boss's rotation (aiming):
            if (this.isMoving) {
                // If moving, face the target patrol point (looks cool during transit);
                angleTargetX = this.endX + this.width / 2;
                angleTargetY = this.endY + this.height / 2;
            } else {
                // If stationary, aim directly at the player for attack;
                angleTargetX = player.position.x + player.width / 2;
                angleTargetY = player.position.y + player.height / 2;
            }

            // Rotates the boss to face the angleTarget;
            const centerPosition = getCenterVector(this.position, this.width, this.height);
            const differentialVector = getDifferentialVectorByObject({x: angleTargetX, y: angleTargetY}, {objectX: centerPosition.x, objectY: centerPosition.y});
            this.angle = updateAngle(differentialVector);

            // Shooting Cooldown Control (uses time instead of frames);
            const now = Date.now();
            if (now - this.lastShotTime >= this.shootCooldown) {
                this.shoot(); // Fires the powerful spread shot;
                this.lastShotTime = now;
            }
        }
    }

    // Implements the powerful five-bullet spread shot;
    shoot() {

        // Calculates the firing origin (front center of the ship);
        const centerPosition = getCenterVector(this.position, this.width, this.height);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 

        const bulletSpeed = 10;

        // Fires five large bullets with varying spread (ratios determine the angle offset):
        
        // Far Left (Ratio 1/3)
        const veryLeftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss", 1 / 3);
        veryLeftBullet.setLength(40, 100);

        // Mid Left (Ratio 2/3 - default for LeftBullet)
        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        leftBullet.setLength(40, 100);
        
        // Center (Ratio 1 - default for FrontBullet)
        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        frontBullet.setLength(40, 100);

        // Mid Right (Ratio 4/3 - default for RightBullet)
        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        rightBullet.setLength(40, 100);
        
        // Far Right (Ratio 5/3)
        const veryRightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss", 5 / 3);
        veryRightBullet.setLength(40, 100);

        // Adds all five bullets to the game manager;
        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(veryLeftBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
        EntityManager.addBullet(veryRightBullet);
    }

    // Manages the sequential movement between the defined patrol points;
    updateMovement() {

        // State 1: Stationary (Waiting at a move point);
        if (!this.isMoving) {
            this.framesAtPoint++;

            if (this.framesAtPoint >= this.framesToStay) {
                this.isMoving = true;
                this.framesAtPoint = 0;

                // Determine start and end points for interpolation:
                const origin = this.movePoints[this.currentPointIndex];
                // Calculate the index of the next point (wrapping around using modulo);
                const destIndex = (this.currentPointIndex + 1) % this.movePoints.length;
                const dest = this.movePoints[destIndex];

                // Convert center-point coordinates to top-left coordinates for interpolation:
                this.startX = origin.x - this.width / 2;
                this.startY = origin.y - this.height / 2;
                this.endX = dest.x - this.width / 2;
                this.endY = dest.y - this.height / 2;

                // Reset frame counters for the interpolation;
                this.moveDuration = Math.max(1, this.moveDuration);
                this.moveFrame = 0;
                this.targetPointIndex = destIndex;
            }
            return;
        }

        // State 2: Moving (Interpolating between points);
        this.moveFrame++;
        // Calculate the interpolation factor (t) from 0 to 1;
        const t = Math.min(1, this.moveFrame / this.moveDuration);
        
        // Use vectorLerp for smooth movement along the path;
        this.position = vectorLerp({startX: this.startX, endX: this.endX}, {startY: this.startY, endY: this.endY}, t);
        
        // Check if the movement is complete;
        if (this.moveFrame >= this.moveDuration) {
            // Snap to the final position to avoid floating point errors;
            this.position.x = this.endX;
            this.position.y = this.endY;
            
            // Transition back to the stationary state;
            this.currentPointIndex = this.targetPointIndex;
            this.isMoving = false;
            this.framesAtPoint = 0;
        }
    }
}

// Exports the BattleCruiser class;
export default BattleCruiser;