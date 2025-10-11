
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

                if (this.shouldCheck(A, B) && isColliding(A, B)) {
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
    if ((t1 === "bullet" && t2 === "enemy") || (t1 === "enemy" && t2 === "bullet")) return true;

    // bullets do enemy atingem player
    if ((t1 === "bullet" && t2 === "spaceship") || (t1 === "spaceship" && t2 === "bullet")) return true;

    // player colide com enemy
    if ((t1 === "spaceship" && t2 === "enemy") || (t1 === "enemy" && t2 === "spaceship")) return true;

    return false;
  }
}