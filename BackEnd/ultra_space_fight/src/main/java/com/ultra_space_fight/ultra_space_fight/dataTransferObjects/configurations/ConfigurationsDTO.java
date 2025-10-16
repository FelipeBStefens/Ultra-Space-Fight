// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations;

// Import;
import java.math.BigDecimal;

// Declaring ConfigurationsDTO class;
public class ConfigurationsDTO {
    
    // Attributes of ConfigurationsDTO class;
    private String username;
    private String password;
    private String language;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;  

    // Empty constructor;
    public ConfigurationsDTO() {}

    // Constructor;
    public ConfigurationsDTO(String username, String password, String language,
        BigDecimal soundtrack, BigDecimal soundEffects) {

        // Initializing the Attribute values;
        this.username = username;
        this.password = password;
        this.language = language;
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;   
    }

    // Getter and Setter of Username;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter of Password;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and Setter of Language; 
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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