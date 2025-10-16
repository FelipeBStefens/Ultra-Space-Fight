// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking;

// Declaring RankingScoreMatchDTO class;
public class RankingScoreMatchDTO {
    
    // Attributes of RankingScoreMatchDTO class;
    private int scoreMatch;
    private String username;
    
    // Empty constructor;
    public RankingScoreMatchDTO() {}

    // Constructor;
    public RankingScoreMatchDTO(int scoreMatch, String username) {
        
        // Initializing the Attribute values;
        this.scoreMatch = scoreMatch;
        this.username = username;
    }

    // Getter and Setter of Score Match;
    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
    }

    // Getter and Setter of Username;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}