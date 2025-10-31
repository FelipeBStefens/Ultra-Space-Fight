import { clamp, getCenterVector, getDifferentialVectorByObject, rotateVector, getVectorMagnitude, getNormalizedVector } from "../Utils/scriptMath.js";

// Small extra padding for boss ellipse collision axes — helps collisions at canvas edges/corners
const BOSS_ELLIPSE_PADDING_X = 60; // increases 'a' (horizontal semi-axis)

class CollisionManager {

    entities;
    explosions;
    startShake;

    constructor(entities, explosions, startShake) {
        this.entities = entities;
        this.explosions = explosions;
        this.startShake = startShake;
    }

    update() {
        for (let i = 0; i < this.entities.length; i++) {
          const A = this.entities[i];
          if (!A.active) continue;

          for (let j = i + 1; j < this.entities.length; j++) {
              const B = this.entities[j];
              if (!B.active) continue;

              if (!this.shouldCheck(A, B)) continue;

              let colliding = false;

              if (A.type === "boss" && (B.type === "spaceship" || B.type === "enemy" || (B.type === "bullet" && B.owner === "spaceship"))) {
                  colliding = this.isCollidingEllipseCircle(A, B);
              } else if (B.type === "boss" && (A.type === "spaceship" || A.type === "enemy" || (A.type === "bullet" && A.owner === "spaceship"))) {
                  colliding = this.isCollidingEllipseCircle(B, A);
              } else {
                  colliding = this.isColliding(A, B);
              }

              if (colliding) {
                  A.onCollision(B, this.explosions, this.startShake);
                  B.onCollision(A, this.explosions, this.startShake);

                  if (A.type === "boss") {
                    this.resolveRepel(A, B, 0, 0.4);  
                  }
                  else if (B.type === "boss") {
                    this.resolveRepel(B, A, 0, 0.4);   
                  }
                  else {
                    this.resolveRepel(A, B, 0.5, 0.35);
                  }
              }
          }
      }
    }

  shouldCheck(A, B) {
    const t1 = A.type;
    const t2 = B.type;

    if (t1 === "boss" && (t2 === "spaceship" || t2 === "enemy" || (t2 === "bullet" && B.owner === "spaceship"))) return true;
    if (t2 === "boss" && (t1 === "spaceship" || t1 === "enemy" || (t1 === "bullet" && A.owner === "spaceship"))) return true;

    // bullet (from spaceship) hits enemy
    if (t1 === "bullet" && t2 === "enemy") return A.owner === "spaceship";
    if (t2 === "bullet" && t1 === "enemy") return B.owner === "spaceship";

    // bullet (from enemy) hits spaceship
    if (t1 === "bullet" && t2 === "spaceship") return A.owner === "enemy" || A.owner === "boss";
    if (t2 === "bullet" && t1 === "spaceship") return B.owner === "enemy" || B.owner === "boss";

    // spaceship <-> enemy collisions (player and enemy)
    if ((t1 === "spaceship" && t2 === "enemy") || (t1 === "enemy" && t2 === "spaceship")) return true;

    // enemy <-> enemy collisions
    if (t1 === "enemy" && t2 === "enemy") return true;

    return false;
  }

  isColliding(gameObjectA, gameObjectB) {

    const centerPositionA = getCenterVector(gameObjectA.position, gameObjectA.width, gameObjectA.height);
    const centerPositionB = getCenterVector(gameObjectB.position, gameObjectB.width, gameObjectB.height);
    
    const differentialVector = getDifferentialVectorByObject(centerPositionA, {objectX: centerPositionB.x, objectY: centerPositionB.y});
    const vectorMagnitude = getVectorMagnitude(differentialVector);

    const radiusGameObjectA = gameObjectA.width / 2;
    const radiusGameObjectB = gameObjectB.width / 2;

    if (radiusGameObjectA + radiusGameObjectB > vectorMagnitude) {
      return true;
    }

    return false;
  }

  isCollidingEllipseCircle(boss, gameObject) {

    const bossCenterPosition = getCenterVector(boss.position, boss.width, boss.height);
    const gameObjectCenterPosition = getCenterVector(gameObject.position, gameObject.width, gameObject.height);

    const differentialVector = getDifferentialVectorByObject(gameObjectCenterPosition, {objectX: bossCenterPosition.x, objectY: bossCenterPosition.y});
    const rotatedVector = rotateVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, -boss.angle);

