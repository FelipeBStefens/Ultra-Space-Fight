package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking;

public class RankingScoreMatchDTO {
    
    private int scoreMatch;
    private String username;
    
    public RankingScoreMatchDTO() {}

    public RankingScoreMatchDTO(int scoreMatch, String username) {
        this.scoreMatch = scoreMatch;
        this.username = username;
    }

    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
