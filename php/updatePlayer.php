<?php
    session_start();
    
    try {
        $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");

        $stmt = $conn->query("UPDATE jogadores SET nome_completo='" . $_POST['nome_completo'] . "', email='" . $_POST['email'] . "', telefone='" . $_POST['telefone'] . "' WHERE username='" . $_SESSION['username'] ."'");
        
        if($stmt->rowCount() == 0){
            echo "Não foi possível criar o usuário";
            session_destroy();
        } else {
            echo "Player criado com sucesso";
        }
    } catch(PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
    
    header('Location: ../perfil.php');
?>