package com.ultra_space_fight.ultra_space_fight.transferObjects;

import java.math.BigDecimal;

public class SoundTDO {
    
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;

    public SoundTDO(BigDecimal soundtrack, BigDecimal soundEffects) {
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;
    }

    public BigDecimal getSoundtrack() {
        return soundtrack;
    }

    public void setSoundtrack(BigDecimal soundtrack) {
        this.soundtrack = soundtrack;
    }

    public BigDecimal getSoundEffects() {
        return soundEffects;
    }

    public void setSoundEffects(BigDecimal soundEffects) {
        this.soundEffects = soundEffects;
    }
}
