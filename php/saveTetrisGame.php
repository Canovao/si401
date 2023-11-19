<?php
    if(isset($_SESSION['username'])){
        try {
            $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");
    
            $stmt = $conn->query("INSERT INTO ranking VALUES(COUNT(SELECT id_rank FROM ranking) + 1, '" . $_SESSION['username'] . "', '" . $_POST['pontuacao'] . "', '" . $_POST['nivel'] . "')");
            
            if($stmt->rowCount() == 0){
                echo "Failed to save game";
            } else {
                echo "Game saved";
            }
        } catch(PDOException $e) {
            echo "Ocorreu um erro: " . $e->getMessage();
        }
    }
?>