
package com.ultra_space_fight.ultra_space_fight.repository;


import java.sql.SQLException;
import java.util.List;


public interface CrudInterface<T> {


    public void create(T entity) throws SQLException;


    public void delete(long idEntity) throws SQLException;


    public void update(T entity) throws SQLException;


    public T read(long idEntity) throws SQLException;


    public List<T> readAll() throws SQLException;
}