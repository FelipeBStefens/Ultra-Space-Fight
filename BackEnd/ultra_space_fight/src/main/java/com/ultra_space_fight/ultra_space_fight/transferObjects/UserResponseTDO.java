package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class UserResponseTDO {
    
    private long idUser;

    private String selectedSpaceship;

    public UserResponseTDO() {}

    public UserResponseTDO(long idUser, String selectedSpaceship) {
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
}
