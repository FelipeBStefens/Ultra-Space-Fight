// Imports utility functions for mathematical operations (clamping, vector math, rotation);
import { clamp, getCenterVector, getDifferentialVectorByObject, rotateVector, getVectorMagnitude, getNormalizedVector } from "../Utils/scriptMath.js";

// Small extra padding for boss ellipse collision axes;
const BOSS_ELLIPSE_PADDING_X = 60; 

// Defines the CollisionManager class, responsible for detecting and resolving physical interactions;
class CollisionManager {

    entities;   // Array of entities to check for collisions;
    startShake; // Callback function to trigger screen shake upon strong collision;

    constructor(entities, startShake) {
        this.entities = entities; // Entities are usually derived from EntityManager.getAllEntities();
        this.startShake = startShake;
    }

    // Main collision detection and resolution loop, called every frame;
    update() {
        // Iterate through all possible pairs of entities;
        for (let i = 0; i < this.entities.length; i++) {
            const A = this.entities[i];
            if (!A.active) continue; // Skip inactive entities;

            for (let j = i + 1; j < this.entities.length; j++) {
                const B = this.entities[j];
                if (!B.active) continue; // Skip inactive entities;

                // Preliminary check to see if collision logic should be run between A and B based on types/owners;
                if (!this.shouldCheck(A, B)) continue;

                let colliding = false;


                // Case Boss vs. Player/Enemy/PlayerBullet -> Use Ellipse-Circle Check;
                if (A.type === "boss" && (B.type === "spaceship" || B.type === "enemy" || (B.type === "bullet" && B.owner === "spaceship"))) {
                    colliding = this.isCollidingEllipseCircle(A, B);
                } 
                else if (B.type === "boss" && (A.type === "spaceship" || A.type === "enemy" || (A.type === "bullet" && A.owner === "spaceship"))) {
                    colliding = this.isCollidingEllipseCircle(B, A);
                }

                // Case all other valid pairs -> Use standard Circle-Circle Check;
                else {
                    colliding = this.isColliding(A, B);
                }

                // Collision Resolution;
                if (colliding) {
                    
                    // Logic/Damage Application;
                    A.onCollision(B, this.startShake);
                    B.onCollision(A, this.startShake);
                    
                    // Specific Repel logic for Boss: Boss is immovable, only repels the other object;
                    if (A.type === "boss") {
                        // Boss is A: 0 pushFactor for A, 0.4 strength for B;
                        this.resolveRepel(A, B, 0, 0.4); 
                    }
                    else if (B.type === "boss") {
                        // Boss is B: 0 pushFactor for B;
                        this.resolveRepel(B, A, 0, 0.4); 
                    }
                    // Standard Repel logic for objects like Enemy-Enemy or Player-Enemy;
                    else {
                        // Standard physics;
                        this.resolveRepel(A, B, 0.5, 0.35);
                    }
                }
            }
        }
    }

    // Determines which pairs of entities are logically allowed to interact;
    shouldCheck(A, B) {
        const t1 = A.type;
        const t2 = B.type;

        // Boss-related checks (handled by Ellipse-Circle logic in update());
        if (t1 === "boss" && (t2 === "spaceship" || t2 === "enemy" || (t2 === "bullet" && B.owner === "spaceship"))) return true;
        if (t2 === "boss" && (t1 === "spaceship" || t1 === "enemy" || (t1 === "bullet" && A.owner === "spaceship"))) return true;

        // Player bullet hits enemy;
        if (t1 === "bullet" && t2 === "enemy") return A.owner === "spaceship";
        if (t2 === "bullet" && t1 === "enemy") return B.owner === "spaceship";

        // Enemy/Boss bullet hits player spaceship;
        if (t1 === "bullet" && t2 === "spaceship") return A.owner === "enemy" || A.owner === "boss";
        if (t2 === "bullet" && t1 === "spaceship") return B.owner === "enemy" || B.owner === "boss";

        // Player spaceship hits enemy;
        if ((t1 === "spaceship" && t2 === "enemy") || (t1 === "enemy" && t2 === "spaceship")) return true;

        // Enemy hits enemy (for crowding/repulsion);
        if (t1 === "enemy" && t2 === "enemy") return true;

        // All other combinations are ignored;
        return false;
    }

    // Standard Circle-Circle Collision Detection (used for most objects);
    isColliding(gameObjectA, gameObjectB) {

        // Calculate the center points of both objects;
        const centerPositionA = getCenterVector(gameObjectA.position, gameObjectA.width, gameObjectA.height);
        const centerPositionB = getCenterVector(gameObjectB.position, gameObjectB.width, gameObjectB.height);
        
        // Calculate the distance (magnitude) between the centers;
        const differentialVector = getDifferentialVectorByObject(centerPositionA, {objectX: centerPositionB.x, objectY: centerPositionB.y});
        const vectorMagnitude = getVectorMagnitude(differentialVector);

        // Calculate the sum of radius;
        const radiusGameObjectA = gameObjectA.width / 2;
        const radiusGameObjectB = gameObjectB.width / 2;

        // Collision occurs if the distance between centers is less than the sum of radius;
        if (radiusGameObjectA + radiusGameObjectB > vectorMagnitude) {
            return true;
        }

        return false;
    }

    // Specialized Ellipse-Circle Collision Detection (used for Boss objects);
    isCollidingEllipseCircle(boss, gameObject) {

        const bossCenterPosition = getCenterVector(boss.position, boss.width, boss.height);
        const gameObjectCenterPosition = getCenterVector(gameObject.position, gameObject.width, gameObject.height);

        // Transform the circle's position into the boss's local coordinate system;
        const differentialVector = getDifferentialVectorByObject(gameObjectCenterPosition, {objectX: bossCenterPosition.x, objectY: bossCenterPosition.y});
        // align the boss with the axes;
        const rotatedVector = rotateVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, -boss.angle);

