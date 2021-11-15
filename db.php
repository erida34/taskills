<?php

// ini_set('error_reporting', E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    header('Content-type: text/html; charset=utf-8');

    // Старт сессии
    session_start();

    // Переменные для подключения к БД
    $bd_host = 'localhost';
    $bd_user = 'root';
    $bd_password = 'root';
    $bd_name = 'taskills';

    // Подключение к БД
    $link = mysqli_connect($bd_host, $bd_user, $bd_password);
    mysqli_select_db($link, $bd_name);
    // Запись логина пользователя в сессию
    if(isset($_SESSION['login'])){
        $ses_login = $_SESSION['login'];
    }
    

?>