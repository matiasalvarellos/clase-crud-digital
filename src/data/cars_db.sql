-- Creamos la base de datos 
CREATE DATABASE cars_db;

USE cars_db;

-- Creamos las tablas 

-- Tabla de usuarios 
CREATE TABLE users(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL, 
    avatar VARCHAR(150) NOT NULL,
    admin TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de autos --
CREATE TABLE cars(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    price DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Tabla de Imagenes
CREATE TABLE images(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    car_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Tabla de Colores 
CREATE TABLE colors(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- Tabla car_color 

CREATE TABLE car_color(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    color_id INT UNSIGNED NOT NULL,
    car_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(car_id) REFERENCES cars(id) ,
    FOREIGN KEY(color_id) REFERENCES colors(id)
);

-- Insertar información en las tablas

INSERT INTO cars (brand, model, price ) VALUES 
('Daewoo', 'Espero', 500000),
('Chevrolet', 'Camaro', 3000000),
('Fiat', 'Uno', 500000);

INSERT INTO colors (name) VALUES ("red"),("black"),("white"),("green");