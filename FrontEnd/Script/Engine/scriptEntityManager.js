
import { isInInterval } from "../Utils/scriptMath.js";

import { updateDefeatedEnemies } from "../Gameplay/scriptHeadsUpDisplay.js";

import Explosion from "../Models/Explosion/scriptExplosion.js";


class EntityManager {


    static canvas;                  
    static player;                  
    static enemies;                 
    static bullets;                 
    static explosions;              
    static enemiesDefeated;         


    static init(canvas, player) {

        EntityManager.canvas = canvas;
        EntityManager.player = player;


        EntityManager.enemies = [];
        EntityManager.bullets = [];
        EntityManager.explosions = [];
        EntityManager.enemiesDefeated = 0;
    }


    static addEnemy(enemy) {
        EntityManager.enemies.push(enemy);
    }

    static addBullet(bullet) {
        EntityManager.bullets.push(bullet);
    }

    static addExplosion(explosion) {
        EntityManager.explosions.push(explosion);
    }




    static updateEntity() {
        
        EntityManager.enemies.forEach(enemy => {

            enemy.update(EntityManager.player, EntityManager.canvas);
        });
    
        EntityManager.bullets.forEach(bullet => {
            bullet.update();
        });

        EntityManager.explosions.forEach(explosion => {
            explosion.update();
        });
    }


    static drawEntity(contex) {


        EntityManager.player.draw(contex);


        EntityManager.enemies.forEach(enemy => {
            enemy.draw(contex);
        });
    
        EntityManager.bullets.forEach(bullet => {
            bullet.draw(contex);
        });

        EntityManager.explosions.forEach(explosion => {
            explosion.draw(contex);
        });
    }


    static removeEntity() {


        for (let i = EntityManager.bullets.length - 1; i >= 0; i--) {
            
            const bullet = EntityManager.bullets[i];
            

            if (!bullet.active || 
                !isInInterval(bullet.position.x, 0, EntityManager.canvas.width) ||
                !isInInterval(bullet.position.y, 0, EntityManager.canvas.height)) {
                
                EntityManager.bullets.splice(i, 1);
            }
        }


        for (let i = EntityManager.enemies.length - 1; i >= 0; i--) {
            
            const enemy = EntityManager.enemies[i];
            

            if (!enemy.active) {
                
                EntityManager.spawnExplosion(enemy);
                EntityManager.enemies.splice(i, 1);
                

                updateDefeatedEnemies();
                EntityManager.enemiesDefeated++;
            }
        }


        for (let i = EntityManager.explosions.length - 1; i >= 0; i--) {


            if (!EntityManager.explosions[i].active) {

                EntityManager.explosions.splice(i, 1);
            }
        }
    }


    static spawnExplosion(enemy) {
        
        const explosion = new Explosion(
            enemy.position.x,
            enemy.position.y,
            222,
            259,
            "enemyExplosion"
        );

        EntityManager.addExplosion(explosion);
    }


    static getAllEntities() {
        return [EntityManager.player, ...EntityManager.enemies, ...EntityManager.bullets];
    }


    static getAllPhysicalEntities() {
        return [EntityManager.player, ...EntityManager.enemies];
    }
}


export default EntityManager;