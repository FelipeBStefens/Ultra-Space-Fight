
import EnemySpawner from "../Engine/scriptSpawner.js";
import CollisionManager from "../Engine/scriptCollisionManager.js";
import AssetLoader from "../Engine/scriptAssetLoader.js";
import InputManager from "../Engine/scriptInputManager.js";
import gameOver from "./scriptGameOver.js";
import { values, getSelectedSpaceship } from "./scriptHeadsUpDisplay.js";
import BattleCruiser from "../Models/Bosses/scriptBattleCruiser.js"; 
import SpaceDreadnought from "../Models/Bosses/scriptSpaceDreadnought.js";
import SoundManager from "../Engine/scriptSoundManager.js"; 
import { ASSETS_IMAGES } from "../Utils/scriptConstants.js";
import ShakeEffect from "../Engine/scriptShakeEffect.js";
import PhysicsManager from "../Engine/scriptPhysicsManager.js";
import EntityManager from "../Engine/scriptEntityManager.js";
import GameManager from "../Engine/scriptGameManager.js";


const user = JSON.parse(localStorage.getItem("user"));

if (!user) window.location.href = "../../enter.html";


SoundManager.initSoundEffects();


const canvas = document.getElementById("gameCanvas");
const contex = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


contex.imageSmoothingEnabled = false;


const player = getSelectedSpaceship(canvas);
const shakeEffect = new ShakeEffect();
const physicsManager = new PhysicsManager(canvas);


EntityManager.init(canvas, player);


let input = new InputManager();


let collisionManager = new CollisionManager([], () => shakeEffect.startShake()); 
let spawner = new EnemySpawner(canvas);


GameManager.initBosses([
    new BattleCruiser(10000, 20, 20, canvas), 
    new SpaceDreadnought(canvas, 20000, 30, 30, spawner)
]);


const gameLoop = () => {


    if (!GameManager.isPaused && !GameManager.isGameOver) {
        

        contex.clearRect(0, 0, canvas.width, canvas.height);
        

        input.update();

        contex.save();


        shakeEffect.applyShake(contex);
        

        input.applyInputs(canvas);


        GameManager.update(spawner, shakeEffect);


        EntityManager.updateEntity();
        EntityManager.removeEntity();


        collisionManager.entities = EntityManager.getAllEntities();
        

        if (GameManager.currentBoss) {
            collisionManager.entities.push(GameManager.currentBoss);
        }
        

        collisionManager.update();
          

        physicsManager.applyPhysics();


        if (GameManager.isBossFight && GameManager.currentBoss) {
            GameManager.currentBoss.draw(contex);
        }


        EntityManager.drawEntity(contex);

        contex.restore();
    }
    

    requestAnimationFrame(gameLoop);
}


AssetLoader.preload(ASSETS_IMAGES)
.then(() => {



    window.addEventListener('playerGameOver', () => {
        

        GameManager.isGameOver = true; 
        

        gameOver(values); 
        
    }, { once: true });


    gameLoop();
})
.catch(error => {
    console.log(error);
    alert("The Website could not Load the Assets:", error);
});