
package com.ultra_space_fight.ultra_space_fight.models.userProfile;


public class User {


    private long idUser;
    private String username;
    private String email;
    private String password;
    private int cash;
    private String selectedSpaceship;


    public User() {


        this.cash = 0; 
        this.selectedSpaceship = "standart_ship";
    };


    public User(String username, String email, String password, int cash, String selectedSpaceship) {


        this.username = username;
        this.email = email;
        this.password = password;
        this.cash = cash;
        this.selectedSpaceship = selectedSpaceship;
    }


    public User(String username, String email, String password) {
        

        this.username = username;
        this.email = email;
        this.password = password;
        this.cash = 0; 
        this.selectedSpaceship = "standart_ship";
    }


    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }


    public String getSelectedSpaceship() {
        return selectedSpaceship;
    }

    public void setSelectedSpaceship(String selectedSpaceship) {
        this.selectedSpaceship = selectedSpaceship;
    }
}