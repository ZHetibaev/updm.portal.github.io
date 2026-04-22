<?php
$conn = new mysqli("localhost", "root", "mysql", "consent_os");

$id = $_POST["id"];
$status = $_POST["status"];

$conn->query("UPDATE documents SET status='$status' WHERE id=$id");

echo json_encode(["ok" => true]);
?>