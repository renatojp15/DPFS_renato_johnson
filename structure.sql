CREATE DATABASE ecommerce;
USE ecommerce;

-- Crear la tabla de Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    category ENUM('admin', 'user') DEFAULT 'user',
    image VARCHAR(255)
);

-- Crear la tabla de Categorías
CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Crear la tabla de Colores
CREATE TABLE Colores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colorName VARCHAR(50) NOT NULL UNIQUE
);

-- Crear la tabla de Productos
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    category_id INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categorias(id)
);

-- Crear la tabla intermedia para la relación muchos a muchos entre Productos y Colores
CREATE TABLE ProductoColores (
    producto_id INT,
    color_id INT,
    PRIMARY KEY (producto_id, color_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES Colores(id) ON DELETE CASCADE
);