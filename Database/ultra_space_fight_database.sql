-- This Database was hosted in Aiven, to be on cloud. So every local machine 
-- can access it and all the configurations;

-- Creating a new Database on the server;
CREATE DATABASE ultra_space_fight;

-- Using that Database;
USE ultra_space_fight;

-- Creating the user table;
CREATE TABLE users (

    -- Columns of the user;
	id_user BIGINT NOT NULL AUTO_INCREMENT,
    name_user VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_user VARCHAR(15) NOT NULL,
    cash INT NOT NULL DEFAULT 0,
    selected_spaceship VARCHAR(255) NOT NULL DEFAULT 'standart_ship',

    -- Checking values of the Columns;
    CHECK(selected_spaceship IN ('standart_ship', 'speed_ship', 'destroyer_ship', 'freighter_ship', 'elite_ship')),
    CHECK(email LIKE '%@gmail.com'),
    CHECK(cash >= 0),
    
    -- Declaring the Primary Key;
    PRIMARY KEY(id_user)
);

-- Creating the configurations table;
CREATE TABLE configurations (

    -- Columns of the configurations;
	id_configuration BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    language_user VARCHAR(255) NOT NULL DEFAULT 'English',
    soundtrack DECIMAL(10, 2) NOT NULL DEFAULT 0.3,
    sound_effects DECIMAL(10, 2) NOT NULL DEFAULT 0.5,
    
    -- Checking values of the Columns;
    CHECK (language_user IN ('English', 'Portuguese')),
    CHECK (soundtrack >= 0 AND soundtrack <= 1),
    CHECK (sound_effects >= 0 AND sound_effects <= 1),
    
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_configuration),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creating the data achievements table;
CREATE TABLE data_achievements(

    -- Columns of the data achievements;
	id_data BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    score_match INT NOT NULL DEFAULT 0,
    defeated_enemies INT NOT NULL DEFAULT 0,
    defeated_elite INT NOT NULL DEFAULT 0,
    defeated_boss INT NOT NULL DEFAULT 0,

    -- Checking values of the Columns;
    CHECK (score >= 0 AND score_match >= 0 AND 
		defeated_enemies >= 0 AND defeated_elite >= 0),
	
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_data),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creating the standart ship table;
CREATE TABLE standart_ship (
	
    -- Columns of the standart ship;
    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 10,
    speed INT NOT NULL DEFAULT 5,
    damage INT NOT NULL DEFAULT 5,
    
    -- Checking values of the Columns;
    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creating the speed ship table;
CREATE TABLE speed_ship (
	
    -- Columns of the speed ship;
    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 5,
    speed INT NOT NULL DEFAULT 10,
    damage INT NOT NULL DEFAULT 5,
    
    -- Checking values of the Columns;
    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creating the destroyer ship table;
CREATE TABLE destroyer_ship (
	
    -- Columns of the destroyer ship;
    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 5,
    speed INT NOT NULL DEFAULT 5,
    damage INT NOT NULL DEFAULT 10,
    
    -- Checking values of the Columns;
    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creating the freighter ship table;
CREATE TABLE freighter_ship (
	
    -- Columns of the freighter ship;
    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 20,
    speed INT NOT NULL DEFAULT 2,
    damage INT NOT NULL DEFAULT 5,
    
    -- Checking values of the Columns;
    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creating the elite ship table;
CREATE TABLE elite_ship (
	
    -- Columns of the elite ship;
    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 20,
    speed INT NOT NULL DEFAULT 10,
    damage INT NOT NULL DEFAULT 10,
    
    -- Checking values of the Columns;
    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    
    -- Declaring the Primary Key and Foreign Key;
    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);