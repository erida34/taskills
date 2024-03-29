<?php

	include_once("db.php");
	if(isset($_SESSION['user_id'])){
        $query = mysqli_query($link ,"SELECT * FROM `users` WHERE `id`='".intval($_SESSION['user_id'])."' LIMIT 1");
        $userdata = mysqli_fetch_assoc($query);

    }

    if(isset($_SESSION['user_id'])){
        $query = mysqli_query($link ,"SELECT * FROM `users` WHERE `id`='".intval($_SESSION['user_id'])."' LIMIT 1");
        $userdata = mysqli_fetch_assoc($query);
        // if($userdata["verification"] == 0){
        //     header("Location: index.php"); exit();
        // }
        $_SESSION["login"] = $userdata["login"];
        $login = $userdata["login"];
        $email = $userdata["email"];
        $query = mysqli_query($link ,"SELECT *,COUNT(id) FROM `places` WHERE `id_user`='".intval($_SESSION['user_id'])."' GROUP BY `id`;");
        $userdata = mysqli_fetch_assoc($query);
        // $count = $userdata["COUNT(id)"];
    }
 ?>

<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="css/reset.css" />
        <link rel="stylesheet" href="css/style.css" />
      	<link rel="icon" href="images/icons/favicon.jpg" type="image/x-icon">
        <title>Какое-то конкретный маршрут</title>
    </head>
    <body>
        <header>
            <!-- Section MENU -->
            <section class="section section_menu">
                <nav class="container">
                    <ul class="flex menu">
                        <li>
                            <a class="menu__link menu__link_r text_aver" href="index.php">Места</a>
                            <a class="menu__link text_aver" href="routes.php">Маршруты</a>
                        </li>
                        <li>
                            <?php
                                if(isset($_SESSION["user_id"])){
                                    echo <<<END
                                    <button class="btn btn_menu-last text_aver drop-menu__link">$login <img src="images/icons/arrow-down.png" alt="" class="menu__arrow" /></button>
                                    <ul class="drop-menu">
                                        <li class="btn_menu btn_change-pass" id="smena">
                                            <img src="images/icons/key.png" alt="" class="btn_menu__img">
                                            <span class="text_small midi-text">Изменить пароль</span>
                                        </li>
                                        <li class="btn_menu btn_exit">
                                            <img src="images/icons/logout.png" alt="" class="btn_menu__img">
                                            <span class="text_small midi-text">Выйти</span>
                                        </li>
                                    </ul>
                                    END;
                                }
                                else{
                                    echo <<<END
                                    <button class="menu__link text_aver btn btn_acc btn_menu-last">Аккаунт</button>
                                    END;
                                }
                            ?>
                        </li>
                    </ul>
                </nav>
            </section>
            <!-- Section MENU -->
        </header>
        <main>
            <!-- Script image-scale -->
            <div id="clickonGL" style="z-index: -1; background-color: rgba(0, 0, 0, 0);">
                <img src="images/alfa-img.png" id="imgonGL">
            </div>
            <!-- Section CARDS -->
            <section class="section section_top">
                <div class="container">
                  <?php 
                  		$query2 = mysqli_query($link ,"SELECT * FROM `marsh` WHERE `id_marsh`='".intval($_GET["marsh"])."'");
                  		$data2 = mysqli_fetch_array($query2);
                  ?>
                    <div class="flex flex-cen mb-20">
                        <h1 class="title_biggest text_aver route__name"><?php echo $data2["marsh-name"]; ?></h1>
                    </div>

                    <div class="title_small info mb-20">Информация</div>
					
                  	<?php 
                  foreach($query2 as $row){
                  	$query3 = mysqli_query($link ,"SELECT * FROM `places` WHERE `id`='".intval($row["id_place"])."'");
                  	$data3 = mysqli_fetch_assoc($query3);
                    
                    echo <<<END
                    <div class="flex flex-col route__place-block mb-20">
                        <h2 class="title_big text_aver place__name mb-10">{$data3["name"]}</h2>
                        <div class="place__info-block">
                            <span class="text_aver place__info-prew">Адрес:</span>
                            <span class="place__adress">{$data3["address"]}</span>
                        </div>
                        <div class="place__info-block place__info-block_sep">
                            <span class="text_aver place__info-prew">Координаты:</span>
                            <span class="text_midi place__coord">{$data3["coordinates"]}</span>
                        </div>
                        <div class="place__info-block">
                            <span class="flex text_aver title_small mb-10">Описание</span>
                            <p class="text__descr mb-10">
                                {$data3["description"]}
                            </p>
                            <div class="text_small text_midi hashtag hashtag_midi">
                    END;
                            $query5 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`='{$data3["id"]}'");
                                foreach($query5 as $row1){
                                    echo $row1["hashtag"];
                                }
                    echo <<<END
                    
                    </div>
                        </div>

                        <div class="flex route__images">
                    END;
                    $query = mysqli_query($link ,"SELECT * FROM `fotos` WHERE `id_place`='".intval($data3["id"])."'");
                            foreach($query as $row3){
                                $src = $row3["src"];
                                echo <<<END
                                <img
                                src="{$src}"
                                alt=""
                                class="route__img imgonclick"
                                  />
                                END; }
                    echo <<<END
                            
                        </div>
                    </div>
                    END;
                  } 
                  		
                  ?>
                    
<!--                     <div class="flex flex-col route__place-block mb-20">
                        <h2 class="title_big text_aver place__name mb-10">Памятное место 2</h2>
                        <div class="place__info-block">
                            <span class="text_aver place__info-prew">Адрес:</span>
                            <span class="place__adress">г. Липецк, ул.Терешковой 22/4</span>
                        </div>
                        <div class="place__info-block place__info-block_sep">
                            <span class="text_aver place__info-prew">Координаты:</span>
                            <span class="text_midi place__coord">52.614425, 39.568686</span>
                        </div>
                        <div class="place__info-block">
                            <span class="flex text_aver title_small mb-10">Описание</span>
                            <p class="text__descr mb-10">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ab quibusdam a explicabo
                                fuga, unde nesciunt veniam autem ipsam odit excepturi cumque inventore, nam molestiae
                                illo voluptas beatae, sunt molestias! Distinctio, numquam cum velit consequuntur
                                repellendus quod ipsa incidunt aspernatur provident dignissimos. Cupiditate eaque aut
                                nihil quisquam vel iure, magni hic distinctio ipsum, vitae placeat pariatur repellendus,
                                dignissimos harum beatae? Qui eum ex incidunt adipisci quos in.
                            </p>
                            <div class="text_small text_midi hashtag hashtag_midi">#ПаркПобеды</div>
                        </div>

                        <div class="flex route__images">
                            <img
                                src="https://static.tildacdn.com/tild3534-3163-4437-b962-626636343637/1.jpg"
                                alt=""
                                class="route__img imgonclick"
                            />
                            <img
                                src="https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkrEwBJwHlnn-4XZKQdk3ruaaKTM5SRkZCeTgDn6uOyic"
                                alt=""
                                class="route__img imgonclick"
                            />
                            <img
                                src="https://dobvesti.ru/wp-content/uploads/2020/10/DSC_3785.jpg"
                                alt=""
                                class="route__img imgonclick"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col route__place-block mb-20">
                        <h2 class="title_big text_aver place__name mb-10">Памятное место 3</h2>
                        <div class="place__info-block">
                            <span class="text_aver place__info-prew">Адрес:</span>
                            <span class="place__adress">г. Липецк, ул.Терешковой 22/4</span>
                        </div>
                        <div class="place__info-block place__info-block_sep">
                            <span class="text_aver place__info-prew">Координаты:</span>
                            <span class="text_midi place__coord">52.614425, 39.568686</span>
                        </div>
                        <div class="place__info-block">
                            <span class="flex text_aver title_small mb-10">Описание</span>
                            <p class="text__descr mb-10">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ab quibusdam a explicabo
                                fuga, unde nesciunt veniam autem ipsam odit excepturi cumque inventore, nam molestiae
                                illo voluptas beatae, sunt molestias! Distinctio, numquam cum velit consequuntur
                                repellendus quod ipsa incidunt aspernatur provident dignissimos. Cupiditate eaque aut
                                nihil quisquam vel iure, magni hic distinctio ipsum, vitae placeat pariatur repellendus,
                                dignissimos harum beatae? Qui eum ex incidunt adipisci quos in.
                            </p>

                            <p class="text__descr mb-10">
                                Laborum dolorum quisquam iusto illum eius laboriosam quis quae eaque porro voluptatem!
                                Corrupti ut eius tempore animi delectus amet rerum neque voluptas facere! Consequuntur
                                commodi veniam dicta culpa fuga assumenda odio nesciunt. Porro quod reprehenderit
                                tempora, rem qui velit obcaecati dignissimos impedit alias, officia esse amet. Facere
                                cumque rem ullam molestiae suscipit aperiam! Dignissimos suscipit possimus, ex earum
                                officia libero ab unde, voluptatibus dolores similique nulla doloribus dolorem? Corporis
                                quidem repudiandae earum, ex odio itaque laboriosam mollitia odit doloribus
                                reprehenderit corrupti nobis sed.
                            </p>
                            <p class="text__descr mb-10">
                                Laborum dolorum quisquam iusto illum eius laboriosam quis quae eaque porro voluptatem!
                                Corrupti ut eius tempore animi delectus amet rerum neque voluptas facere! Consequuntur
                                commodi veniam dicta culpa fuga assumenda odio nesciunt. Porro quod reprehenderit
                                tempora, rem qui velit obcaecati dignissimos impedit alias, officia esse amet. Facere
                                cumque rem ullam molestiae suscipit aperiam! Dignissimos suscipit possimus, ex earum
                                officia libero ab unde, voluptatibus dolores similique nulla doloribus dolorem? Corporis
                                quidem repudiandae earum, ex odio itaque laboriosam mollitia odit doloribus
                                reprehenderit corrupti nobis sed.
                            </p>
                            <div class="text_small text_midi hashtag hashtag_midi">#Липецк#Красота#Красота#К</div>
                        </div>

                        <div class="flex route__images">
                            <img
                                src="https://vesti-lipetsk.ru/images/news/2019/09/03/np.png"
                                alt=""
                                class="route__img imgonclick"
                            />
                        </div> 
                    </div>-->
                </div>
            </section>
            <!-- Section CARDS -->

            <!-- MODAL window Register/ Log in -->
            <div class="flex-cen modal-wrap modal-wrap_acc">
                <!-- <div class="flex flex-col flex-cen "> -->

                <div class="flex flex-col flex-cen modal-window modal-window_acc">
                    <button class="btn_close">
                        <img src="images/icons/close.png" />
                    </button>
                    <div class="tabs tabs_acc">
                        <!-- Кнопки -->
                        <ul class="flex tabs-nav flex tabs-nav_acc mb-20">
                            <li class="tab-nav_acc"><a href="#log" class="active">Авторизация</a></li>
                            <li class="tab-nav_acc"><a href="#reg">Регистрация</a></li>
                        </ul>

                        <!-- Контент -->
                        <div class="tabs-items tabs_acc" id="wind_log_reg">
                            <div class="tabs-item tabs_acc" id="log">
                                <form method="post" action="index.php" class="flex flex-col flex-cen modal_form modal_form_reg">
                                    <div class="input-box-wrapper input-box-wrapper_log">
                                        <div class="flex input-box">
                                            <input
                                                type="text"
                                                name="login"
                                                minlength="3"
                                                maxlength="20"
                                                placeholder="Введите логин"
                                                required
                                            />
                                        </div>
                                        <div class="flex input-box">
                                            <input
                                                type="password"
                                                name="password"
                                                maxlength="20"
                                                class="password_input"
                                                placeholder="Введите пароль"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" name="submit" class="btn mb-20 btn_enter text_small text_midi  disabled">
                                        Войти
                                    </button>
                                </form>
                            </div>
                            <div class="tabs-item tabs_acc" id="reg">
                                <form name="reg" method="POST" class="flex flex-col flex-cen modal_form">
                                    <div class="input-box-wrapper">
                                        <div class="flex input-box">
                                            <input
                                                type="text"
                                                name="login"
                                                maxlength="20"
                                                placeholder="Введите логин"
                                                required
                                            />
                                        </div>
                                        <div class="flex input-box">
                                            <input
                                                type="password"
                                                name="password"
                                                minlength="3"
                                                maxlength="20"
                                                class="password_input"
                                                placeholder="Введите пароль"
                                                required
                                            />
                                        </div>
                                        <div class="flex input-box mb-20">
                                            <input type="email" name="email" placeholder="Ваша почта" required />
                                        </div>
                                    </div>
                                    <button id="reg-btn" name="submit" type="button" class="btn mb-20 btn_send text_small text_midi  disabled">
                                        Зарегистрироваться
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </div> -->
            </div>
            <!-- MODAL window Register/ Log in -->

            <!-- MODAL window Send Code -->
            <div class="flex-cen modal-wrap modal-wrap_code">
                <div class="flex flex-col flex-cen modal-window modal-window_code">
                    <button class="btn_close">
                        <img src="images/icons/close.png" />
                    </button>
                    <p class="text_midi  title_middle mb-20 modal__title">Завершение регистрации</p>
                    <p class="mb-20 modal__text">На вашу почту был выслан код подтверждения</p>
                    <form name="verif" class="flex flex-col flex-cen modal__form" action="#">
                        <div class="input-box">
                            <input type="number" name="cod" maxlength="5" placeholder="Код" required />
                        </div>
                        <button type="button" id="verif-btn" class="btn text_small midi-text">Подтвердить</button>
                    </form>
                </div>
            </div>
            <!-- MODAL window Send Code -->


            <!-- MODAL window Change password -->
            <div class="flex-cen modal-wrap modal-wrap_change">
                <div class="flex flex-col flex-cen modal-window modal-window_change">
                    <button class="btn_close">
                        <img src="images/icons/close.png" />
                    </button>
                    <p class="text_midi title_middle mb-20 modal__title">Изменить пароль</p>
                    <form class="flex flex-col flex-cen modal_form" method="post" action="smena.php">
                        <div class="input-box-wrapper">
                            <div class="flex input-box input-box_change">
                                <input type="text" name="oldpass" minlength="3" placeholder="Старый пароль" required />
                            </div>
                            <div class="flex input-box input-box_change">
                                <input
                                    type="text"
                                    name="newpass"
                                    minlength="3"
                                    maxlength="20"
                                    class="password_input"
                                    placeholder="Новый пароль"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" name="submit" class="btn mb-20 btn_change text_small text_midi disabled">
                            Изменить
                        </button>
                    </form>
                </div>
            </div>
            <!-- MODAL window Change password -->

            <!-- MODAL window Exit -->
            <div class="flex-cen modal-wrap modal-wrap_exit">
                <div class="flex flex-col flex-cen modal-window">
                    <button class="btn_close">
                        <img src="images/icons/close.png" />
                    </button>
                    <p class="text_midi title_middle mb-20 modal__title">Вы действительно хотите выйти?</p>
                    <form class="flex flex-col flex-cen modal__form" action="#">
                        <button id="exit" type="button" class="btn text_small midi-text">Выйти</button>
                    </form>
                </div>
            </div>
            <!-- MODAL window Exit -->
        </main>
        <footer>
            <section class="section section_footer">
                <div class="container">
                    <p class="name-org"></p>
                </div>
            </section>
        </footer>
        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/scripts.js"></script>
        <script src="js/scale-img.js"></script>
    </body>
</html>
