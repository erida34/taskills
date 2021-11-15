<?php 
    include_once("db.php");
    if(isset($_POST['submit'])){
        $err = array();
        // проверям логин
        if(!preg_match("/^[a-zA-Z0-9]+$/",$_POST['login'])){
            $err[] = "Логин может состоять только из букв английского алфавита и цифр";
        }
        if(strlen($_POST['login']) < 3 or strlen($_POST['login']) > 20){
            $err[] = "Логин должен быть не меньше 3-х символов и не больше 20";
        }
        $log1 = mysqli_real_escape_string($link ,$_POST['login']);
        // проверяем, не сущестует ли пользователя с таким именем
        $query = mysqli_query($link, "SELECT COUNT(id) FROM users WHERE login='$log1'");
        foreach($query as $row){
            if($row["COUNT(id)"] > 0){
                $err[] = "Пользователь с таким логином уже существует в базе данных";
                break;
            }
        }
        // Если нет ошибок, то добавляем в БД нового пользователя
        if(count($err) == 0){
            $login = $_POST['login'];
            // Убераем лишние пробелы и делаем двойное шифрование
            $email = $_POST["email"];
            $password = md5(md5(trim($_POST['password'])));
            mysqli_query($link, "INSERT INTO `users`(`login`, `password`, `email`, `verification`) VALUES ('$login','$password', '$email', '0')");
            $query = mysqli_query($link, "SELECT id FROM `users` WHERE login='".mysqli_real_escape_string($link, $_POST['login'])."' LIMIT 1");
			$data = mysqli_fetch_assoc($query);
			$_SESSION["user_id"] = $data['id'];
            mysqli_query($link, "INSERT INTO `verification_codes`(`id_user`, `code`) VALUES (". $data['id'] .", ". rand(10000, 99999) .")");
            echo "ok";
        }
        else{
            echo "<script>alert('При регистрации произошли следующие ошибки:";
            foreach($err AS $error){
               echo $error;
            }
            echo "');document.write(`<meta http-equiv='refresh' content='0; URL=login.php'/>`)</script>";
        }

    }
    else{
        var_dump($_POST);
    }
 ?>