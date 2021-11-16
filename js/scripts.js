// Скрипт появления скрытия окна войти / зарегистрироваться
$(".btn_acc").click(function () {
  $(".modal-wrap_acc").addClass("display-flex");
  $(".modal-window_acc").addClass("display-flex");
});

$(".btn_change-pass").click(function () {
  $(".modal-wrap_change").addClass("display-flex");
  $(".modal-window_change").addClass("display-flex");
});

$(".btn_exit").click(function () {
  $(".modal-wrap_exit").addClass("display-flex");
  $(".modal-window_exit").addClass("display-flex");
});

// Скрипт закрытия модальных окон
$(".btn_close").click(function () {
  $(".modal-wrap").removeClass("display-flex");
  $(".modal-window").removeClass("display-flex");
});

// Скрипт перемещения по табам
$(function () {
  var tab = $(".tabs-items > div");
  tab.hide().filter(":first").show();

  // Клики по вкладкам.
  $(".tabs .tabs-nav a")
    .click(function () {
      tab.hide();
      tab.filter(this.hash).show();
      $(".tabs .tabs-nav a").removeClass("active");
      $(this).addClass("active");
      return false;
    })
    .filter(":first")
    .click();
});

// Проверка email на валидность
$("form input[type=email]").on("input", function () {
  var pattern = /^[a-z0-9_.-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
  let email = $(this).val();
  if (email != "") {
    $(this).css({ "border-color": "#c7cfcf" });
    if (email.search(pattern) == 0) {
      $(".btn_send").prop("disabled", false);
      $(".btn_send").removeClass("disabled");
    } else {
      $(".btn_send").prop("disabled", true);
      $(".btn_send").addClass("disabled");
    }
  }
});

// Выпадающее меню
$(".drop-menu").addClass("display-none");
$(".drop-menu__link").click(function () {
  if ($(".drop-menu").hasClass("active")) {
    setTimeout(function () {
      $(".drop-menu").removeClass("active");
      $(".menu__arrow").removeClass("rotate");
      $(".drop-menu").addClass("display-none");
    }, 100);
  } else {
    setTimeout(function () {
      $(".drop-menu").removeClass("display-none");
      $(".drop-menu").addClass("active");
      $(".menu__arrow").addClass("rotate");
    }, 100);
  }
});
var new_imgs = [];
var del_imgs = [];
;// Скрипт редактирования места
$(".user-actions_red").click(function () {
  // Заменяем все .place__input на input
  var i,
    list = document.querySelectorAll(".place__input");
  for (i = 0; i < list.length; ++i) {
    list[i].outerHTML =
      "<input type='text' name='" +
      list[i].getAttribute("name") +
      "' class='mb-10 place__input_active' value='" +
      list[i].innerHTML +
      "' />";
  }

  // Заменяем все .text__descr на textarea
  list = document.querySelectorAll(".text__descr");
  for (i = 0; i < list.length; ++i) {
    var textAr = list[i].innerHTML;
    list[i].outerHTML =
      "<textarea class='input-descr mb-20' type='text' name='descr' required>" +
      textAr +
      "</textarea>";
  }

  list = document.querySelectorAll(".text__descr");
  for (i = 0; i < list.length; ++i) {
    var textAr = list[i].innerHTML;
    list[i].outerHTML =
      "<textarea class='input-descr mb-20' type='text' name='descr' required>" +
      textAr +
      "</textarea>";
  }

  // Добавляем кнопку определения координат
  $(
    '<button type="button" class="find-me btn btn-info btn-block">Мои координаты</button>'
  ).insertAfter('input[name="coord"]');

  // Добавляем поле для вставки фото
  $(
    '<label class="flex flex-col flex-cen label-load mb-20" id="dropbox"><i class="material-icons" style="font-size: 40px">attach_file</i><span class="text_cen text_small">Выберите / Перетащите свои файлы</span><input class="" type="file" id="addImages" multiple=""></label> <ul class="flex upload-img__container" id="uploadImagesList"><li class="item template"><span class="img-wrap"><img src="" class="img-upl" alt=""><input type="hidden" name="img"></span><button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button></li></ul>'
  ).insertAfter(".place__content");

  $(
    '<button class="text_midi btn btn_add-place swap-search" type="submit">Сохранить</button> <button class="btn btn_add-place" type="submit">Отменить</button>'
  ).insertAfter(".upload-img__container");

  // Добавляем форму на страницу
  $(".section_place").prepend(
    '<form method="post" class="container add-form" action="edit_place.php"></form>'
  );

  // Превращаем блок в форму и удаляем лишнее
  $(".add-form").html($(".container_place").html());
  $(".container_place").remove();
  $(".swiper-slide-duplicate").remove();
  $(".user-actions_red").addClass("display-none");

  var queue = {};
  var imagesList = $("#uploadImagesList");

  var itemPreviewTemplate = imagesList.find(".item.template").clone();
  itemPreviewTemplate.removeClass("template");
  imagesList.find(".item.template").remove();

  $("#addImages").on("change", function () {
    var files = this.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        alert("Фотография должна быть в формате jpg, png, webp или gif");
        continue;
      }
      preview(files[i]);
    }

    this.value = "";
  });

  var dropbox;
  dropbox = document.getElementById("dropbox");

  if (dropbox) {
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  }

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
  }

  function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        alert("Фотография должна быть в формате jpg, png, webp или gif");
        continue;
      }

      preview(files[i]);
    }

    this.value = "";
  }

  // Создание превью
  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function (event) {
      var itemPreview = itemPreviewTemplate.clone();

      itemPreview.find(".img-wrap img").attr("src", event.target.result);
      itemPreview.find(".img-wrap img").addClass("new-upload");
      itemPreview.find(".img-wrap img")[0].setAttribute("value", file.name);
      itemPreview.data("id", file.name);

      imagesList.append(itemPreview);

      queue[file.name] = file;
    });
    reader.readAsDataURL(file);
    new_imgs.push(file)
  }

  // Удаление фотографий
  imagesList.on("click", ".delete-link", function () {
    var item = $(this).closest(".item"),
      id = item.data("id");
    if($(this).parent().find(".img-upl").hasClass("new-upload")){
      for(i = 0; i < new_imgs.length; i++){
        if(new_imgs[i]["name"] == $(this).parent().find(".new-upload")[0].getAttribute("value")){
          new_imgs.splice(i, 1);
        }
      }
    }
    else{
      del_imgs.push($(this).parent().find(".img-upl")[0].getAttribute("src"));
    }
    delete queue[id];

    item.remove();
  });

  list = document.querySelectorAll(".place__img");
  if (list) {
    for (i = 0; i < list.length; ++i) {
      var srcImg = list[i].getAttribute("src");
      var itemPreview = itemPreviewTemplate.clone();

      itemPreview.find(".img-wrap img").attr("src", srcImg);
      imagesList.append(itemPreview);
    }
  }

  $(".place__images").remove();
  //------------------------------
  //

  // Скрипт определения геолокации пользователя на странице редактировать
  var findMeButton = $(".find-me");
  if (!navigator.geolocation) {
    findMeButton.addClass("disabled");
    $(".no-browser-support").addClass("visible");
  } else {
    findMeButton.on("click", function (e) {
      e.preventDefault();
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $('input[name="coord"]').val(lat + ", " + lng);
      });
    });
  }
});