        // Define the Ellipse Axes with extra padding for the boss's large size;
        const axesA = boss.width / 2 + BOSS_ELLIPSE_PADDING_X;
        const axesB = boss.height / 2;

        // Normalize the rotated coordinates by the ellipse axes;
        const normalizedX = rotatedVector.rotatedX / axesA;
        const normalizedY = rotatedVector.rotatedY / axesB;

        // Normalize the collision object's radius based on the smallest ellipse axis;
        const gameObjectRadius = gameObject.width / 2;
        const gameObjectNormalizedRadius = gameObjectRadius / Math.min (axesA, axesB);

        // Check the standard ellipse equation;
        if (Math.pow(normalizedX, 2) + Math.pow(normalizedY, 2) <= 1 + gameObjectNormalizedRadius) {
            return true;
        } 
        
        return false;
    }

    // Resolves the physical overlap by separating objects and applying collision impulse (repulsion);
    resolveRepel(gameObjectA, gameObjectB, pushFactor = 0.5, strength = 1.0) {

        const clampPushFactor = clamp(pushFactor, 0, 1);
        const clampStrength = clamp(strength, 0, 1);

        const centerPositionA = getCenterVector(gameObjectA.position, gameObjectA.width, gameObjectA.height);
        const centerPositionB = getCenterVector(gameObjectB.position, gameObjectB.width, gameObjectB.height);
        
        // Calculate collision axis vector and distance;
        let differentialVector = getDifferentialVectorByObject(centerPositionA, {objectX: centerPositionB.x, objectY: centerPositionB.y});
        let vectorMagnitude = getVectorMagnitude(differentialVector);

        // Handle simultaneous spawn and identical positions to prevent errors;
        if (vectorMagnitude === 0) {
            // Assigns a random direction vector if objects overlap perfectly;
            const newAngle = Math.random() * Math.PI * 2;
            
            differentialVector.differentialX = Math.cos(newAngle);
            differentialVector.differentialY = Math.sin(newAngle);
            
            vectorMagnitude = 1; // Set magnitude to 1 for normalization;
        }  
        
        const radiusGameObjectA = gameObjectA.width / 2;
        const radiusGameObjectB = gameObjectB.width / 2;

        // Calculate overlap distance;
        const overlap = radiusGameObjectA + radiusGameObjectB - vectorMagnitude;
        
        if (overlap <= 0) {
            return; // No overlap, no resolution needed;
        } 

        // Calculate separation direction vector;
        const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, vectorMagnitude);
        // Calculates separation distance, bounded between 40 and 80 pixels, scaled by strength;
        const separation = Math.min(Math.max(overlap * 1.2, 40), 80) * clampStrength;
        
        // If Boss A is active in its intro sequence, only push B;
        if (gameObjectA.type === "boss" && gameObjectA.introActive) {
            
            // Separation: B is pushed away from A;
            gameObjectB.position.x -= normalizedVector.normalizedX * separation;
            gameObjectB.position.y -= normalizedVector.normalizedY * separation;

            // Impulse: Apply a fixed force (impulse) to B;
            const impulse = Math.max(overlap * 3.0, 20) * clampStrength;
            const inverseMassB = 1 / gameObjectB.mass;

            gameObjectB.vx -= normalizedVector.normalizedX * impulse * inverseMassB;
            gameObjectB.vy -= normalizedVector.normalizedY * impulse * inverseMassB;
            
            return; // Exit here as standard resolution should not apply;
        }

        // If Boss B is active in its intro sequence, only push A;
        if (gameObjectB.type === "boss" && gameObjectB.introActive) {
            
            // Separation: A is pushed away from B;
            gameObjectA.position.x -= normalizedVector.normalizedX * separation;
            gameObjectA.position.y -= normalizedVector.normalizedY * separation;

            // Impulse: Apply a fixed force (impulse) to A;
            const impulse = Math.max(overlap * 3.0, 20) * clampStrength;
            const inverseMassA = 1 / gameObjectA.mass;

            gameObjectA.vx -= normalizedVector.normalizedX * impulse * inverseMassA;
            gameObjectA.vy -= normalizedVector.normalizedY * impulse * inverseMassA;
            
            return; // Exit here as standard resolution should not apply;
        }

        // Positional Correction (Separates A and B to eliminate overlap);
        gameObjectA.position.x += normalizedVector.normalizedX * separation * clampPushFactor;
        gameObjectA.position.y += normalizedVector.normalizedY * separation * clampPushFactor;

        gameObjectB.position.x -= normalizedVector.normalizedX * separation * (1 - clampPushFactor);
        gameObjectB.position.y -= normalizedVector.normalizedY * separation * (1 - clampPushFactor);
    
        // Velocity Impulse;
        const impulse = Math.max(overlap * 3.0, 20) * clampStrength;
        const inverseMassA = 1 / gameObjectA.mass;
        const inverseMassB = 1 / gameObjectB.mass;

        // Distributes the impulse force based on the inverse mass ratio (lighter object gets more speed change);
        const impulseA = impulse * (inverseMassA / (inverseMassA + inverseMassB));
        const impulseB = impulse * (inverseMassB / (inverseMassA + inverseMassB));

        // Applies impulse to A (in the separation direction);
        gameObjectA.vx += normalizedVector.normalizedX * impulseA;
        gameObjectA.vy += normalizedVector.normalizedY * impulseA;

        // Applies impulse to B (in the opposite direction);
        gameObjectB.vx -= normalizedVector.normalizedX * impulseB;
        gameObjectB.vy -= normalizedVector.normalizedY * impulseB;
    }
}

// Export class Collsion Manager;
export default CollisionManager;