<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

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
    echo $link1;
}


?>