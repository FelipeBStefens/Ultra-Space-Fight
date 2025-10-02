package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class ScoreTDO {

    private int score;

    private int scoreMatch;

    public ScoreTDO() {}

    public ScoreTDO(int score, int scoreMatch) {
        this.score = score;
        this.scoreMatch = scoreMatch;
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
}
