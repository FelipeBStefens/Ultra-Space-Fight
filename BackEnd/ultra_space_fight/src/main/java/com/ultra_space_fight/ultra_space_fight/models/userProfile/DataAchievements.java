
package com.ultra_space_fight.ultra_space_fight.models.userProfile;


public class DataAchievements {
    

    private long idDataAchievements;
    private int score;
    private int scoreMatch;
    private int defeatedEnemies;
    private int defeatedElite;
    private int defeatedBoss;


    private User user;


    public DataAchievements() {


        this.score = 0;
        this.scoreMatch = 0;
        this.defeatedEnemies = 0;
        this.defeatedElite = 0;
        this.defeatedBoss = 0;
    };


    public DataAchievements(int score, int scoreMatch, int defeatedEnemies, int defeatedElite, int defeatedBoss, User user) {
        

        this.score = score;
        this.scoreMatch = scoreMatch;
        this.defeatedEnemies = defeatedEnemies;
        this.defeatedElite = defeatedElite;
        this.defeatedBoss = defeatedBoss;
        this.user = user;
    }


    public DataAchievements(User user) {


        this.score = 0;
        this.scoreMatch = 0;
        this.defeatedEnemies = 0;
        this.defeatedElite = 0;
        this.defeatedBoss = 0;
        this.user = user;
    }


    public long getIdDataAchievements() {
        return idDataAchievements;
    }

    public void setIdDataAchievements(long idDataAchievements) {
        this.idDataAchievements = idDataAchievements;
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


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}