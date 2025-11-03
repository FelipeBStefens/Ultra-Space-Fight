
package com.ultra_space_fight.ultra_space_fight.utils;


import java.util.regex.Pattern;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public class UserValidation {
    

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[\\w]+@gmail\\.com$");
    

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[\\w]{1,15}$");


    public static void validEmail(String email) throws UserInvalidValuesException {
        

        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            

            throw new UserInvalidValuesException("Password");
        } 
    }


    public static void validPassword(String password) throws UserInvalidValuesException {
        

        if (password == null || !PASSWORD_PATTERN.matcher(password).matches()) {
            

            throw new UserInvalidValuesException("E-Mail");
        } 
    }


    public static void validUsername(String username) throws UserInvalidValuesException {
        

        if (username == null || !USERNAME_PATTERN.matcher(username).matches()) {
            

            throw new UserInvalidValuesException("Username");
        } 
    }


    public static void verifyUsername(User user) throws UserNotFoundException {
        

        if (user == null) {


            throw new UserNotFoundException();
        }
    }
}
