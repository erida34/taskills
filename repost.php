<?php
include_once("db.php");

$place = $_POST["place"];

$query = mysqli_query($link ,"SELECT * FROM `places` WHERE id='$place'");
$data = mysqli_fetch_assoc($query);

mysqli_query($link ,"INSERT INTO `places`(`id_user`, `name`, `address`, `coordinates`, `description`) VALUES ('{$_SESSION['user_id']}','{$data['name']}','{$data['address']}','{$data['coordinates']}','{$data['description']}')");
$query = mysqli_query($link ,"SELECT * FROM `places` WHERE 1 ORDER BY `id` DESC LIMIT 1");
$data = mysqli_fetch_assoc($query);
$query2 = mysqli_query($link ,"SELECT * FROM `fotos` WHERE `id_place`={$data['id']}");
foreach($query2 as $row){
    mysqli_query($link ,"INSERT INTO `fotos`(`id_place`, `src`) VALUES ('{$data['id']}','{$row['src']}')");
}
$query2 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`={$data['id']}");
foreach($query2 as $row){
    $query2 = mysqli_query($link ,"INSERT INTO `hashtags`(`id_place`, `hashtag`) VALUES ({$data['id']},'{$row['hashtag']}')");
}



?>