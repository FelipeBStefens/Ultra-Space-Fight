
package com.ultra_space_fight.ultra_space_fight.models.userProfile;


import java.math.BigDecimal;


public class Configuration {
    

    private long idConfiguration;
    private String language;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;


    private User user;


    public Configuration() {

        this.language = "English"; 
        this.soundtrack = new BigDecimal("0.3");
        this.soundEffects = new BigDecimal("0.5");
    };
    

    public Configuration(String language, BigDecimal soundtrack, BigDecimal soundEffects, User user) {
        

        this.language = language;
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;
        this.user = user;
    }


    public Configuration(User user) {


        this.language = "English"; 
        this.soundtrack = new BigDecimal("0.3");
        this.soundEffects = new BigDecimal("0.5");
        this.user = user;
    }


    public long getIdConfiguration() {
        return idConfiguration;
    }

    public void setIdConfiguration(long idConfiguration) {
        this.idConfiguration = idConfiguration;
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


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}