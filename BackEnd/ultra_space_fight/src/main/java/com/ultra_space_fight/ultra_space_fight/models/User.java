// Declaring the package of the User class;
package com.ultra_space_fight.ultra_space_fight.models;

// Declaring the User class;
public class User {

    // Attributes of the User class;
    private long id;
    private String username;
    private String email;
    private String password;
    private int cash;

    // Constructors of the User class;
    public User(String username, String email, String password, int cash) {

        // Initializing the attributes of the User class;
        this.username = username;
        this.email = email;
        this.password = password;
        this.cash = cash;
    }

    // Getter and Setter of the id;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    // Getter and Setter of the username;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter of the email;
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter of the password;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and Setter of the cash;
    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }
}