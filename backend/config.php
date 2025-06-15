<?php
$host = "sql301.infinityfree.com"; // Ví dụ: db.awardspace.com
$dbname = "if0_38401816_dt";
$username = "if0_38401816";
$password = "5r0YdX3QFaXNav";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Kết nối thất bại: " . $e->getMessage()]));
}
?>