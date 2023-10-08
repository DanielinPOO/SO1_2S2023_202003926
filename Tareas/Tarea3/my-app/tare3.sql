CREATE DATABASE tarea3;
USE tarea3;

CREATE TABLE biblioteca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo_album VARCHAR(255) NOT NULL,
    artista VARCHAR(255) NOT NULL,
    ano_lanzamiento INT,
    genero_musical VARCHAR(255)
);
