<?php
try {
    $username = $_POST["username"];

    $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");

    $stmt = $conn->query("SELECT * FROM ranking ORDER BY pontuacao DESC");

    $pos = 0;

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $pos++;
        if ($row["username"] == $username){
            break;
        }
    }

    echo $pos;
} catch(PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>
