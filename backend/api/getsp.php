<?php

header("Content-Type: application/json; charset=UTF-8");
$productId = intval($_GET['id']);
require_once "../provip/config.php"; // Kết nối CSDL

try {

    $stmt = $conn->prepare("SELECT * FROM list_sanpham l INNER JOIN bangchatluong b USING(ma_chatluong) WHERE l.id_sanpham =  ?");
    $search = $productId;
    $stmt->execute([$search]);

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "products" => $products, "id" => $productId]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>