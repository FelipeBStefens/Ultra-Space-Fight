
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

                // Resolve physical repulsion once (avoid double-applying push from both onCollision calls)
                if ((A.type === "spaceship" && B.type === "enemy") || (A.type === "enemy" && B.type === "spaceship")) {
                  // spaceship <-> enemy: strong repulsion, spaceship gets more of the push (p=0.7)
                  this.resolveRepel(A, B, 0.7, 1.0);
                } else if (A.type === "enemy" && B.type === "enemy") {
                  // enemy <-> enemy: weaker repulsion so they don't fly apart so much (p=0.5 symmetric)
                  this.resolveRepel(A, B, 0.5, 0.35);
                }
              }
            }
        }
    }

  // Resolve symmetric repulsion between two overlapping circular objects.
  // pushFactor: how overlap is split between A and B (0..1)
  // strength: overall multiplier for separation and impulse (0..+) — use <1 for weaker repulsion
  resolveRepel(A, B, pushFactor = 0.5, strength = 1.0) {
    // clamp pushFactor to [0,1]
    const p = Math.max(0, Math.min(1, pushFactor));
    // clamp strength to [0, Infinity) but cap at 1.0 for sane defaults here
    const s = Math.max(0, Math.min(1, strength));

    // centers
    const ax = (A.position.x || 0) + (A.width || 0) / 2;
    const ay = (A.position.y || 0) + (A.height || A.width || 0) / 2;
    const bx = (B.position.x || 0) + (B.width || 0) / 2;
    const by = (B.position.y || 0) + (B.height || B.width || 0) / 2;

    let dx = ax - bx;
    let dy = ay - by;
    let dist = Math.hypot(dx, dy);

    // handle exact overlap (avoid div by zero)
    if (dist === 0) {
      // choose random small direction
      const angle = Math.random() * Math.PI * 2;
      dx = Math.cos(angle);
      dy = Math.sin(angle);
      dist = 1;
    }

    const radiusA = Math.max(A.width || 0, A.height || 0) / 2;
    const radiusB = Math.max(B.width || 0, B.height || 0) / 2;
    const overlap = radiusA + radiusB - dist;

    if (overlap <= 0) return; // nothing to do

    const nx = dx / dist;
    const ny = dy / dist;

  // apply a small positional separation first (prevent sticking)
  // tuned values: allow a larger instant separation so objects visibly separate more
  const baseSeparation = Math.min(Math.max(overlap * 1.2, 40), 80); // base separation
  const separation = baseSeparation * s;
  A.position.x += nx * separation * p;
  A.position.y += ny * separation * p;
  B.position.x -= nx * separation * (1 - p);
  B.position.y -= ny * separation * (1 - p);

    // apply velocity impulse based on overlap and relative masses so they fly apart
    // use both overlap and a minimum impulse so very-small overlaps still create movement
  const minImpulse = 20; // tunable minimum impulse (raised for bouncier feel)
  const baseImpulse = Math.max(overlap * 3.0, minImpulse); // base impulse scalar (stronger)
  const impulse = baseImpulse * s;
    const invMassA = 1 / (A.mass || 1);
    const invMassB = 1 / (B.mass || 1);

    const impulseA = impulse * (invMassA / (invMassA + invMassB));
    const impulseB = impulse * (invMassB / (invMassA + invMassB));

    A.vx += nx * impulseA;
    A.vy += ny * impulseA;

    B.vx -= nx * impulseB;
    B.vy -= ny * impulseB;

    // clamp velocities to avoid runaway speeds while keeping bouncy feel
    const maxVel = 200;
    A.vx = Math.max(-maxVel, Math.min(maxVel, A.vx));
    A.vy = Math.max(-maxVel, Math.min(maxVel, A.vy));
    B.vx = Math.max(-maxVel, Math.min(maxVel, B.vx));
    B.vy = Math.max(-maxVel, Math.min(maxVel, B.vy));
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