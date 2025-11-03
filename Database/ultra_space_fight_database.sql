



CREATE DATABASE ultra_space_fight;


USE ultra_space_fight;


CREATE TABLE users (


	id_user BIGINT NOT NULL AUTO_INCREMENT,
    name_user VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_user VARCHAR(15) NOT NULL,
    cash INT NOT NULL DEFAULT 0,
    selected_spaceship VARCHAR(255) NOT NULL DEFAULT 'standart_ship',


    CHECK(selected_spaceship IN ('standart_ship', 'speed_ship', 'destroyer_ship', 'freighter_ship', 'elite_ship')),
    CHECK(email LIKE '%@gmail.com'),
    CHECK(cash >= 0),
    

    PRIMARY KEY(id_user)
);


CREATE TABLE configurations (


	id_configuration BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    language_user VARCHAR(255) NOT NULL DEFAULT 'English',
    soundtrack DECIMAL(10, 2) NOT NULL DEFAULT 0.3,
    sound_effects DECIMAL(10, 2) NOT NULL DEFAULT 0.5,
    

    CHECK (language_user IN ('English', 'Portuguese')),
    CHECK (soundtrack >= 0 AND soundtrack <= 1),
    CHECK (sound_effects >= 0 AND sound_effects <= 1),
    

    PRIMARY KEY (id_configuration),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE data_achievements(


	id_data BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    score_match INT NOT NULL DEFAULT 0,
    defeated_enemies INT NOT NULL DEFAULT 0,
    defeated_elite INT NOT NULL DEFAULT 0,
    defeated_boss INT NOT NULL DEFAULT 0,


    CHECK (score >= 0 AND score_match >= 0 AND 
		defeated_enemies >= 0 AND defeated_elite >= 0),
	

    PRIMARY KEY (id_data),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE standart_ship (
	

    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 10,
    speed INT NOT NULL DEFAULT 5,
    damage INT NOT NULL DEFAULT 5,
    

    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    

    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE speed_ship (
	

    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 5,
    speed INT NOT NULL DEFAULT 10,
    damage INT NOT NULL DEFAULT 5,
    

    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    

    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE destroyer_ship (
	

    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 5,
    speed INT NOT NULL DEFAULT 5,
    damage INT NOT NULL DEFAULT 10,
    

    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    

    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE freighter_ship (
	

    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 20,
    speed INT NOT NULL DEFAULT 2,
    damage INT NOT NULL DEFAULT 5,
    

    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    

    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE elite_ship (
	

    id_ship BIGINT NOT NULL AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    life INT NOT NULL DEFAULT 20,
    speed INT NOT NULL DEFAULT 10,
    damage INT NOT NULL DEFAULT 10,
    

    CHECK (life >= 1 AND life <= 20),
    CHECK (speed >= 1 AND speed <= 20),
    CHECK (damage >= 1 AND damage <= 20),
    

    PRIMARY KEY (id_ship),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);