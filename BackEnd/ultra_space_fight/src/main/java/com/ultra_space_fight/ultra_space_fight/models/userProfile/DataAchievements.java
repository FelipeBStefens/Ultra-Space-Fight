// Declaring the package of the DataAchievement class;
package com.ultra_space_fight.ultra_space_fight.models.userProfile;

// Declaring the DataAchievement class;
public class DataAchievements {
    
    // Attributes of the DataAchievements class;
    private long idDataAchievements;
    private int score;
    private int scoreMatch;
    private int defeatedEnemies;
    private int defeatedElite;
    private int defeatedBoss;

    // Relation with User class;
    private User user;

    public DataAchievements() {

        this.score = 0;
        this.scoreMatch = 0;
        this.defeatedEnemies = 0;
        this.defeatedElite = 0;
        this.defeatedBoss = 0;
    };

    // Constructor of the DataAchievements class;
    public DataAchievements(int score, int scoreMatch, int defeatedEnemies, int defeatedElite, int defeatedBoss, User user) {
        
        // Initializing the attributes of the DataAchievements class;
        this.score = score;
        this.scoreMatch = scoreMatch;
        this.defeatedEnemies = defeatedEnemies;
        this.defeatedElite = defeatedElite;
        this.defeatedBoss = defeatedBoss;
        this.user = user;
    }

    // Constructor with default values;
    public DataAchievements(User user) {

        // Initializing the attributes of the DataAchievements class;
        this.score = 0;
        this.scoreMatch = 0;
        this.defeatedEnemies = 0;
        this.defeatedElite = 0;
        this.defeatedBoss = 0;
        this.user = user;
    }

    // Getter and Setter of the idDataAchievements;
    public long getIdDataAchievements() {
        return idDataAchievements;
    }

    public void setIdDataAchievements(long idDataAchievements) {
        this.idDataAchievements = idDataAchievements;
    }

    // Getter and Setter of the score;
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    // Getter and Setter of the scoreMatch;
    public int getScoreMatch() {
        return scoreMatch;
    }

    public void setScoreMatch(int scoreMatch) {
        this.scoreMatch = scoreMatch;
    }

    // Getter and Setter of the defeatedEnemies;
    public int getDefeatedEnemies() {
        return defeatedEnemies;
    }

    public void setDefeatedEnemies(int defeatedEnemies) {
        this.defeatedEnemies = defeatedEnemies;
    }

    // Getter and Setter of the defeatedElite;
    public int getDefeatedElite() {
        return defeatedElite;
    }

    public void setDefeatedElite(int defeatedElite) {
        this.defeatedElite = defeatedElite;
    }

    // Getter and Setter of the defeatedBoss;
    public int getDefeatedBoss() {
        return defeatedBoss;
    }

    public void setDefeatedBoss(int defeatedBoss) {
        this.defeatedBoss = defeatedBoss;
    }

    // Getter and Setter of the User class;
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
