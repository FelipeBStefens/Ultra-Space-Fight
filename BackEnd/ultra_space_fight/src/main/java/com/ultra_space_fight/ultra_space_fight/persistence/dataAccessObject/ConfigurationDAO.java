package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class ConfigurationDAO implements CrudInterface<Configuration> {

    @Override
    public void create(Configuration configuration) {
        // Implementation for creating a configuration
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a configuration by id
    }

    @Override
    public void update(Configuration configuration) {
        // Implementation for updating a configuration
    }

    @Override
    public Configuration read(int id) {
        // Implementation for reading a configuration by id
        return null;
    }

    @Override
    public List<Configuration> readAll() {
        // Implementation for reading all configurations
        return new ArrayList<>();
    }
    
}
