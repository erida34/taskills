<?php
include_once("db.php");
$oldpass = $_POST["oldpass"];
$newpass = md5(md5($_POST["newpass"]));

if(isset($_POST['submit'])){
    # Вытаскиваем из БД запись, у которой логин равняеться введенному
    $user_id = $_SESSION['user_id'];
    $query = mysqli_query($link ,"SELECT * FROM `users` WHERE `id`='$user_id' LIMIT 1");
    $data = mysqli_fetch_assoc($query);
    # Соавниваем пароли
    if($data['password'] === md5(md5($oldpass))){
        $user_id = $data['id'];
        mysqli_query($link ,"UPDATE `users` SET `password`='$newpass' WHERE `id`=$user_id");
        header("Location: index.php"); exit();
    }
    else{
        echo "Вы ввели неправильный пароль";
    }
}

?>