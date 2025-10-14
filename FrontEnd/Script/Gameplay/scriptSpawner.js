import ScoutEnemy from "../Models/Enemies/scriptScoutEnemy.js";
import SoldierEnemy from "../Models/Enemies/scriptSoldierEnemy.js";
import TankEnemy from "../Models/Enemies/scriptTankEnemy.js";
import EliteEnemy from "../Models/Enemies/scriptEliteEnemy.js";

class EnemySpawner {

    canvas;
    enemies;
    player;
    spawnInterval;
    lastSpawnTime;

    constructor(canvas, enemies, player) {
        this.canvas = canvas;
        this.enemies = enemies;
        this.player = player;

        this.spawnInterval = 3000; 
        this.lastSpawnTime = Date.now();
    }

    update() {
        const now = Date.now();

        if (now - this.lastSpawnTime >= this.spawnInterval) {
            this.spawnEnemy();
            this.lastSpawnTime = now;
        }
    }

    spawnEnemy() {
        // Escolher tipo com peso
        const enemyType = this.getRandomEnemyType();

        // Posição fora do canvas
        const { x, y } = this.getSpawnPosition();

        // Instanciar inimigo
        let enemy;
        if (enemyType === "scoutEnemy") {
            enemy = new ScoutEnemy({x, y});
        }
        else if (enemyType === "soldierEnemy") {
            enemy = new SoldierEnemy({x, y});
        }
        else if (enemyType === "tankEnemy") {
            enemy = new TankEnemy({x, y});
        }
        else if (enemyType === "eliteEnemy") {
            enemy = new EliteEnemy({x, y});
        }

        // Adiciona ao array
        this.enemies.push(enemy);
    }

    getRandomEnemyType() {
        const rand = Math.random();

        if (rand < 0.4) return "scoutEnemy";
        else if (rand < 0.6) return "soldierEnemy";
        else if (rand < 0.8) return "tankEnemy";
        else return "eliteEnemy";
    }

    getSpawnPosition() {
        const side = Math.floor(Math.random() * 4);
        const margin = 100; // distância fora da tela

        switch (side) {
            case 0: // top
                return { x: Math.random() * this.canvas.width, y: -margin };
            case 1: // bottom
                return { x: Math.random() * this.canvas.width, y: this.canvas.height + margin };
            case 2: // left
                return { x: -margin, y: Math.random() * this.canvas.height };
            case 3: // right
                return { x: this.canvas.width + margin, y: Math.random() * this.canvas.height };
        }
    }

    // No EnemySpawner
    spawnEnemyAt(enemyType, boss, xPercent, yPercent) {
        // Calcula posição absoluta na tela
        const x = boss.position.x + boss.width * xPercent;
        const y = boss.position.y + boss.height * yPercent;

        let enemy;
        if (enemyType === "scoutEnemy") {
            enemy = new ScoutEnemy({x, y});
        }
        else if (enemyType === "soldierEnemy") {
            enemy = new SoldierEnemy({x, y});
        }
        else if (enemyType === "tankEnemy") {
            enemy = new TankEnemy({x, y});
        }
        else if (enemyType === "eliteEnemy") {
            enemy = new EliteEnemy({x, y});
        }

        // If the spawn position overlaps the boss, push the enemy outward until it's outside
        try {
            const bossCx = (boss.position.x || 0) + (boss.width || 0) / 2;
            const bossCy = (boss.position.y || 0) + (boss.height || 0) / 2;
            const enemyCx = (enemy.position.x || 0) + (enemy.width || 0) / 2;
            const enemyCy = (enemy.position.y || 0) + (enemy.height || 0) / 2;

            let dx = enemyCx - bossCx;
            let dy = enemyCy - bossCy;
            let dist = Math.hypot(dx, dy);

            const radiusBoss = Math.max(boss.width || 0, boss.height || 0) / 2;
            const radiusEnemy = Math.max(enemy.width || 0, enemy.height || 0) / 2;
            const overlap = radiusBoss + radiusEnemy - dist;

            if (overlap >= 0) {
                // Force spawn BELOW the boss: place enemy right under boss bottom with small padding
                const padding = 12;
                const targetX = boss.position.x + boss.width * xPercent; // keep horizontal relative position
                const targetY = boss.position.y + boss.height + padding;

                enemy.position.x = Math.max(0, Math.min(this.canvas.width - enemy.width, targetX));
                enemy.position.y = Math.max(0, Math.min(this.canvas.height - enemy.height, targetY));

                // give a small downward velocity so it visibly exits below the boss
                enemy.vx = (enemy.vx || 0) + 0; // no horizontal impulse
                enemy.vy = (enemy.vy || 0) + Math.min(padding * 0.6 + 2, 8);
            }
        } catch (e) {
            // if anything goes wrong, at least push the enemy a little to avoid stuck
            enemy.position.x += 0;
        }

        this.enemies.push(enemy);
    }
}

export default EnemySpawner;