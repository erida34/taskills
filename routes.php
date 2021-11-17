<?php
    
	include_once("db.php");
    if(isset($_POST["exit"])){
        unset($_SESSION['user_id']);
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
    elseif(isset($_POST['submit'])){
        # Вытаскиваем из БД запись, у которой логин равняеться введенному
        $log1 = mysqli_real_escape_string($link ,$_POST['login']);
        $query = mysqli_query($link ,"SELECT * FROM `users` WHERE `login`='$log1' LIMIT 1");
        $data = mysqli_fetch_assoc($query);
        # Соавниваем пароли
        if($data['password'] === md5(md5($_POST['password']))){
            $user_id = $data['id'];
            $_SESSION['user_id'] = $user_id;
            
			// if($data["verification"] == 0){
			//     header("Location: verification.php"); exit();
			// }
            header("Location: index.php"); exit();
        }
        else{
			echo "<script>alert('Неправильные данный')</script>";
        }
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
        <title>Маршруты</title>
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
                                            <span class="text_small midi-text">Сменить пароль</span>
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
            <?php
                if(isset($_SESSION["user_id"])){
                    echo <<<END
                        <section class="section section_top">
                            <div class="container">
                                <div class="tabs tabs_sec-menu">
                                    <!-- Кнопки -->
                                    <ul class="flex tabs-nav mb-20 tabs-nav_sec-menu">
                                        <li class="tab-nav_sec-menu"><a id="mestamoi" href="#my-cards">Мои места</a></li>
                                        <li class="tab-nav_sec-menu"><a id="ostalnye" href="#other">Обзор</a></li>
                                    </ul>
                                </div>
                                <form action="add-place.php">
                                        <button class="flex flex-cen btn btn_add-place">
                                            <span>Добавить место</span>
                                            <svg width="22" height="22" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g>
                                                        <path d="M0 0h28v28H0z"></path>
                                                        <path
                                                            d="M20 12a1 1 0 011 1v4h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4h-4a1 1 0 010-2h4v-4a1 1 0 011-1zM9.5 17a1 1 0 010 2h-5a1 1 0 010-2h5zm5-6a1 1 0 010 2h-10a1 1 0 010-2h10zm7-6a1 1 0 010 2h-17a1 1 0 110-2h17z"
                                                            id="list_add_outline_28__Icon-Color"
                                                            fill="currentColor"
                                                            fill-rule="nonzero"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </form>
                            </div>
                        </section>
                        <!-- Section SEARCH -->
                        <section class="section section_mini-top">
                        END;
                }
                else{
                    echo '<section class="section section_top">';
                }
            ?>
                <div class="container">
                    
                </div>
            </section>
            <!-- Section SEARCH -->

            <!-- Section CARDS -->
            <section class="section">
                <div class="container">
                <?php
                        if(isset($_SESSION["user_id"])){
                            echo <<<END
                            <div class="tabs-items tabs_sec-menu">
                                <div class="tabs-item tab_sec-menu" id="my-cards">
                                    <div class="flex cards-wrapper" id="moi-bl">
                            END;

                            $query = mysqli_query($link ,"SELECT DISTINCT `id_marsh`, `marsh-name` FROM `marsh` WHERE `id_user`='{$_SESSION['user_id']}'");

                            foreach($query as $row){
                                $query2 = mysqli_query($link ,"SELECT `id_marsh`, `id_place` FROM `marsh` WHERE `id_marsh`='{$row['id_marsh']}' LIMIT 1");
                                $data = mysqli_fetch_assoc($query2);
                                $query3 = mysqli_query($link ,"SELECT `src`, `id_place` FROM `fotos` WHERE `id_place`='{$data['id_place']}' LIMIT 1");
                                $data3 = mysqli_fetch_assoc($query3);
                                $src = $data3['src'];
                                //$query3 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`='{$row['id']}'");
                                echo <<<END
                                        <div class="flex flex-col card">
                                            <img
                                                src="{$src}"
                                                alt=""
                                                class="card__img"
                                            />
                                            <div class="card__content">
                                                <h2 class="title_small text_midi card__title">{$row['marsh-name']}</h2>
                                                <form class="flex flex-cen" action="route.php" method="get">
                                                    <button type="submit" name="place" value="{$row['id_marsh']}" class="text_small text_midi btn btn_more">
                                                        Смотреть
                                                    </button>
                                                </form>
                                                <span class="text_small text_aver hashtag">
                                        END;
                                            // foreach($query3 as $row){
                                            //     echo $row["hashtag"];
                                            // }
                                echo <<<END
                                        </span>
                                            </div>
                                        </div>
                                END;
                            }
                            echo <<<END
                                    </div>
                                </div>

                                <div class="tabs-item tab_sec-menu" id="other">
                                    
                                
                            END;

                            echo '<div class="flex cards-wrapper" id="other-bl">';
                            $query = mysqli_query($link ,"SELECT DISTINCT `id_marsh`, `marsh-name` FROM `marsh` WHERE 1");

                            foreach($query as $row){
                                $query2 = mysqli_query($link ,"SELECT `id_marsh`, `id_place` FROM `marsh` WHERE `id_marsh`='{$row['id_marsh']}' LIMIT 1");
                                $data = mysqli_fetch_assoc($query2);
                                $query3 = mysqli_query($link ,"SELECT `src`, `id_place` FROM `fotos` WHERE `id_place`='{$data['id_place']}' LIMIT 1");
                                $data3 = mysqli_fetch_assoc($query3);
                                $src = $data3['src'];
                                // $query3 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`='{$row['id']}'");
                                echo <<<END
                                        <div class="flex flex-col card">
                                        <img
                                            src="{$src}"
                                            alt="img"
                                            class="card__img"
                                        />
                                        <div class="card__content">
                                            <h2 class="title_small text_midi card__title">{$row['marsh-name']}</h2>
                                            <form class="flex flex-cen" action="place.php" method="get">
                                                <button type="submit" name="place" value="{$row['id_marsh']}" class="text_small text_aver btn btn_more">Смотреть</button>
                                            </form>
                                            <span class="text_small text_aver hashtag">
                                        END;
                                                // foreach($query3 as $row){
                                                //     echo $row["hashtag"];
                                                // }
                                    echo <<<END
                                    </span>
                                        </div>
                                    </div>
                                END;
                            }
                            echo '</div></div></div>';
                        }
                        else{
                            echo '<div class="flex cards-wrapper" id="other-bl">';
                            $query = mysqli_query($link ,"SELECT DISTINCT `id_marsh`, `marsh-name` FROM `marsh` WHERE 1");

                            foreach($query as $row){
                                $query2 = mysqli_query($link ,"SELECT `id_marsh`, `id_place` FROM `marsh` WHERE `id_marsh`='{$row['id_marsh']}' LIMIT 1");
                                $data = mysqli_fetch_assoc($query2);
                                $query3 = mysqli_query($link ,"SELECT `src`, `id_place` FROM `fotos` WHERE `id_place`='{$data['id_place']}' LIMIT 1");
                                $data3 = mysqli_fetch_assoc($query3);
                                $src = $data3['src'];
                                // $query3 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`='{$row['id']}'");
                                echo <<<END
                                        <div class="flex flex-col card">
                                        <img
                                            src="{$src}"
                                            alt="img"
                                            class="card__img"
                                        />
                                        <div class="card__content">
                                            <h2 class="title_small text_midi card__title">{$row['marsh-name']}</h2>
                                            <form class="flex flex-cen" action="place.php" method="get">
                                                <button type="submit" name="place" value="{$row['id_marsh']}" class="text_small text_aver btn btn_more">Смотреть</button>
                                            </form>
                                            <span class="text_small text_aver hashtag">
                                        END;
                                                // foreach($query3 as $row){
                                                //     echo $row["hashtag"];
                                                // }
                                    echo <<<END
                                    </span>
                                        </div>
                                    </div>
                                END;
                            }
                            echo '</div>';
                        }
                    ?>
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
                            <li class="tab-nav_acc"><a href="#log">Авторизация</a></li>
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
                                                type="text"
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
                                                type="text"
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
            <div class="flex-cen modal-wrap modal-wrap_code <?php $query = mysqli_query($link ,"SELECT * FROM `users` WHERE `id`='".intval($_SESSION['user_id'])."' LIMIT 1");
        $userdata = mysqli_fetch_assoc($query); if($userdata["verification"]==="0"){echo "display-flex";include_once("verification.php");} ?>">
                <div class="flex flex-col flex-cen modal-window modal-window_code">
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
                    <p class="text_midi title_middle mb-20 modal__title">Сменить пароль</p>
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
                            Сменить
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
    </body>
</html>
