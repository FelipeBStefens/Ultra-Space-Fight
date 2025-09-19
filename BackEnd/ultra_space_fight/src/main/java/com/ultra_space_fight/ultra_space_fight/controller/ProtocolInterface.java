// Package;
package com.ultra_space_fight.ultra_space_fight.controller;

// Imports;
import java.util.List;

// Interface of the HTTP Protocol methods
public interface ProtocolInterface<T> {
    
    // Post;
    T post(T entity);

    // Delete;
    boolean delete(long id);

    // Put;
    T put(long id, T entity);

    // Patch;
    T patch(long id, T entity);

    // Get with an ID path;
    T getById(long id);

    // Get returning all values;
    List<T> getAll();
}
