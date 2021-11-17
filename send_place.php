<?php
include_once("db.php");

$name = $_POST["name"];
$address = $_POST["address"];
$coords = $_POST["coord"];
$desc = $_POST["descr"];
$hashtags = array_slice(explode("#" ,$_POST["hashtag"]), 1);
$id_place = $_POST["id_place"];

mysqli_query($link ,"INSERT INTO `places`(`id_user`, `name`, `address`, `coordinates`, `description`) VALUES ('{$_SESSION['user_id']}','$name','$address','$coords','$desc')");

foreach($hashtags as $row){
    $hash = trim($row);
    mysqli_query($link ,"INSERT INTO `hashtags`(`id_place`, `hashtag`) VALUES ({$id_place},'#{$hash}')");
}
if(!empty($_POST["addimg"])){
    foreach($_POST["addimg"] as $imge){
        $client_id = "1b47a74d0aa7933";
    
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
        curl_setopt($ch, CURLOPT_POSTFIELDS, array('image' => base64_encode(file_get_contents($imge))));
        $reply = curl_exec($ch);
        curl_close($ch);
    
        $reply = json_decode($reply);
        $link1 = $reply->data->link;
        
        mysqli_query($link ,"INSERT INTO `fotos`(`id_place`, `src`) VALUES ('$id_place','$link1')");
    
    }
}


?>