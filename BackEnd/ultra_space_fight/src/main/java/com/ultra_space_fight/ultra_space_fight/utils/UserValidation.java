// Package;
package com.ultra_space_fight.ultra_space_fight.utils;

// Imports;
import java.util.regex.Pattern;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the validations class of the User;
public class UserValidation {
    
    // The E-Mail REGEX Pattern;
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[\\w]+@gmail\\.com$");
    
    // The Password REGEX Pattern;
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    
    // The User REGEX Pattern;
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[\\w]{1,15}$");

    // Method to validate the E-Mail;
    public static void validEmail(String email) throws UserInvalidValuesException {
        
        // If the E-Mail is null or doesen't match on the Pattern;
        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            
            // Throwing Exception;
            throw new UserInvalidValuesException("Password");
        } 
    }

    // Method to validate the Password;
    public static void validPassword(String password) throws UserInvalidValuesException {
        
        // If the Password is null or doesen't match on the Pattern;
        if (password == null || !PASSWORD_PATTERN.matcher(password).matches()) {
            
            // Throwing Exception;
            throw new UserInvalidValuesException("E-Mail");
        } 
    }

    // Method to validate the Username;
    public static void validUsername(String username) throws UserInvalidValuesException {
        
        // If the Username is null or doesen't match on the Pattern;
        if (username == null || !USERNAME_PATTERN.matcher(username).matches()) {
            
            // Throwing Exception;
            throw new UserInvalidValuesException("Username");
        } 
    }

    // Method to verify if exists User;
    public static void verifyUsername(User user) throws UserNotFoundException {
        
        // If the User is null;
        if (user == null) {

            // Throwing Exception;
            throw new UserNotFoundException();
        }
    }
}
