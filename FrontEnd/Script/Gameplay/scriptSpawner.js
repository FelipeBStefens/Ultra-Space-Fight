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
            console.log("New enemy");
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
        console.log("Enemy spawned");
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
}

export default EnemySpawner;