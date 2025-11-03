
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score;


public class AchievementsCashDTO {
    

    private int score;
    private int cash;
    private int defeatedEnemies;
    private int defeatedElite;
    private int defeatedBoss;


    public AchievementsCashDTO() {}


    public AchievementsCashDTO(int cash, int score, int defeatedEnemies, int defeatedElite, int defeatedBoss) {
        

        this.cash = cash;
        this.score = score;
        this.defeatedEnemies = defeatedEnemies;
        this.defeatedElite = defeatedElite;
        this.defeatedBoss = defeatedBoss;
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


    public int getDefeatedEnemies() {
        return defeatedEnemies;
    }

    public void setDefeatedEnemies(int defeatedEnemies) {
        this.defeatedEnemies = defeatedEnemies;
    }


    public int getDefeatedElite() {
        return defeatedElite;
    }

    public void setDefeatedElite(int defeatedElite) {
        this.defeatedElite = defeatedElite;
    }


    public int getDefeatedBoss() {
        return defeatedBoss;
    }

    public void setDefeatedBoss(int defeatedBoss) {
        this.defeatedBoss = defeatedBoss;
    }
}