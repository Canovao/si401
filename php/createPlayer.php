<?php
    session_start();
    
    try {
        $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");

        $stmt = $conn->query("INSERT INTO jogadores VALUES('" . $_POST['username'] . "', '" . $_POST['nome_completo'] . "', '" . $_POST['email'] . "', '" . $_POST['password'] . "', '" . $_POST['telefone'] . "', '" . $_POST['cpf'] . "', '" . $_POST['data_nascimento'] . "')");
        if($stmt->rowCount() == 0){
            echo "Não foi possível criar o usuário";
            session_destroy();
        } else {
            $_SESSION['username'] = $_POST['username'];
            $_SESSION['senha'] = $_POST['password'];
            
            echo "Player criado com sucesso";  
        }
    } catch(PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
    
    header('Location: ../menu.php');
?>