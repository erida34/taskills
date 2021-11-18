<?php
include_once("db.php");
// $query = mysqli_query($link ,"SELECT * FROM `places` WHERE `id_user`='".intval($_SESSION['user_id'])."';");
$texti = $_POST['texti'];
if($_POST['block'] == "moi"){
    $query = mysqli_query($link ,"SELECT DISTINCT `places`.`id`, `places`.`name`, `places`.`address`, `places`.`coordinates`, `places`.`description` FROM `places` INNER JOIN `hashtags` WHERE `hashtags`.`id_place`=`places`.`id` and (`name` like '%$texti%' or `description` like '%$texti%' or `address` like '%$texti%' or `hashtags`.`hashtag` like '%$texti%') and `id_user`='".intval($_SESSION['user_id'])."';");
}
else{
    $query = mysqli_query($link ,"SELECT DISTINCT `places`.`id`, `places`.`name`, `places`.`address`, `places`.`coordinates`, `places`.`description` FROM `places` INNER JOIN `hashtags` WHERE `hashtags`.`id_place`=`places`.`id` and( `name` like '%$texti%' or `description` like '%$texti%' or `address` like '%$texti%' or `hashtags`.`hashtag` like '%$texti%');");
}
foreach($query as $row){
    $query2 = mysqli_query($link ,"SELECT * FROM `fotos` WHERE `id_place`='{$row['id']}' LIMIT 1");
    $data = mysqli_fetch_assoc($query2);
    $desc = mb_strimwidth($row['description'], 0, 50, "...");
    $src = $data['src'];
    $query3 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`='{$row['id']}'");
    echo <<<END
            <div class="flex flex-col card">
                <img
                    src="{$src}"
                    alt=""
                    class="card__img"
                />
                <div class="card__content">
                    <h2 class="title_small text_midi card__title">{$row['name']}</h2>
                    <p class="text_small card__descr">
                        {$desc}
                    </p>
                    <form action="place.php" method="get">
                        <button type="submit" name="place" value="{$row['id']}" class="text_small text_midi btn btn_more">
                            Смотреть
                        </button>
                    </form>
                    <span class="text_small text_midi hashtag">
            END;
                        foreach($query3 as $row){
                            echo $row["hashtag"];
                        }
            echo <<<END
            </span>
                </div>
            </div>
    END;
}

?>