// Declaring the package of the Constants Database class;
package com.ultra_space_fight.ultra_space_fight.persistence;

// Declaring the ConstantsDatabase class;
public class ConstantsDatabase {
    
    // The Host configuration of the Database, on an Aiven Cloud;
    private static final String HOST = 
        "mysql-ultra-space-fight-ultra-space-fight-db.h.aivencloud.com";

    // The Port of the Database, to connect on an Aiven Cloud;
    private static final String PORT = "10676";

    // The Database Name;
    private static final String DATABASE_NAME = "ultra_space_fight";
    
    // The User administration;
    public static final String USER = "avnadmin";

    // The Password administration;
    public static final String PASSWORD = "AVNS_TWz1YzqCtJqLv0LP0R9";

    // The URL address to connect with the Aiven Cloud;
    public static final String ADDRESS = 
        "jdbc:mysql://" + HOST + ":" + PORT + "/" + DATABASE_NAME + "?sslMode=REQUIRED";

    // The Driver Class name;
    public static final String DRIVER_CLASS = "com.mysql.cj.jdbc.Driver";
}
