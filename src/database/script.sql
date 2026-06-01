CREATE DATABASE grimorio_memori;
USE grimorio_memori;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(255)
) AUTO_INCREMENT = 100;

CREATE TABLE quiz (
    id_resposta INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    guilda VARCHAR(60),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
    