// Imports the constant map/object containing all audio file paths;
import { ASSETS_AUDIOS } from "../Utils/scriptConstants.js";

// Defines the SoundManager class, an essential static utility for audio management;
class SoundManager {

    // To store all loaded single-play sound effect Audio objects;
    static sounds = {};
    // Potentially intended for sounds that should loop indefinitely (currently unused in provided code, but reserved);
    static loopingSounds = {};
    // An reference to the currently playing music Audio object;
    static music = null;

    // Static method to load an audio file and cache it in the 'sounds' object;
    static loadSound(name, src) {
        const audio = new Audio(src);
        // Instructs the browser to start downloading the file immediately;
        audio.preload = "auto";
        SoundManager.sounds[name] = audio;
    }

    // Static method to play a sound effect;
    static playSound(name) {
        // Retrieves user settings from local storage;
        const user = JSON.parse(localStorage.getItem('user')) || {};
        // Gets the cached base Audio object;
        const base = SoundManager.sounds[name];
        if (!base) return;

        // Key for sound effects: Clones the base object to allow multiple instances of the same sound to play simultaneously
        const sound = base.cloneNode();
        // Sets the volume based on user settings, defaulting to 0.5;
        sound.volume = user.soundEffects ?? 0.5; 
        // Plays the sound, handling the common Promise rejection error if the browser blocks auto-play;
        sound.play().catch(err => console.warn(`Erro ao tocar som ${name}:`, err));
    }

    // Static method to start background music playback;
    static playMusic(src) {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const volume = user.soundtrack ?? 0.5;

        // Pauses any currently playing background music before starting a new track;
        if (SoundManager.music) SoundManager.music.pause();

        const music = new Audio(src);
        music.loop = true; // Ensures the music track repeats indefinitely;
        music.volume = volume;

        // Attempts to play the music, catching potential browser auto-play blocks;
        music.play().catch(err => console.warn("Música bloqueada:", err));

        // Updates the static reference to the new music track;
        SoundManager.music = music;
    }

    // Static method to adjust the music volume without stopping playback, typically called when user settings change;
    static updateMusicVolume() {
        if (SoundManager.music) {
            const user = JSON.parse(localStorage.getItem("user")) || {};
            SoundManager.music.volume = user.soundtrack ?? 0.5;
        }
    }

    // Static method to stop the current background music;
    static stopMusic() {
        if (SoundManager.music) SoundManager.music.pause();
    }

    // Static method to load all required sound effects upon game initialization;
    static initSoundEffects() {

        SoundManager.loadSound("shoot", ASSETS_AUDIOS.SHOOT_SOUND_EFFECT);
        SoundManager.loadSound("enemyExplosion", ASSETS_AUDIOS.ENEMY_EXPLOSION_SOUND_EFFECT);
        SoundManager.loadSound("shootExplosion", ASSETS_AUDIOS.SHOOT_EXPLOSION_SOUND_EFFECT);
        SoundManager.loadSound("fireThruster", ASSETS_AUDIOS.FIRE_THRUSTER_SOUND_EFFECT);
        SoundManager.loadSound("ionThruster", ASSETS_AUDIOS.ION_THRUSTER_SOUND_EFFECT);
        SoundManager.loadSound("gameOverVoice", ASSETS_AUDIOS.GAME_OVER_VOICE_SOUND_EFFECT);
        SoundManager.loadSound("earthquake", ASSETS_AUDIOS.EARTHQUAKE_SOUND_EFFECT);
        SoundManager.loadSound("scream", ASSETS_AUDIOS.SCREAM_SOUND_EFFECT);
    }
}

// Exports the static utility class;
export default SoundManager;