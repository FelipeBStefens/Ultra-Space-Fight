// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations;

// Declaring AchievementsDTO class;
public class AchievementsDTO {
    
    // Attributes of AchievementDTO class;
    private int score;
    private int scoreMatch;
    private int defeatedEnemies;
    private int defeatedElite;
    private int defeatedBoss;

    // Empty constructor;
    public AchievementsDTO() {}

    // Constructor;
    public AchievementsDTO(int score, int scoreMatch, int defeatedEnemies,
        int defeatedElite, int defeatedBoss) {
        
        // Initializing the Attribute values;
        this.score = score;
        this.scoreMatch = scoreMatch;
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

    // Getter and Setter of Score Match; 
    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
    }

    // Getter and Setter of Defeated Enemies;
    public int getDefeatedEnemies() {
        return defeatedEnemies;
    }

    public void setDefeatedEnemies(int defeatedEnemies) {
        this.defeatedEnemies = defeatedEnemies;
    }

    // Getter and Setter of Defeated Elite Enemies; 
    public int getDefeatedElite() {
        return defeatedElite;
    }

    public void setDefeatedElite(int defeatedElite) {
        this.defeatedElite = defeatedElite;
    }

    // Getter and Setter of Defeated Boss;
    public int getDefeatedBoss() {
        return defeatedBoss;
    }

    public void setDefeatedBoss(int defeatedBoss) {
        this.defeatedBoss = defeatedBoss;
    }
}