// Скрипт определения геолокации пользователя
var findMeButton = $(".find-me");
if (!navigator.geolocation) {
  findMeButton.addClass("disabled");
  $(".no-browser-support").addClass("visible");
} else {
  findMeButton.on("click", function (e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $('input[name="coord"]').val(lat + ", " + lng);
    });
  });
}

//
//
//
//

$(".btn_add-form").click(function () {
  // Добавляем форму на страницу
  alert("clcik");
  $(".btn_add").remove();
  $(".btn_add-form").remove();
  $(".container_add-place").append(
    '<form action="" class="form_place"> <div class="flex input-box input-box_add"> <input type="text" name="placename" placeholder="Название памятного места" required /> </div> <div class="flex input-box input-box_add"> <input type="text" name="address" placeholder="Адрес" required /> </div> <div class="flex input-box input-box_add input-box_add_short"> <input type="text" name="coord" placeholder="Координаты" required /> <button type="button" class="find-me btn btn-info btn-block"> Мои координаты </button> </div> <div class="flex input-box input-box_add"> <textarea class="input-descr" type="text" name="descr" placeholder="Описание" required ></textarea> </div> <label class="flex flex-col flex-cen label-load mb-20" id="dropbox"> <i class="material-icons" style="font-size: 40px">attach_file</i> <span class="text_cen text_small">Выберите / Перетащите свои файлы</span> <input class="" type="file" id="addImages" multiple=""> </label> <ul class="flex upload-img__container" id="uploadImagesList"> <li class="item template"> <span class="img-wrap"> <img src="" class="img-upl" alt=""> <input type="hidden" name="img"> </span> <button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button> </li> </ul> <div class="flex input-box input-box_add"> <input type="text" name="hashtag" placeholder="Хэштеги Пример: #Липецк#КрасивыйГород" /> </div> <button type="button" class="flex flex-cen btn_add-form mb-20"> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g id="original-icon" fill="#000000"> <path d="M86,6.88c-43.65603,0 -79.12,35.46397 -79.12,79.12c0,43.65603 35.46397,79.12 79.12,79.12c43.65603,0 79.12,-35.46397 79.12,-79.12c0,-43.65603 -35.46397,-79.12 -79.12,-79.12zM86,13.76c39.93779,0 72.24,32.30221 72.24,72.24c0,39.93779 -32.30221,72.24 -72.24,72.24c-39.93779,0 -72.24,-32.30221 -72.24,-72.24c0,-39.93779 32.30221,-72.24 72.24,-72.24zM85.94625,58.43297c-1.89722,0.02966 -3.41223,1.58976 -3.38625,3.48703v20.64h-20.64c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h20.64v20.64c-0.01754,1.24059 0.63425,2.39452 1.7058,3.01993c1.07155,0.62541 2.39684,0.62541 3.46839,0c1.07155,-0.62541 1.72335,-1.77935 1.7058,-3.01993v-20.64h20.64c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058h-20.64v-20.64c0.01273,-0.92983 -0.35149,-1.82522 -1.00967,-2.48214c-0.65819,-0.65692 -1.55427,-1.01942 -2.48408,-1.00489z" ></path> </g> </g> </svg> Добавить ещё одно место </button> <button class="btn btn_add title_small" type="submit">Добавить</button> </form>'
  );

  var queue = {};
  var imagesList = $("#uploadImagesList");

  var itemPreviewTemplate = imagesList.find(".item.template").clone();
  itemPreviewTemplate.removeClass("template");
  imagesList.find(".item.template").remove();

  $("#addImages").on("change", function () {
    var files = this.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        alert("Фотография должна быть в формате jpg, png, webp или gif");
        continue;
      }
      preview(files[i]);
    }

    this.value = "";
  });

  var dropbox;
  dropbox = document.getElementById("dropbox");

  if (dropbox) {
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  }

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
  }

  function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        alert("Фотография должна быть в формате jpg, png, webp или gif");
        continue;
      }

      preview(files[i]);
    }

    this.value = "";
  }

  // Создание превью
  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function (event) {
      var itemPreview = itemPreviewTemplate.clone();

      itemPreview.find(".img-wrap img").attr("src", event.target.result);
      itemPreview.data("id", file.name);

      imagesList.append(itemPreview);

      queue[file.name] = file;
    });
    reader.readAsDataURL(file);
  }

  // Удаление фотографий
  imagesList.on("click", ".delete-link", function () {
    var item = $(this).closest(".item"),
      id = item.data("id");

    delete queue[id];

    item.remove();
  });
});
//
//
//
//

