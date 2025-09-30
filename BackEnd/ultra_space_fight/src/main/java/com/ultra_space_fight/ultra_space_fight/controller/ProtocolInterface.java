// Package;
package com.ultra_space_fight.ultra_space_fight.controller;

// Interface of the HTTP Protocol methods
public interface ProtocolInterface<T> {
    
    // Post;
    T create(T entity);

    // Delete;
    boolean delete(long id);

    // Put;
    T update(long id, T entity);

    // Patch;
    T partialUpdate(long id, T entity);

    // Get with an ID path;
    T getById(long id);
}
