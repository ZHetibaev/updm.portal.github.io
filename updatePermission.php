<?php
$conn = new mysqli("localhost","root","mysql","consent_os");

$iin = $_POST["iin"];
$org = $_POST["org"];
$status = $_POST["status"];

$user = $conn->query("SELECT id FROM users WHERE iin='$iin'")->fetch_assoc();
$uid = $user["id"];

$conn->query("
UPDATE permissions
SET status='$status'
WHERE user_id=$uid AND organization_name='$org'
");

echo json_encode(["ok"=>true]);
?>