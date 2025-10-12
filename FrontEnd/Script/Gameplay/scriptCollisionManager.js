
class CollisionManager {

    entities;

    constructor(entities) {
        this.entities = entities;
    }

    update() {
        for (let i = 0; i < this.entities.length; i++) {
            const A = this.entities[i];
            if (!A.active) continue;

            for (let j = i + 1; j < this.entities.length; j++) {
                const B = this.entities[j];
                if (!B.active) continue;

                if (this.shouldCheck(A, B) && this.isColliding(A, B)) {
                    A.onCollision(B);
                    B.onCollision(A);
                }
            }
        }
    }

  shouldCheck(A, B) {
    const t1 = A.type;
    const t2 = B.type;

    // bullet (from spaceship) hits enemy
    if (t1 === "bullet" && t2 === "enemy") return A.owner === "spaceship";
    if (t2 === "bullet" && t1 === "enemy") return B.owner === "spaceship";

    // bullet (from enemy) hits spaceship
    if (t1 === "bullet" && t2 === "spaceship") return A.owner === "enemy";
    if (t2 === "bullet" && t1 === "spaceship") return B.owner === "enemy";

    // spaceship <-> enemy collisions (player and enemy)
    if ((t1 === "spaceship" && t2 === "enemy") || (t1 === "enemy" && t2 === "spaceship")) return true;

    // enemy <-> enemy collisions
    if (t1 === "enemy" && t2 === "enemy") return true;

    return false;
  }

  isColliding(A, B) {
    // Use object centers for accurate collision checks
    const ax = (A.position.x || 0) + (A.width || 0) / 2;
    const ay = (A.position.y || 0) + (A.height || A.width || 0) / 2;
    const bx = (B.position.x || 0) + (B.width || 0) / 2;
    const by = (B.position.y || 0) + (B.height || B.width || 0) / 2;

    const dx = ax - bx;
    const dy = ay - by;
    const distance = Math.hypot(dx, dy);

    // use the larger dimension as approximate collision radius
    const radiusA = Math.max(A.width || 0, A.height || 0) / 2;
    const radiusB = Math.max(B.width || 0, B.height || 0) / 2;

    const colliding = distance < radiusA + radiusB;
    if (colliding) console.debug(`Collision detected between ${A.type} and ${B.type}`);
    return colliding;
  }
}

export default CollisionManager;