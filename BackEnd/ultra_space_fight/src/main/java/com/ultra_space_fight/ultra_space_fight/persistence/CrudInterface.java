// Declaring the package of the CRUD interface;
package com.ultra_space_fight.ultra_space_fight.persistence;

// Importing necessary classes for the interface;
import java.util.List;

// Declaring the CrudInterface;
public interface CrudInterface<T> {

    // Method to create a new register in the Database;
    public void create(T entity);

    // Method to delete a register from the Database by its id;
    public void delete(int idEntity);

    // Method to update an existing register in the Database;
    public void update(T entity);

    // Method to read a register from the Database by its id;
    public T read(int idEntity);

    // Method to read all registers from the Database by its id;
    public List<T> readAll();
}