<?php
include_once("db.php");

$name = $_POST["placename"];
$address = $_POST["address"];
$coords = $_POST["coord"];
$desc = $_POST["descr"];
$hashtags = array_slice(explode("#" ,$_POST["hashtag"]), 1);
$id_place = $_POST["id_place"];

mysqli_query($link ,"UPDATE `places` SET `name`='$name',`address`='$address',`coordinates`='coords',`description`='$desc' WHERE `id`='$id_place'");

mysqli_query($link ,"DELETE FROM `hashtags` WHERE `id_place`='$id_place'");
foreach($hashtags as $row){
    $hash = trim($row);
    mysqli_query($link ,"INSERT INTO `hashtags`(`id_place`, `hashtag`) VALUES ({$id_place},'#{$hash}')");
}

header("Location: index.php"); exit();


?>