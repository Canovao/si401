<?php
    try {
        $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");

        $sql = "CREATE TABLE `tetris`.`jogadores` (
        `username` TEXT(20) NOT NULL,
        `nome_completo` TEXT NOT NULL,
        `email` TEXT NOT NULL,
        `senha` TEXT NOT NULL,
        `telefone` TEXT NOT NULL,
        `cpf` TEXT NOT NULL,
        `data_nascimento` DATE NOT NULL, 
        PRIMARY KEY (`username`(20))) ENGINE = InnoDB";

        $conn->exec($sql);

        $sql = "CREATE TABLE `tetris`.`ranking` (
        `id_rank` INT(255) NOT NULL,
        `username` TEXT(20) NOT NULL ,
        `pontuacao` INT NOT NULL,
        `nivel` INT NOT NULL,
        PRIMARY KEY (`id_rank`(255))) ENGINE = InnoDB";
        
        $conn->exec($sql);
    } catch(PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
?>
