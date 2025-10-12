
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

    // bullets do player atingem enemies
    if (t1 === "bullet" && t2 === "enemy") {
      return A.owner === "spaceship";
    }
    if (t1 === "spaceship" && t2 === "enemy") {
      return B.owner === "spaceship";
    }

    // bullets do enemy atingem player
    if (t1 === "bullet" && t2 === "spaceship") {
      return A.owner === "enemy";
    }
    if (t1 === "spaceship" && t2 === "bullet") {
      return B.owner === "enemy";
    }
    // player colide com enemy
    if ((t1 === "spaceship" && t2 === "enemy") || (t1 === "enemy" && t2 === "spaceship")) return true;
    if (t1 === "enemy" && t2 === "enemy") return true;

    return false;
  }

  isColliding(A, B) {
    const dx = A.position.x - B.position.x;
    const dy = A.position.y - B.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radiusA = A.width / 2;
    const radiusB = B.width / 2;

    return distance < radiusA + radiusB;
  }
}

export default CollisionManager;