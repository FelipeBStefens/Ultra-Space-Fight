package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score;

public class ScoreCashDTO {
    
    private int score;
    private int cash;

    public ScoreCashDTO() {
    }

    public ScoreCashDTO(int cash, int score) {
        this.cash = cash;
        this.score = score;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

}
