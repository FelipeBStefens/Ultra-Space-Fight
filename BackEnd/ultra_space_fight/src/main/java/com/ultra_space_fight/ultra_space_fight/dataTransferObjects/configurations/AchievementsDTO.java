
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations;


public class AchievementsDTO {
    

    private int score;
    private int scoreMatch;
    private int defeatedEnemies;
    private int defeatedElite;
    private int defeatedBoss;


    public AchievementsDTO() {}


    public AchievementsDTO(int score, int scoreMatch, int defeatedEnemies,
        int defeatedElite, int defeatedBoss) {
        

        this.score = score;
        this.scoreMatch = scoreMatch;
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


    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
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