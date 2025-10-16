// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking;

// Declaring RankingScoreDTO class;
public class RankingScoreDTO {
   
    // Attributes of RankingScoreDTO class;
    private int score;
    private String username;
    
    // Empty constructor;
    public RankingScoreDTO() {}

    // Constructor;
    public RankingScoreDTO(int score, String username) {
        
        // Initializing the Attribute values;
        this.score = score;
        this.username = username;
    }

    // Getter and Setter of Score;
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    // Getter and Setter of Username;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}