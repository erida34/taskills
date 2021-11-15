<?php 
    include_once("db.php");

    if(isset($_SESSION["user_id"])){
        $id = $_SESSION["user_id"];
        $query = mysqli_query($link, "SELECT * FROM `verification_codes` WHERE `id_user`=$id");
	    $data = mysqli_fetch_assoc($query);

        if($_POST["cod"] == $data["code"]){
            mysqli_query($link, "UPDATE `users` SET `verification`=1 WHERE `id`=$id");
            echo "ok";
        }
        else{
            echo "no";
        }
    }
 ?>