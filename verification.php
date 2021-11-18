<?php

include_once("db.php");
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if(isset($_SESSION["user_id"])){
    $id = $_SESSION["user_id"];
    $query = mysqli_query($link, "SELECT * FROM `users` WHERE id='".$id."' LIMIT 1");
	$data = mysqli_fetch_assoc($query);

    $query2 = mysqli_query($link, "SELECT * FROM `verification_codes` WHERE `id_user`=$id");
	$data2 = mysqli_fetch_assoc($query2);
    // Формирование самого письма
    $title = "Подтверждение почты";
    $body = "
    <h3>Код:</h3><br>
    <h1>". $data2["code"] ."</h1>";

    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth   = true;
        //$mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

        // Настройки вашей почты
        $mail->Host       = 'smtp.majordomo.ru'; // SMTP сервера вашей почты
        $mail->Username   = 'taskill@junior-it.ru'; // Логин на почте
        $mail->Password   = 'dmLUVuMB'; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('taskill@junior-it.ru', 'taskill'); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress($data["email"]);

        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;

        // Проверяем отравленность сообщения
        if ($mail->send()) {$result = "success";}
        else {$result = "error";}

    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }
}
// else{
//     header("Location: index.php"); exit();
// }
?>
