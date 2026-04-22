<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost","root","mysql","consent_os");

$iin = $_GET["iin"];

$user = $conn->query("SELECT * FROM users WHERE iin='$iin'")->fetch_assoc();

if(!$user){
 echo json_encode(["error"=>"not found"]);
 exit;
}

$uid = $user["id"];

$docs = $conn->query("SELECT * FROM documents WHERE user_id=$uid");
$documents = [];
while($r=$docs->fetch_assoc()) $documents[]=$r;

$logs = $conn->query("SELECT * FROM access_logs WHERE user_id=$uid");
$access_logs = [];
while($r=$logs->fetch_assoc()) $access_logs[]=$r;

$perm = $conn->query("SELECT * FROM permissions WHERE user_id=$uid");
$permissions = [];
while($r=$perm->fetch_assoc()) $permissions[]=$r;

echo json_encode([
"user"=>$user,
"documents"=>$documents,
"access_logs"=>$access_logs,
"permissions"=>$permissions
]);
?>