<?php
    
	include_once("db.php");
    $place = $_GET["place"];
    $query = mysqli_query($link ,"SELECT * FROM `places` WHERE `id`='".intval($place)."' LIMIT 1");
    $data = mysqli_fetch_assoc($query);
    if(mysqli_num_rows($query) == 0){
        header("Location: index.php"); exit();
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
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper/swiper-bundle.min.css"
    />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Какое-то конкретное место</title>
  </head>
  <body>
    <header>
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
                                    <button class="menu__link text_aver drop-menu__link">$login <img src="images/icons/arrow-down.png" alt="" class="menu__arrow" /></button>
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
                                    <button class="menu__link text_aver btn btn_acc">Аккаунт</button>
                                    END;
                                }
                            ?>
                        </li>
                    </ul>
                </nav>
            </section> 
        <!-- Section MENU -->
      </header>
    </header>
    <main>
      <!-- Section CARDS -->
      <section class="section section_top section_place">
        <div class="container container_place">
          <div class="place__content">
            <div class="flex flex-cen mb-20 place__header">
              <h1
                class="place__input title_biggest text_aver place__name"
                name="placename"
              >
                <?php echo $data['name']; ?>
              </h1>
              <button class="user-actions_red">
                <img src="images/icons/pencil.png" />
              </button>
            </div>
            <div>
              <div class="title_small info mb-20">Информация</div>
              <div class="place__info-block">
                <span class="text_aver place__info-prew">Адрес:</span>
                <span class="place__input place__adress" name="address"
                  ><?php echo $data['address']; ?></span
                >
              </div>
              <div class="place__info-block place__info-block_sep">
                <span class="text_aver place__info-prew">Координаты:</span>
                <span class="place__input text_midi place__coord" name="coord"
                  ><?php echo $data['coordinates']; ?></span
                >
              </div>
              <input
                type="hidden"
                value='<?php echo $_GET["place"];?>'
                name="id_place"
              />
              <div class="place__info-block descr-hash">
                <span class="flex text_aver title_small mb-10">Описание</span>
                <p class="text__descr mb-10">
                  <?php echo $data['description']; ?>
                </p>
                <span
                  class="
                    place__input
                    flex
                    text_small text_midi
                    hashtag hashtag_midi
                  "
                  name="hashtag"
                  ><?php
                                $query3 = mysqli_query($link ,"SELECT * FROM `hashtags` WHERE `id_place`='{$place}'");
                                foreach($query3 as $row){
                                    echo $row["hashtag"];
                                }
                                ?></span
                >
              </div>
            </div>
          </div>
                                
          <!-- Slider main container -->
          <div class="mb-20 swiper ">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="https://phonoteka.org/uploads/posts/2021-06/1624712360_1-phonoteka_org-p-milii-kotik-oboi-krasivo-1.jpg" alt="img" class="place__img">
              </div>
              <div class="swiper-slide">
                <img src="https://i.imgur.com/onvgh4R.jpg" alt="img" class="place__img">
              </div>
              <div class="swiper-slide">
                <img src="https://i.imgur.com/onvgh4R.jpg" alt="img" class="place__img">
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
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
                <form
                  method="post"
                  action="index.php"
                  class="flex flex-col flex-cen modal_form modal_form_reg"
                >
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
                  <button
                    type="submit"
                    name="submit"
                    class="btn mb-20 btn_enter text_small text_midi disabled"
                  >
                    Войти
                  </button>
                </form>
              </div>
              <div class="tabs-item tabs_acc" id="reg">
                <form
                  name="reg"
                  method="POST"
                  class="flex flex-col flex-cen modal_form"
                >
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
                      <input
                        type="email"
                        name="email"
                        placeholder="Ваша почта"
                        required
                      />
                    </div>
                  </div>
                  <button
                    id="reg-btn"
                    name="submit"
                    type="button"
                    class="btn mb-20 btn_send text_small text_midi disabled"
                  >
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
          <p class="text_midi title_middle mb-20 modal__title">
            Завершение регистрации
          </p>
          <p class="mb-20 modal__text">
            На вашу почту был выслан код подтверждения
          </p>
          <form
            name="verif"
            class="flex flex-col flex-cen modal__form"
            action="#"
          >
            <div class="input-box">
              <input
                type="number"
                name="cod"
                maxlength="5"
                placeholder="Код"
                required
              />
            </div>
            <button
              type="button"
              id="verif-btn"
              class="btn text_small midi-text"
            >
              Подтвердить
            </button>
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
          <p class="text_midi title_middle mb-20 modal__title">
            Сменить пароль
          </p>
          <form
            class="flex flex-col flex-cen modal_form"
            method="post"
            action="smena.php"
          >
            <div class="input-box-wrapper">
              <div class="flex input-box input-box_change">
                <input
                  type="text"
                  name="oldpass"
                  minlength="3"
                  placeholder="Старый пароль"
                  required
                />
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
            <button
              type="submit"
              name="submit"
              class="btn mb-20 btn_change text_small text_midi disabled"
            >
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
          <p class="text_midi title_middle mb-20 modal__title">
            Вы действительно хотите выйти?
          </p>
          <form class="flex flex-col flex-cen modal__form" action="#">
            <button id="exit" type="button" class="btn text_small midi-text">
              Выйти
            </button>
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
    <script src="js/image-upload.js"></script>

    <!-- Swiper JS -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <!-- Initialize Swiper -->
    <script>
      var swiper = new Swiper(".place__images", {
          loop: true,
          spaceBetween: 30,

          pagination: {
              el: '.swiper-pagination',
              dynamicBullets: true,
          },

          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },

          scrollbar: {
              el: '.swiper-scrollbar',
          },
      });
    </script>
  </body>
</html>
