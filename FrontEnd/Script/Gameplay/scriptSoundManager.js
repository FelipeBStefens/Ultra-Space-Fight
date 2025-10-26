class SoundManager {

    static sounds = {};
    static loopingSounds = {};
    static music = null;

    static loadSound(name, src) {
        const audio = new Audio(src);
        audio.preload = "auto";
        SoundManager.sounds[name] = audio;
    }

    static playSound(name) {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const base = SoundManager.sounds[name];
        if (!base) return;

        const sound = base.cloneNode();
        sound.volume = user.soundEffects ?? 0.5; 
        sound.play().catch(err => console.warn(`Erro ao tocar som ${name}:`, err));
    }

    static playMusic(src) {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const volume = user.soundtrack ?? 0.5;

        if (SoundManager.music) SoundManager.music.pause();

        const music = new Audio(src);
        music.loop = true;
        music.volume = volume;
        music.play().catch(err => console.warn("Música bloqueada:", err));

        SoundManager.music = music;
    }

    static updateMusicVolume() {
        if (SoundManager.music) {
            const user = JSON.parse(localStorage.getItem("user")) || {};
            SoundManager.music.volume = user.soundtrack ?? 0.5;
        }
    }

    static stopMusic() {
        if (SoundManager.music) SoundManager.music.pause();
    }
}

export default SoundManager;