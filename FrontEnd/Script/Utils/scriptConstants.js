// Achievements Frames Images;
const FRAME_BLOCKED = "../../Assets/Achievements/BlockedAchievement.png";
const FRAME_BRONZE = "../../Assets/Achievements/BronzeAchievement.png";
const FRAME_SILVER = "../../Assets/Achievements/SilverAchievement.png";
const FRAME_GOLD = "../../Assets/Achievements/GoldAchievement.png";

// Achievements Icon Images;
const ICON_BLOCKED = "../../Assets/Icons/Blocked.png";
const ICON_SCORE = "../../Assets/Icons/Score.png"; 
const ICON_MATCH = "../../Assets/Icons/Score.png"; 
const ICON_ENEMIES = "../../Assets/Icons/DefeatedEnemies.png";
const ICON_ELITE = "../../Assets/Icons/DefeatedElites.png"; 
const ICON_BOSS = "../../Assets/Icons/DefeatedBoss.png"; 

// Score to use the Spaceship;
const STANDART_SHIP_SCORE = 0;
const SPEED_SHIP_SCORE = 500;
const DESTROYER_SHIP_SCORE = 1000;
const FREIGHTER_SHIP_SCORE = 2000;
const ELITE_SHIP_SCORE = 4000;

// Cost to Upgrade the Spaceship;
const STANDART_SHIP_COST = 50;
const SPEED_SHIP_COST = 75;
const DESTROYER_SHIP_COST = 100;
const FREIGHTER_SHIP_COST = 120;
const ELITE_SHIP_COST = 200;

// Max Upgrade value;
export const MAX_STATS = 20;

// Spaceships Images;
export const STANDART_SHIP_IMAGE = "../../Assets/GameObjects/Spaceships/StandartShip.png";
export const SPEED_SHIP_IMAGE = "../../Assets/GameObjects/Spaceships/SpeedShip.png";
export const DESTROYER_SHIP_IMAGE = "../../Assets/GameObjects/Spaceships/DestroyerShip.png";
export const FREIGHTER_SHIP_IMAGE = "../../Assets/GameObjects/Spaceships/FreighterShip.png";
export const ELITE_SHIP_IMAGE = "../../Assets/GameObjects/Spaceships/EliteShip.png";

// Enemies Images;
export const SCOUT_ENEMY_IMAGE = "../../Assets/GameObjects/Enemies/ScoutEnemy.png";
export const SOLDIER_ENEMY_IMAGE = "../../Assets/GameObjects/Enemies/SoldierEnemy.png";
export const TANK_ENEMY_IMAGE = "../../Assets/GameObjects/Enemies/TankEnemy.png";
export const ELITE_ENEMY_IMAGE = "../../Assets/GameObjects/Enemies/EliteEnemy.png";

// Boss Images;
export const SPACE_DREADNOUGHT_IMAGE = "../../Assets/GameObjects/Boss/SpaceDreadnought.png";
export const BATTLE_CRUISER_IMAGE = "../../Assets/GameObjects/Boss/BattleCruiser.png";

// Thrusters Images;
export const FIRE_THRUSTER_IMAGE = "../../Assets/GameObjects/Sprites/FireThruster.png";
export const ION_THRUSTER_IMAGE = "../../Assets/GameObjects/Sprites/IonThruster.png";

// Explosion and Bullet Image;
export const EXPLOSION_IMAGE = "../../Assets/GameObjects/Sprites/Explosion.png";
export const BULLET_IMAGE = "../../Assets/GameObjects/Sprites/Shoot.png";

// Sound Effects Images;
const SHOOT_SOUND_EFFECT = "../../Assets/Audios/SoundEffects/ShootSoundEffect.mp3";
const ENEMY_EXPLOSION_SOUND_EFFECT = "../../Assets/Audios/Explosions/EnemyExplosion.mp3";
const SHOOT_EXPLOSION_SOUND_EFFECT = "../../Assets/Audios/Explosions/ShootExplosion.mp3";
const FIRE_THRUSTER_SOUND_EFFECT = "../../Assets/Audios/Thrusters/FireThruster.mp3";
const ION_THRUSTER_SOUND_EFFECT = "../../Assets/Audios/Thrusters/IonThruster.mp3";
const GAME_OVER_VOICE_SOUND_EFFECT = "../../Assets/Audios/SoundEffects/GameOverVoiceSoundEffect.mp3";
const EARTHQUAKE_SOUND_EFFECT = "../../Assets/Audios/SoundEffects/EarthquakeSoundEffect.mp3";
const SCREAM_SOUND_EFFECT = "../../Assets/Audios/SoundEffects/ScreamSoundEffect.mp3";

