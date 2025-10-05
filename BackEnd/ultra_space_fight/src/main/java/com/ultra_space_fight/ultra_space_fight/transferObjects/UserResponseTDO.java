package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class UserResponseTDO {
    
    private long idUser;
    private String selectedSpaceship;
    private int score;
    private int scoreMatch;

    public UserResponseTDO() {}

    public UserResponseTDO(long idUser, String selectedSpaceship, int score, int scoreMatch) {
        this.idUser = idUser;
        this.selectedSpaceship = selectedSpaceship;
    }
    
    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public String getSelectedSpaceship() {
        return selectedSpaceship;
    }

    public void setSelectedSpaceship(String selectedSpaceship) {
        this.selectedSpaceship = selectedSpaceship;
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
