<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "../config.php"; // Kết nối CSDL

try {
    $stmt = $conn->prepare("SELECT id_sanpham, tensanpham, src, giamoi, giacu FROM list_sanpham WHERE id_danhmuc = 'DMDT' ORDER BY RAND() LIMIT 10");
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "products" => $products]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?> 