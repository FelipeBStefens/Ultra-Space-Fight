// Declaring the package of the Configuration class;
package com.ultra_space_fight.ultra_space_fight.models.userProfile;

// Declaring the Configuration class;
public class Configuration {
    
    // Attributes of the Configuration class;
    private long idConfiguration;
    private String language;
    private float soundtrack;
    private float soundEffects;

    // Relation with User class;
    private User user;

    // Constructor of the Configuration class;
    public Configuration(String language, float soundtrack, float soundEffects, User user) {
        
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
        this.soundtrack = 0.3f;
        this.soundEffects = 0.5f;
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
    public float getSoundtrack() {
        return soundtrack;
    }

    public void setSoundtrack(float soundtrack) {
        this.soundtrack = soundtrack;
    }

    // Getter and Setter of the soundEffects;
    public float getSoundEffects() {
        return soundEffects;
    }

    public void setSoundEffects(float soundEffects) {
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