//
//
//

//btn funcrion
$("#exit").click(function () {
  $.ajax({
    type: "POST",
    url: "index.php",
    data: {
      exit: "exit",
    },
    success: function (result) {
      location.reload();
    },
  });
});
$("#verif_close").click(function () {
  $.ajax({
    type: "POST",
    url: "index.php",
    data: {
      exit: "exit",
    },
    success: function (result) {
      location.reload();
    },
  });
});

$("#reg-btn").click(function () {
  var form = new FormData(document.forms.reg);
  $.ajax({
    type: "POST",
    url: "reg.php",
    data: {
      login: form.get("login"),
      password: form.get("password"),
      email: form.get("email"),
      submit: "submit",
    },
    success: function (result) {
      if (result == "ok") {
        $(".modal-wrap_code").addClass("display-flex");
        $(".modal-window_acc").addClass("display-none");
        $.ajax({
          type: "POST",
          url: "verification.php",
          success: function (result) {
            console.log(result);
          },
        });
      } else {
        alert(result);
      }
    },
  });
});

$("#verif-btn").click(function () {
  var form = new FormData(document.forms.verif);
  $.ajax({
    type: "POST",
    url: "verificode.php",
    data: { cod: form.get("cod") },
    success: function (result) {
      if (result == "ok") {
        $(".modal-wrap_code").removeClass("display-flex");
        $(".modal-wrap_acc").removeClass("display-flex");
        location.reload();
      } else alert("Неправильный код");
    },
  });
});

$("#inp-search").on("input", function () {
  var texti = this.value;
  var bl = "noy";
  if ($("#mestamoi").hasClass("active")) {
    var bl = "moi";
  }
  document.getElementById("other-bl").innerHTML = " ";
  $("#moi-bl").html(" ");
  $.ajax({
    type: "POST",
    url: "search.php",
    data: { texti: texti, block: bl },
    success: function (result) {
      if (bl == "noy") $("#other-bl").html(result);
      else $("#moi-bl").html(result);
    },
  });
});

$("#selec").on("input", function () {
  var texti = this.value;
  document.getElementById("inp-search").value = texti;
  var bl = "noy";
  if ($("#mestamoi").hasClass("active")) {
    var bl = "moi";
  }
  document.getElementById("other-bl").innerHTML = " ";
  $("#moi-bl").html(" ");
  $.ajax({
    type: "POST",
    url: "search.php",
    data: { texti: texti, block: bl },
    success: function (result) {
      if (bl == "noy") $("#other-bl").html(result);
      else $("#moi-bl").html(result);
    },
  });
});

$(".btn_hash").click(function () {
  var texti = this.innerHTML;
  document.getElementById("inp-search").value = texti;
  var bl = "noy";
  if ($("#mestamoi").hasClass("active")) {
    var bl = "moi";
  }
  document.getElementById("other-bl").innerHTML = " ";
  $("#moi-bl").html(" ");
  $.ajax({
    type: "POST",
    url: "search.php",
    data: { texti: texti, block: bl },
    success: function (result) {
      if (bl == "noy") $("#other-bl").html(result);
      else $("#moi-bl").html(result);
    },
  });
});
