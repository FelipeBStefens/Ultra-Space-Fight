
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user;


public class UserSendDTO {
    

    private String username;
    private String email;
    private String password;


    public UserSendDTO() {}


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
}
