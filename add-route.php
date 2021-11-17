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
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Места</title>
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
      <!-- Section ADD Form-->
      <section class="section section_top">
        <div class="container container_add-place">
          <h1 class="title_biggest text_midi mb-20">Добавить маршрут</h1>
          <form action="" class="form_place">
            <div class="flex input-box input-box_add">
              <input
                type="text"
                name="placename"
                placeholder="Название маршрута"
                required
              />
            </div>
            <div class="flex">
              <form action="" class="form-search">
                  <input id="inp-search" type="text" placeholder="Поиск места" class="text_small input-search" />
                  <button type="submit" class="flex flex-cen btn btn-search">
                      <img src="images/icons/search1.png" />
                  </button>
              </form>
            </div>

            <div class="mb-20">
                <div class="checkbox-input">
                  <label class="custom-checkbox">
                    <input type="checkbox" name="place-1" value="place-1">
                    <span>1 место</span>
                  </label>
                </div>

                <div class="checkbox-input">
                  <label class="custom-checkbox">
                    <input type="checkbox" name="place-2" value="place-2">
                    <span>2 место</span>
                  </label>
                </div>

                <div class="checkbox-input">
                  <label class="custom-checkbox">
                    <input type="checkbox" name="place-3" value="place-3">
                    <span>3 место</span>
                  </label>
                </div>

                <div class="checkbox-input">
                  <label class="custom-checkbox">
                    <input type="checkbox" name="place-4" value="place-4">
                    <span>4 место</span>
                  </label>
                </div>

                <div class="checkbox-input">
                  <label class="custom-checkbox">
                    <input type="checkbox" name="place-5" value="place-5">
                    <span>5 место</span>
                  </label>
                </div>
            </div>
            <p class="text_aver mb-10">
              Добавьте карту маршрута используя сервис Яндекс.Карты
              <svg title='' class="tooltip__marker" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="tooltip" tabindex="0" aria-label="Тултип подробнее">
                          <path class="tooltip__border" d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z" stroke="#9D5CD0"/>
                          <path class="tooltip__simbol" d="M7.26154 6.4551H8.73846V13H7.26154V6.4551ZM8 4.90259C7.71282 4.90259 7.4718 4.81126 7.27692 4.62861C7.09231 4.44597 7 4.22273 7 3.9589C7 3.69508 7.09231 3.47184 7.27692 3.28919C7.4718 3.0964 7.71282 3 8 3C8.28718 3 8.52308 3.09132 8.70769 3.27397C8.90256 3.44647 9 3.66464 9 3.92846C9 4.20243 8.90256 4.43582 8.70769 4.62861C8.52308 4.81126 8.28718 4.90259 8 4.90259Z" fill="black"/>
              </svg>
            </p>

            <div class="flex input-box input-box_add">
              <input
                type="text"
                name="map"
                placeholder="Вставьте ссылку на карту маршрута"
              />
            </div>
            <button class="btn btn_add title_small" type="submit">Добавить</button>
          </form>
        </div>
      </section>
      <!-- Section ADD Form -->

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
    <!-- Development -->
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js"></script>
    <script src="https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js"></script>

    <!-- Production -->
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>

    <script>  
      tippy('#tooltip', {
        content: 'Шаг 1. Перейдите на сайт Яндекс.Карты: https://yandex.ru/maps. Шаг 2. Заполните поля "Откуда", "Куда" и "Промежуточная точка" (если более 2х мест в маршруте). Шаг 3. Поделитесь картой нажав в правом верхнем углу ссылку "Поделиться". Шаг 4. Скопируйте ссылку из поля "Виджет с картой"',
        maxWidth: 250,
      });
    </script>
  </body>
</html>
