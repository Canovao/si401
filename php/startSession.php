<?php
    session_start();

    if(isset($_POST['username']) && isset($_POST['password'])){
        try {
            $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");
    
            $stmt = $conn->query("SELECT * FROM jogadores WHERE senha = '" . $_POST['password'] . "' AND username = '" . $_POST['username'] . "'");
            if($stmt->rowCount() == 0){
                echo "Usuário ou senha incorretos";
                session_destroy();
            } else {
                $_SESSION['username'] = $_POST['username'];
                $_SESSION['senha'] = $_POST['password'];
                
                echo "Login efetuado com sucesso";  
            }
        } catch(PDOException $e) {
            echo "Ocorreu um erro: " . $e->getMessage();
        }
        
        header('Location: ../menu.php');
    }
?>