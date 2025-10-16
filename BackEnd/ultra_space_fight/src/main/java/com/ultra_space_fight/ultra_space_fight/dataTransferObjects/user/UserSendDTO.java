// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user;

// Declaring the UserSendDTO class;
public class UserSendDTO {
    
    // Attributes of the UserSendDTO class;
    private String username;
    private String email;
    private String password;

    // Empty constructor
    public UserSendDTO() {}

    // Getter and Setter of the Username;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter of the E-Mail;
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter of the Password;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
