// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score;

// Declaring ScoreDTO class;
public class ScoreDTO {
    
    // Attributes of ScoreDTO class;
    private int score;
    private int scoreMatch;

    // Empty constructor;
    public ScoreDTO() {}

    // Constructor;
    public ScoreDTO(int score, int scoreMatch) {
        
        // Initializing the Attribute values;
        this.score = score;
        this.scoreMatch = scoreMatch;
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
}