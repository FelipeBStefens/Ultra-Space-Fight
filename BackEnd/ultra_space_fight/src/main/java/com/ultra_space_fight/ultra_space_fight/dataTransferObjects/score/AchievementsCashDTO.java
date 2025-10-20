// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score;

// Declaring ScoreCashDTO class;
public class AchievementsCashDTO {
    
    // Attributes of ScoreCashDTO class;
    private int score;
    private int cash;
    private int defeatedEnemies;
    private int defeatedElite;
    private int defeatedBoss;

    // Empty constructor;
    public AchievementsCashDTO() {}

    // Constructor;
    public AchievementsCashDTO(int cash, int score, int defeatedEnemies, int defeatedElite, int defeatedBoss) {
        
        // Initializing the Attribute values;
        this.cash = cash;
        this.score = score;
        this.defeatedEnemies = defeatedEnemies;
        this.defeatedElite = defeatedElite;
        this.defeatedBoss = defeatedBoss;
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