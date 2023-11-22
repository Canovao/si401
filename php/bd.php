<?php
    try {
        $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");

        $sql = "CREATE TABLE IF NOT EXISTS `tetris`.`jogadores` (
        `username` TEXT(20) NOT NULL,
        `nome_completo` TEXT NOT NULL,
        `email` TEXT NOT NULL,
        `senha` TEXT NOT NULL,
        `telefone` TEXT NOT NULL,
        `cpf` TEXT NOT NULL,
        `data_nascimento` DATE NOT NULL, 
        PRIMARY KEY (`username`(20))) ENGINE = InnoDB";

        $conn->exec($sql);

        $sql = "CREATE TABLE IF NOT EXISTS `tetris`.`ranking` (
        `id_rank` INT(255) NOT NULL,
        `username` TEXT(20) NOT NULL ,
        `pontuacao` INT NOT NULL,
        `nivel` INT NOT NULL,
        PRIMARY KEY (`id_rank`)) ENGINE = InnoDB";
        
        $conn->exec($sql);

        echo "Tabelas criadas com sucesso!";
    } catch(PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
?>
