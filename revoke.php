<?php
$conn = new mysqli("localhost", "root", "mysql", "consent_os");

$id = $_POST["id"];

$conn->query("UPDATE documents SET status='blocked' WHERE id=$id");

echo json_encode(["ok" => true]);
?>