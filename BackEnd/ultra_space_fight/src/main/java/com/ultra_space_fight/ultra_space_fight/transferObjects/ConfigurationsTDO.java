package com.ultra_space_fight.ultra_space_fight.transferObjects;

import java.math.BigDecimal;

public class ConfigurationsTDO {
    
    private String username;
    private String password;
    private String language;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;  

    public ConfigurationsTDO() {}

    public ConfigurationsTDO(String username, String password, String language,
        BigDecimal soundtrack, BigDecimal soundEffects) {

        this.username = username;
        this.password = password;
        this.language = language;
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;   
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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
