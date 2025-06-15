<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "../provip/config.php"; // Kết nối CSDL

try {
    $stmt = $conn->prepare("SELECT *
FROM list_sanpham l
INNER JOIN bangchatluong b USING(ma_chatluong)
                            WHERE l.id_danhmuc LIKE ?");
    $search = "%DMPKLB%";
    $stmt->execute([$search]);

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "products" => $products]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>