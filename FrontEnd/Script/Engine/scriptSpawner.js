
import ScoutEnemy from "../Models/Enemies/scriptScoutEnemy.js";
import SoldierEnemy from "../Models/Enemies/scriptSoldierEnemy.js";
import TankEnemy from "../Models/Enemies/scriptTankEnemy.js";
import EliteEnemy from "../Models/Enemies/scriptEliteEnemy.js";

import EntityManager from "./scriptEntityManager.js";

import { getCenterVector, getDifferentialVectorByObject, getVectorMagnitude, clamp } from "../Utils/scriptMath.js";


class EnemySpawner {


    canvas;             
    spawnInterval;      
    lastSpawnTime;      
    limitEnemies;       


    constructor(canvas) {
        this.canvas = canvas;

        this.limitEnemies = 10;
        this.spawnInterval = 5000;
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


        if (EntityManager.enemies.length >= this.limitEnemies) {
            return;
        }


        const enemyType = this.getRandomEnemyType();


        const { x, y } = this.getSpawnPosition();


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


        EntityManager.addEnemy(enemy);
    }


    getRandomEnemyType() {
        const rand = Math.random();


        if (rand < 0.35) return "scoutEnemy";
        else if (rand < 0.65) return "soldierEnemy";
        else if (rand < 0.95) return "tankEnemy";
        else return "eliteEnemy";
    }


    getSpawnPosition() {

        const side = Math.floor(Math.random() * 4);
        const margin = 150;

        switch (side) {
            case 0:
                return { x: Math.random() * this.canvas.width, y: -margin };
            case 1:
                return { x: Math.random() * this.canvas.width, y: this.canvas.height + margin };
            case 2:
                return { x: -margin, y: Math.random() * this.canvas.height };
            case 3:
                return { x: this.canvas.width + margin, y: Math.random() * this.canvas.height };
        }
    }


    spawnEnemyAt(enemyType, boss, xPercent, yPercent) {


        if (EntityManager.enemies.length >= this.limitEnemies) {
            return;
        }


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


        const bossCenterPosition = getCenterVector(boss.position, boss.width, boss.height);
        const enemyCenterPosition = getCenterVector(enemy.position, enemy.width, enemy.height);
        
        const differentialVector = getDifferentialVectorByObject(enemyCenterPosition, {objectX: bossCenterPosition.x, objectY: bossCenterPosition.y});
        const vectorMagnitude = getVectorMagnitude(differentialVector);
        
        const radiusBoss = boss.width / 2;
        const radiusEnemy = enemy.width / 2;


        const overlap = radiusBoss + radiusEnemy - vectorMagnitude;


        if (overlap >= 0) {


            const targetX = boss.position.x + boss.width * xPercent; 
            const targetY = boss.position.y + boss.height + 12;


            enemy.position.x = clamp(targetX, 0, this.canvas.width - enemy.width);
            enemy.position.y = clamp(targetY, 0, this.canvas.height - enemy.height);
            

            enemy.vy += Math.min(12 * 0.6 + 2, 8); 
        }
        

        EntityManager.addEnemy(enemy);
    }
}


export default EnemySpawner;