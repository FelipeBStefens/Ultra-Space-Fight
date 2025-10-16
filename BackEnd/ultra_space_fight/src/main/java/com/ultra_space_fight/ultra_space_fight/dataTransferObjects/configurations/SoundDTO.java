// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations;

// Import;
import java.math.BigDecimal;

// Declaring SoundDTO class;
public class SoundDTO {
    
    // Attributes of SoundDTO class;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;

    // Empty constructor;
    public SoundDTO() {}

    // Constructor
    public SoundDTO(BigDecimal soundtrack, BigDecimal soundEffects) {
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;
    }

    // Getter and Setter of Soundtrack;
    public BigDecimal getSoundtrack() {
        return soundtrack;
    }

    public void setSoundtrack(BigDecimal soundtrack) {
        this.soundtrack = soundtrack;
    }

    // Getter and Setter of Sound Effects;
    public BigDecimal getSoundEffects() {
        return soundEffects;
    }

    public void setSoundEffects(BigDecimal soundEffects) {
        this.soundEffects = soundEffects;
    }
}