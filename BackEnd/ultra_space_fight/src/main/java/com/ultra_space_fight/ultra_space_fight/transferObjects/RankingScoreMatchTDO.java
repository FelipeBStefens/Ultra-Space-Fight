package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class RankingScoreMatchTDO {
    
    private int scoreMatch;
    private String username;
    
    public RankingScoreMatchTDO() {}

    public RankingScoreMatchTDO(int scoreMatch, String username) {
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
