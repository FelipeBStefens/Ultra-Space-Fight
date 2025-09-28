// Declaring the package of the Configuration class;
package com.ultra_space_fight.ultra_space_fight.models.userProfile;

// Imports of the BigDecimal type;
import java.math.BigDecimal;

// Declaring the Configuration class;
public class Configuration {
    
    // Attributes of the Configuration class;
    private long idConfiguration;
    private String language;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;

    // Relation with User class;
    private User user;

    public Configuration() {

        this.language = "English"; 
        this.soundtrack = new BigDecimal("0.3");
        this.soundEffects = new BigDecimal("0.5");
    };
    
    // Constructor of the Configuration class;
    public Configuration(String language, BigDecimal soundtrack, BigDecimal soundEffects, User user) {
        
        // Initializing the attributes of the Configuration class;
        this.language = language;
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;
        this.user = user;
    }

    // Constructor with default values;
    public Configuration(User user) {

        // Initializing the attributes of the Configuration class;
        this.language = "English"; 
        this.soundtrack = new BigDecimal("0.3");
        this.soundEffects = new BigDecimal("0.5");
        this.user = user;
    }

    // Getter and Setter of the idConfiguration;
    public long getIdConfiguration() {
        return idConfiguration;
    }

    public void setIdConfiguration(long idConfiguration) {
        this.idConfiguration = idConfiguration;
    }

    // Getter and Setter of the Language;
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    // Getter and Setter of the soundtrack;
    public BigDecimal getSoundtrack() {
        return soundtrack;
    }

    public void setSoundtrack(BigDecimal soundtrack) {
        this.soundtrack = soundtrack;
    }

    // Getter and Setter of the soundEffects;
    public BigDecimal getSoundEffects() {
        return soundEffects;
    }

    public void setSoundEffects(BigDecimal soundEffects) {
        this.soundEffects = soundEffects;
    }

    // Getter and Setter of the User class;
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}