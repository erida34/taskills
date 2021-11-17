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
          <h1 class="title_biggest text_midi mb-20">Добавить место</h1>
          <form action="" class="form_place">
            <div class="flex input-box input-box_add">
              <input
                type="text"
                name="placename"
                placeholder="Название памятного места"
                required
              />
            </div>

            <div class="flex input-box input-box_add">
              <input type="text" name="address" placeholder="Адрес" required />
            </div>

            <div class="flex input-box input-box_add input-box_add_short">
              <input
                type="text"
                name="coord"
                placeholder="Координаты"
                required
              />
              <button type="button" class="find-me btn btn-info btn-block">
                Мои координаты
              </button>
            </div>

            <div class="flex input-box input-box_add">
              <textarea
                class="input-descr"
                type="text"
                name="descr"
                placeholder="Описание"
                required
              ></textarea>
            </div>
                                
            <label class="flex flex-col flex-cen label-load mb-20" id="dropbox">
              <i class="material-icons" style="font-size: 40px">attach_file</i>
              <span class="text_cen text_small">Выберите / Перетащите свои файлы</span>
              <input class="addImages" type="file" id="addImages" multiple="">
            </label>     
                  
              <ul class="flex upload-img__container" id="uploadImagesList">
                  <li class="item template">
                      <span class="img-wrap">
                          <img src="" class="img-upl" alt="">
                          <input type="hidden" name="img">
                      </span>
                      <button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button>
                  </li>
              </ul>

            <div class="flex input-box input-box_add">
              <input
                type="text"
                name="hashtag"
                placeholder="#Добавить#ХэштегиМеста"
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
    <script src="js/image-upload.js"></script>
  </body>
</html>
