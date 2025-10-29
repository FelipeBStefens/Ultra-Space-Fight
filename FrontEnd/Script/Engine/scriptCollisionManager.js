
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

  resolveRepel(A, B, pushFactor = 0.5, strength = 1.0) {
      const p = Math.max(0, Math.min(1, pushFactor));
      const s = Math.max(0, Math.min(1, strength));

      const ax = (A.position.x || 0) + (A.width || 0) / 2;
      const ay = (A.position.y || 0) + (A.height || A.width || 0) / 2;
      const bx = (B.position.x || 0) + (B.width || 0) / 2;
      const by = (B.position.y || 0) + (B.height || B.width || 0) / 2;

      let dx = ax - bx;
      let dy = ay - by;
      let dist = Math.hypot(dx, dy);

      if (dist === 0) {
          const angle = Math.random() * Math.PI * 2;
          dx = Math.cos(angle);
          dy = Math.sin(angle);
          dist = 1;
      }

      const radiusA = Math.max(A.width || 0, A.height || 0) / 2;
      const radiusB = Math.max(B.width || 0, B.height || 0) / 2;
      const overlap = radiusA + radiusB - dist;

      if (overlap <= 0) return;

      const nx = dx / dist;
      const ny = dy / dist;

      const baseSeparation = Math.min(Math.max(overlap * 1.2, 40), 80);
      const separation = baseSeparation * s;

      // ⚡ Ajuste para Boss em intro: só move o outro objeto
      if (A.type === "boss" && A.introActive) {
          B.position.x -= nx * separation;
          B.position.y -= ny * separation;

          const minImpulse = 20;
          const impulse = Math.max(overlap * 3.0, minImpulse) * s;
          const invMassB = 1 / (B.mass || 1);

          B.vx -= nx * impulse * invMassB;
          B.vy -= ny * impulse * invMassB;
          return; // não mover o Boss
      }

      if (B.type === "boss" && B.introActive) {
          A.position.x += nx * separation;
          A.position.y += ny * separation;

          const minImpulse = 20;
          const impulse = Math.max(overlap * 5.0, minImpulse) * s;
          const invMassA = 1 / (A.mass || 1);

          A.vx += nx * impulse * invMassA;
          A.vy += ny * impulse * invMassA;
          return; // não mover o Boss
      }

      // comportamento padrão
      A.position.x += nx * separation * p;
      A.position.y += ny * separation * p;
      B.position.x -= nx * separation * (1 - p);
      B.position.y -= ny * separation * (1 - p);

      const minImpulse = 20;
      const baseImpulse = Math.max(overlap * 3.0, minImpulse);
      const impulse = baseImpulse * s;
      const invMassA = 1 / (A.mass || 1);
      const invMassB = 1 / (B.mass || 1);

      const impulseA = impulse * (invMassA / (invMassA + invMassB));
      const impulseB = impulse * (invMassB / (invMassA + invMassB));

      A.vx += nx * impulseA;
      A.vy += ny * impulseA;
      B.vx -= nx * impulseB;
      B.vy -= ny * impulseB;
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

  isCollidingEllipseCircle(boss, circle) {
      // 1. Centro da elipse (Boss)
      const cx = boss.position.x + boss.width / 2;
      const cy = boss.position.y + boss.height / 2;
      // 2. Centro do círculo
      const ox = circle.position.x + circle.width / 2;
      const oy = circle.position.y + circle.height / 2;
      
      // 3. Vetor do centro da elipse para o círculo
      let dx = ox - cx;
      let dy = oy - cy;

      // 4. Rotação! Transformar o ponto do círculo para o espaço local (não-rotacionado) do boss
      // O boss tem um ângulo, então rotacionamos o vetor 'dx, dy' pelo ângulo *negativo* do boss.
      // É o mesmo que rotacionar o sistema de coordenadas de volta.
      const angle = boss.angle;
      const cosA = Math.cos(-angle);
      const sinA = Math.sin(-angle);

      const rotatedX = dx * cosA - dy * sinA;
      const rotatedY = dx * sinA + dy * cosA;

      // 5. Semi-eixos da elipse (com padding)
      const a = boss.width / 2 + BOSS_ELLIPSE_PADDING_X;
      const b = boss.height / 2;

      // 6. Coordenadas normalizadas (usando o ponto *rotacionado*)
      const nx = rotatedX / a;
      const ny = rotatedY / b;

      // 7. Aproximação do raio normalizado do círculo
      const r = Math.max(circle.width, circle.height) / 2;
      const radiusNormalized = r / Math.min(a, b); // Usamos o menor semi-eixo para uma aproximação segura

      // 8. Colisão ocorre se o ponto normalizado está dentro do raio do círculo unitário + raio do círculo
      const colliding = (nx * nx + ny * ny) <= (1 + radiusNormalized) ** 2;

      // Se estiver colidindo e o chefe estiver se movendo, você pode querer armazenar o ponto
      // rotacionado e o ângulo para a correção do repel (Próxima seção).
      if (colliding) {
          // Armazena informações na entidade para uso no resolveRepel (opcional, mas útil)
          circle.collisionNormal = { x: rotatedX, y: rotatedY, nx, ny };
          circle.collisionDistance = Math.hypot(rotatedX, rotatedY);
      }
      
      return colliding;
  }
}

export default CollisionManager;