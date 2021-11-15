<?php
include_once("db.php");
$destination_path = getcwd().DIRECTORY_SEPARATOR;
$target_path = $destination_path . basename( $_FILES["img"]["name"]);
@move_uploaded_file($_FILES['img']['tmp_name'], $target_path);


$name = $_POST["placename"];
$address = $_POST["address"];
$coords = $_POST["coord"];
$desc = $_POST["desc"];
$hashtags = array_slice(explode("#" ,$_POST["hashtag"]), 1);



$client_id = "1b47a74d0aa7933";
$image = file_get_contents($_FILES['img']['tmp_name']);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
curl_setopt($ch, CURLOPT_POSTFIELDS, array('image' => base64_encode($image)));

$reply = curl_exec($ch);
curl_close($ch);

$reply = json_decode($reply);
$link1 = $reply->data->link;




mysqli_query($link ,"INSERT INTO `places`(`id_user`, `name`, `address`, `coordinates`, `description`) VALUES ({$_SESSION['user_id']},'{$name}','{$address}','$coords','{$desc}')");

$query = mysqli_query($link ,"SELECT id FROM `places` WHERE `id_user`={$_SESSION['user_id']} and `name`='{$name}' and `description`='{$desc}'");
$data = mysqli_fetch_assoc($query);

mysqli_query($link ,"INSERT INTO `fotos`(`id_place`, `src`) VALUES ({$data['id']},'{$link1}')");
foreach($hashtags as $row){
    $hash = trim($row);
    mysqli_query($link ,"INSERT INTO `hashtags`(`id_place`, `hashtag`) VALUES ({$data['id']},'#{$hash}')");
}

header("Location: index.php"); exit();


?>