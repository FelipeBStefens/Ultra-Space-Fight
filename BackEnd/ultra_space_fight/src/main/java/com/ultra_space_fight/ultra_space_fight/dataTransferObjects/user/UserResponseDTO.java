// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user;

// Imports;
import java.math.BigDecimal;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipValuesDTO;

// Declaring the UserResponseDTO class;
public class UserResponseDTO {
    
    // Attributes of the UserResponseDTO class;
    private long idUser;
    private String selectedSpaceship;
    private SpaceshipValuesDTO spaceshipValues;
    private int score;
    private int scoreMatch;
    private BigDecimal soundtrack;
    private BigDecimal soundEffects;

    // Empty constructor;
    public UserResponseDTO() {}

    // Constructor;
    public UserResponseDTO(long idUser, String selectedSpaceship, SpaceshipValuesDTO spaceshipValues,
        int score, int scoreMatch, BigDecimal soundtrack, BigDecimal soundEffects) {
        
        // Initializing the Attribute values;
        this.idUser = idUser;
        this.selectedSpaceship = selectedSpaceship;
        this.spaceshipValues = spaceshipValues;
        this.score = score;
        this.scoreMatch = scoreMatch;
        this.soundtrack = soundtrack;
        this.soundEffects = soundEffects;
    }
    
    // Getter and Setter of IdUser;
    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    // Getter and Setter of Selected Spaceship;
    public String getSelectedSpaceship() {
        return selectedSpaceship;
    }

    public void setSelectedSpaceship(String selectedSpaceship) {
        this.selectedSpaceship = selectedSpaceship;
    }

    // Getter and Setter of Score;
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    // Getter and Setter of Score Match;
    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
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

    // Getter and Setter of Spaceship Values; 
    public SpaceshipValuesDTO getSpaceshipValues() {
        return spaceshipValues;
    }

    public void setSpaceshipValues(SpaceshipValuesDTO spaceshipValues) {
        this.spaceshipValues = spaceshipValues;
    }
}