// Soundtrack Image;
export const GAMEPLAY_SOUNDTRACK = "../../Assets/Audios/Soundtracks/GameplaySoundtrack.mp3";
export const BOSS_GAMEPLAY_SOUNDTRACK = "../../Assets/Audios/Soundtracks/BossGameplaySoundtrack.mp3";
export const GAME_OVER_SOUNDTRACK = "../../Assets/Audios/Soundtracks/GameOverSoundtrack.mp3";

// Heart Image;
export const HEART_IMAGE = "../../Assets/Icons/Heart.png";

// Array with all Frames;
export const FRAME_ARRAY = {
    FRAME_BLOCKED: FRAME_BLOCKED,
    FRAME_BRONZE: FRAME_BRONZE,
    FRAME_SILVER: FRAME_SILVER,
    FRAME_GOLD: FRAME_GOLD
};

// Array with all Icons;
export const ICON_ARRAY = {
    ICON_BLOCKED: ICON_BLOCKED,
    ICON_SCORE: ICON_SCORE,
    ICON_MATCH: ICON_MATCH,
    ICON_ENEMIES: ICON_ENEMIES,
    ICON_ELITE: ICON_ELITE,
    ICON_BOSS: ICON_BOSS
};

// Array with all Spaceships score required;
export const SPACESHIPS_REQUIREMENTS = {
    standart_ship: STANDART_SHIP_SCORE, 
    speed_ship: SPEED_SHIP_SCORE,
    destroyer_ship: DESTROYER_SHIP_SCORE,
    freighter_ship: FREIGHTER_SHIP_SCORE,
    elite_ship: ELITE_SHIP_SCORE
};

// Array with all Spaceships costs to upgrade;
export const SPACESHIPS_COSTS = {
    standart_ship: STANDART_SHIP_COST, 
    speed_ship: SPEED_SHIP_COST,
    destroyer_ship: DESTROYER_SHIP_COST,
    freighter_ship: FREIGHTER_SHIP_COST,
    elite_ship: ELITE_SHIP_COST
};

// Array with all Assets Sound Effects;
export const ASSETS_AUDIOS = {
    SHOOT_SOUND_EFFECT: SHOOT_SOUND_EFFECT,
    ENEMY_EXPLOSION_SOUND_EFFECT: ENEMY_EXPLOSION_SOUND_EFFECT,
    SHOOT_EXPLOSION_SOUND_EFFECT: SHOOT_EXPLOSION_SOUND_EFFECT,
    FIRE_THRUSTER_SOUND_EFFECT: FIRE_THRUSTER_SOUND_EFFECT,
    ION_THRUSTER_SOUND_EFFECT: ION_THRUSTER_SOUND_EFFECT,
    GAME_OVER_VOICE_SOUND_EFFECT: GAME_OVER_VOICE_SOUND_EFFECT,
    EARTHQUAKE_SOUND_EFFECT: EARTHQUAKE_SOUND_EFFECT,
    SCREAM_SOUND_EFFECT: SCREAM_SOUND_EFFECT
}

// Array with all Assets Images;
export const ASSETS_IMAGES = [
    STANDART_SHIP_IMAGE, 
    SPEED_SHIP_IMAGE,
    DESTROYER_SHIP_IMAGE,
    FREIGHTER_SHIP_IMAGE,
    ELITE_SHIP_IMAGE,
    SCOUT_ENEMY_IMAGE,
    SOLDIER_ENEMY_IMAGE,
    TANK_ENEMY_IMAGE,
    ELITE_ENEMY_IMAGE,
    SPACE_DREADNOUGHT_IMAGE,
    BATTLE_CRUISER_IMAGE,
    FIRE_THRUSTER_IMAGE,
    ION_THRUSTER_IMAGE,
    EXPLOSION_IMAGE,
    BULLET_IMAGE
];