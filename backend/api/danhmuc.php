<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "../provip/config.php"; // Kết nối CSDL

try {
    $stmt = $conn->prepare("SELECT id_danhmuc, tendanhmuc FROM danhmuc");
    $stmt->execute();
    $danhmuc = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "users" => $danhmuc], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>