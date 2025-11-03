
import Boss from "./scriptBoss.js";

import { BATTLE_CRUISER_IMAGE } from "../../Utils/scriptConstants.js";

import FrontBullet from "../Bullets/scriptFrontBullet.js";
import LeftBullet from "../Bullets/scriptLeftSideBullet.js";
import RightBullet from "../Bullets/scriptRightSideBullet.js";


import { scalarLerp, vectorLerp, getDifferentialVectorByObject, getCenterVector, updateAngle, getFrontOffsetVector } from "../../Utils/scriptMath.js";

import EntityManager from "../../Engine/scriptEntityManager.js";


class BattleCruiser extends Boss {


    minDistance = 400;
    maxDistance = 700;
    lastShotTime = 0;     
    shootCooldown = 1000;


    movePoints = [];               
    isMoving = false;              
    framesAtPoint = 0;             
    framesToStay = 120;            
    moveDuration = 120;            
    moveFrame = 0;                 
    currentPointIndex = 0;         
    targetPointIndex = 1;          


    constructor(life, score, cash, canvas) {
        

        super(0, 0, 477/2, 1089/2, Math.PI, life, cash, score, "Battle Cruiser");


        this.position.x = Math.max(100, this.width / 2 + 100);
        this.position.y = Math.max(20, this.height / 2 - 80);


        this.introActive = false;
        this.introActiveEnded = false;
        this.introProgress = 0;
        this.isShaking = false;
        this.shakeTimer = 0;

        this.imagePath = BATTLE_CRUISER_IMAGE;

        this.setMovementPoints(canvas); 


        const targetMovePoint = this.movePoints[0];
        this.targetY = targetMovePoint.y - this.height / 2;


        this.isMoving = false;
        this.framesAtPoint = 0;
        this.framesToStay = 120;
        this.moveDuration = 120;
        this.moveFrame = 0;
        this.currentPointIndex = 0;
        this.targetPointIndex = 1;
    }


    setMovementPoints(canvas) {


        const marginX = Math.max(100, this.width / 2 + 100); 
        const marginY = Math.max(20, this.height / 2 - 80); 



        this.movePoints = [
            { x: marginX, y: marginY },
            { x: canvas.width - marginX, y: marginY },
            { x: canvas.width - marginX, y: canvas.height - marginY },
            { x: marginX, y: canvas.height - marginY }
        ];
    }


    startIntro(withShake = false, shakeDuration = 0) {
        this.introActive = true;
        this.introActiveEnded = false;
        this.introProgress = 0;


        this.startY = -this.height; 

        this.endY = this.targetY; 

        this.position.y = this.startY;
        this.active = true;
        this.angle = Math.PI;


        if (withShake) {
            this.isShaking = true;
            this.shakeTimer = shakeDuration;
        }
    }


    update() {

        const player = EntityManager.player;


        if (this.isShaking) {
            this.shakeTimer--;
            if (this.shakeTimer <= 0) {
                this.isShaking = false; 
            }
            return; 
        }


        if (this.introActive) {
            const introSpeed = 0.005;
            this.introProgress = Math.min(1, this.introProgress + introSpeed);

            this.position.y = scalarLerp(this.startY, this.endY, this.introProgress);
            
            if (this.introProgress >= 1) {
                this.introActive = false;
                this.introActiveEnded = true;
                this.active = true;
                this.position.y = this.endY;

                this.isMoving = false; 
                this.framesAtPoint = 0; 
            }
            return; 
        }


        if (this.active) {

            this.updateMovement();

            let angleTargetX, angleTargetY;


            if (this.isMoving) {

                angleTargetX = this.endX + this.width / 2;
                angleTargetY = this.endY + this.height / 2;
            } else {

                angleTargetX = player.position.x + player.width / 2;
                angleTargetY = player.position.y + player.height / 2;
            }


            const centerPosition = getCenterVector(this.position, this.width, this.height);
            const differentialVector = getDifferentialVectorByObject({x: angleTargetX, y: angleTargetY}, {objectX: centerPosition.x, objectY: centerPosition.y});
            this.angle = updateAngle(differentialVector);


            const now = Date.now();
            if (now - this.lastShotTime >= this.shootCooldown) {
                this.shoot();
                this.lastShotTime = now;
            }
        }
    }


    shoot() {


        const centerPosition = getCenterVector(this.position, this.width, this.height);
        const frontOffset = getFrontOffsetVector(centerPosition, this.height, this.angle); 

        const bulletSpeed = 10;


        

        const veryLeftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss", 1 / 3);
        veryLeftBullet.setLength(40, 100);


        const leftBullet = new LeftBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        leftBullet.setLength(40, 100);
        

        const frontBullet = new FrontBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        frontBullet.setLength(40, 100);


        const rightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss");
        rightBullet.setLength(40, 100);
        

        const veryRightBullet = new RightBullet(frontOffset.x, frontOffset.y, this.angle, bulletSpeed, "boss", 5 / 3);
        veryRightBullet.setLength(40, 100);


        EntityManager.addBullet(frontBullet);
        EntityManager.addBullet(veryLeftBullet);
        EntityManager.addBullet(leftBullet);
        EntityManager.addBullet(rightBullet);
        EntityManager.addBullet(veryRightBullet);
    }


    updateMovement() {


        if (!this.isMoving) {
            this.framesAtPoint++;

            if (this.framesAtPoint >= this.framesToStay) {
                this.isMoving = true;
                this.framesAtPoint = 0;


                const origin = this.movePoints[this.currentPointIndex];

                const destIndex = (this.currentPointIndex + 1) % this.movePoints.length;
                const dest = this.movePoints[destIndex];


                this.startX = origin.x - this.width / 2;
                this.startY = origin.y - this.height / 2;
                this.endX = dest.x - this.width / 2;
                this.endY = dest.y - this.height / 2;


                this.moveDuration = Math.max(1, this.moveDuration);
                this.moveFrame = 0;
                this.targetPointIndex = destIndex;
            }
            return;
        }


        this.moveFrame++;

        const t = Math.min(1, this.moveFrame / this.moveDuration);
        

        this.position = vectorLerp({startX: this.startX, endX: this.endX}, {startY: this.startY, endY: this.endY}, t);
        

        if (this.moveFrame >= this.moveDuration) {

            this.position.x = this.endX;
            this.position.y = this.endY;
            

            this.currentPointIndex = this.targetPointIndex;
            this.isMoving = false;
            this.framesAtPoint = 0;
        }
    }
}


export default BattleCruiser;