<?php
try {
    $username = $_POST["username"];

    $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");

    $stmt = $conn->query("SELECT * FROM ranking WHERE username = " . $username . " ORDER BY pontuacao DESC LIMIT 10"); // Pega o top 10 do usuário

    $top10 = 1;

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<td>" . $top10 . "</td>";
        echo "<td>" . $row["username"] . "</td>";
        echo "<td>" . $row["pontuacao"] . "</td>";
        echo "<td>" . $row["nivel"] . "</td>";
        $top10++;
    }


} catch(PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>
