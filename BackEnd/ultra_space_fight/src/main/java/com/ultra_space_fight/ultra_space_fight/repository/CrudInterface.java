// Package;
package com.ultra_space_fight.ultra_space_fight.repository;

// Imports;
import java.sql.SQLException;
import java.util.List;

// Declaring the CrudInterface;
public interface CrudInterface<T> {

    // Method to create a new register in the Database;
    public void create(T entity) throws SQLException;

    // Method to delete a register from the Database by its id;
    public void delete(long idEntity) throws SQLException;

    // Method to update an existing register in the Database;
    public void update(T entity) throws SQLException;

    // Method to read a register from the Database by its id;
    public T read(long idEntity) throws SQLException;

    // Method to read all registers from the Database by its id;
    public List<T> readAll() throws SQLException;
}