    const axesA = boss.width / 2 + BOSS_ELLIPSE_PADDING_X;
    const axesB = boss.height / 2;

    const normalizedX = rotatedVector.rotatedX / axesA;
    const normalizedY = rotatedVector.rotatedY / axesB;

    const gameObjectRadius = gameObject.width / 2;
    const gameObjectNormalizedRadius = gameObjectRadius / Math.min (axesA, axesB);

    if (Math.pow(normalizedX, 2) + Math.pow(normalizedY, 2) <= 1 + gameObjectNormalizedRadius) {
      return true;
    } 
    
    return false;
  }

  resolveRepel(gameObjectA, gameObjectB, pushFactor = 0.5, strength = 1.0) {

    const clampPushFactor = clamp(pushFactor, 0, 1);
    const clampStrength = clamp(strength, 0, 1);

    const centerPositionA = getCenterVector(gameObjectA.position, gameObjectA.width, gameObjectA.height);
    const centerPositionB = getCenterVector(gameObjectB.position, gameObjectB.width, gameObjectB.height);
    
    const differentialVector = getDifferentialVectorByObject(centerPositionA, {objectX: centerPositionB.x, objectY: centerPositionB.y});
    const vectorMagnitude = getVectorMagnitude(differentialVector);

    if (vectorMagnitude === 0) {
      
      const newAngle = Math.random() * Math.PI * 2;
      
      differentialVector.differentialX = Math.cos(newAngle);
      differentialVector.differentialY = Math.sin(newAngle);
      
      vectorMagnitude = 1;
    }  
    
    const radiusGameObjectA = gameObjectA.width / 2;
    const radiusGameObjectB = gameObjectB.width / 2;

    const overlap = radiusGameObjectA + radiusGameObjectB - vectorMagnitude;
    
    if (overlap <= 0) {
      return;
    } 

    const normalizedVector = getNormalizedVector({x: differentialVector.differentialX, y: differentialVector.differentialY}, vectorMagnitude);
    const separation = Math.min(Math.max(overlap * 1.2, 40), 80) * clampStrength;

    if (gameObjectA.type === "boss" && gameObjectA.introActive) {
      
      gameObjectB.position.x -= normalizedVector.normalizedX * separation;
      gameObjectB.position.y -= normalizedVector.normalizedY * separation;

      const impulse = Math.max(overlap * 3.0, 20) * clampStrength;
      
      const inverseMassB = 1 / gameObjectB.mass;

      gameObjectB.vx -= normalizedVector.normalizedX * impulse * inverseMassB;
      gameObjectB.vy -= normalizedVector.normalizedY * impulse * inverseMassB;
      
      return; 
    }

    if (gameObjectB.type === "boss" && gameObjectB.introActive) {
        
      gameObjectA.position.x -= normalizedVector.normalizedX * separation;
      gameObjectA.position.y -= normalizedVector.normalizedY * separation;

      const impulse = Math.max(overlap * 3.0, 20) * clampStrength;
        
      const inverseMassA = 1 / gameObjectA.mass;

      gameObjectA.vx -= normalizedVector.normalizedX * impulse * inverseMassA;
      gameObjectA.vy -= normalizedVector.normalizedY * impulse * inverseMassA;
        
      return; 
    }

    gameObjectA.position.x += normalizedVector.normalizedX * separation * clampPushFactor;
    gameObjectA.position.y += normalizedVector.normalizedY * separation * clampPushFactor;

    gameObjectB.position.x -= normalizedVector.normalizedX * separation * (1 - clampPushFactor);
    gameObjectB.position.y -= normalizedVector.normalizedY * separation * (1 - clampPushFactor);
  
    const impulse = Math.max(overlap * 3.0, 20) * clampStrength;
    const inverseMassA = 1 / gameObjectA.mass;
    const inverseMassB = 1 / gameObjectB.mass;

    const impulseA = impulse * (inverseMassA / (inverseMassA + inverseMassB));
    const impulseB = impulse * (inverseMassB / (inverseMassA + inverseMassB));

    gameObjectA.vx += normalizedVector.normalizedX * impulseA;
    gameObjectA.vy += normalizedVector.normalizedY * impulseA;

    gameObjectB.vx -= normalizedVector.normalizedX * impulseB;
    gameObjectB.vy -= normalizedVector.normalizedY * impulseB;
  }
}

export default CollisionManager;