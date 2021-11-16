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

// Скрипт редактирования места
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

  $(
    '<label class="flex flex-col flex-cen label-load mb-20" id="dropbox"><i class="material-icons" style="font-size: 40px">attach_file</i><span class="text_cen text_small">Выберите / Перетащите свои файлы</span><input class="" type="file" id="addImages" multiple=""></label> <ul class="flex upload-img__container" id="uploadImagesList"><li class="item template"><span class="img-wrap"><img src="" class="img-upl" alt=""></span><button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button></li></ul>'
  ).insertAfter(".place__content");

  $(".swiper").addClass("display-none");
  $(
    '<button class="text_midi btn btn_add-place swap-search" type="submit">Сохранить</button> <button class="btn btn_add-place" type="submit">Отменить</button>'
  ).insertAfter(".upload-img__container");

  // Превращаем блок в форму
  $(".section_place").prepend(
    '<form method="post" class="container add-form" action="edit_place.php"></form>'
  );

  $(".add-form").html($(".container_place").html());
  // $(".container_place").addClass("display-none");
  $(".container_place").remove();
  // document.getElementById("id1").remove();

  $(".user-actions_red").attr("disabled", true);

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

  list = document.querySelectorAll(".place__img");
  if (list) {
    for (i = 0; i < list.length; ++i) {
      var srcImg = list[i].getAttribute("src");
      var itemPreview = itemPreviewTemplate.clone();

      itemPreview.find(".img-wrap img").attr("src", srcImg);
      imagesList.append(itemPreview);
    }
  }
  //------------------------------
  //

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
        $("#wind_log_reg").addClass("display-none");
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
        $(".modal-wrap_code").addClass("display-none");
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
