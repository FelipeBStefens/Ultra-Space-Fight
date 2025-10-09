package com.ultra_space_fight.ultra_space_fight.transferObjects;

import java.math.BigDecimal;

public class UserResponseTDO {
    
    private long idUser;
    private String selectedSpaceship;
    private SpaceshipValuesTDO spaceshipValues;
    private int score;
    private int scoreMatch;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;

    public UserResponseTDO() {}

    public UserResponseTDO(long idUser, String selectedSpaceship, SpaceshipValuesTDO spaceshipValues,
        int score, int scoreMatch, BigDecimal soundtrack, BigDecimal soundEffects) {
        this.idUser = idUser;
        this.selectedSpaceship = selectedSpaceship;
        this.spaceshipValues = spaceshipValues;
        this.score = score;
        this.scoreMatch = scoreMatch;
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;

    }
    
    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public String getSelectedSpaceship() {
        return selectedSpaceship;
    }

    public void setSelectedSpaceship(String selectedSpaceship) {
        this.selectedSpaceship = selectedSpaceship;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
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

    public SpaceshipValuesTDO getSpaceshipValues() {
        return spaceshipValues;
    }

    public void setSpaceshipValues(SpaceshipValuesTDO spaceshipValues) {
        this.spaceshipValues = spaceshipValues;
    }
}
