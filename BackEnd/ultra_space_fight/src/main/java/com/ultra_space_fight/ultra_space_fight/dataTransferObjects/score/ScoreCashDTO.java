// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score;

// Declaring ScoreCashDTO class;
public class ScoreCashDTO {
    
    // Attributes of ScoreCashDTO class;
    private int score;
    private int cash;

    // Empty constructor;
    public ScoreCashDTO() {}

    // Constructor;
    public ScoreCashDTO(int cash, int score) {
        
        // Initializing the Attribute values;
        this.cash = cash;
        this.score = score;
    }

    // Getter and Setter of Score;
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    // Getter and Setter of Cash;
    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }
}