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

// Скрипт предпоказа картинок
var el = document.getElementById("img-load-1");
if (el) {
  document.querySelector("#img-load-1").addEventListener("change", function () {
    if (this.files[0]) {
      var fr = new FileReader();

      fr.addEventListener(
        "load",
        function () {
          document.querySelector("#label-load-1").style.backgroundImage =
            "url(" + fr.result + ")";
        },
        false
      );

      fr.readAsDataURL(this.files[0]);
    }
  });
}

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

  // Добавляем кнопку сохранить
  // $(
  //   '<button class="text_midi btn btn_add-place swap-search" type="submit">Сохранить</button> <button class="btn btn_add-place" type="submit">Отменить</button>'
  // ).insertAfter(".descr-hash");

  // Превращаем блок в форму
  $(".container_place").prepend(
    '<form method="post" class="add-form" action="edit_place.php"></form>'
  );
  $(".add-form").html($(".place__content").html());
  $("div.place__content").addClass("display-none");

  $(".user-actions_red").attr("disabled", true);

  //
  //----------------------------------------
  // var div = document.createElement("div");
  // div.outerHTML = '<div class="test">test</div>';
  // console.log(div.outerHTML); // output: "<div></div>"

  $(
    '<label class="flex flex-col flex-cen label-load mb-20" id="dropbox"><i class="material-icons" style="font-size: 40px">attach_file</i><span class="text_cen text_small">Выберите / Перетащите свои файлы</span><input class="" type="file" id="addImages" multiple=""><input type="hidden" name="azaza" value="zazaza"></label><ul class="flex upload-img__container" id="uploadImagesList"><li class="item template"><span class="img-wrap"><img src="" class="img-upl" alt=""></span><button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button></li></ul>'
  ).insertAfter(".place__content");

  // var imgWrap = document.createElement("div");
  // imgWrap.innerText = "gg";
  // imgWrap.className = "place__images";
  // if (imgWrap) {
  //   imgWrap.outerHTML =
  //     '<label class="flex flex-col flex-cen label-load mb-20" id="dropbox"><i class="material-icons" style="font-size: 40px">attach_file</i><span class="text_cen text_small">Выберите / Перетащите свои файлы</span><input class="" type="file" id="addImages" multiple=""><input type="hidden" name="azaza" value="zazaza"></label><ul class="flex upload-img__container" id="uploadImagesList"><li class="item template"><span class="img-wrap"><img src="" class="img-upl" alt=""></span><button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button></li></ul>';
  // }

  list = document.querySelectorAll(".place__img");
  if (list) {
    for (i = 0; i < list.length; ++i) {
      var srcImg = list[i].getAttribute("src");
      var img = document.createElement("img");

      var itemPreview = itemPreviewTemplate.clone();

      itemPreview.find(".img-wrap img").attr("src", srcImg);
      imagesList.append(itemPreview);

      console.log(srcImg);
      // if (imagesList[i]) {
      //   imagesList[i].attr("src", srcImg);
      // }
    }
  }

  $(".swiper").addClass("display-none");
  $(
    '<button class="text_midi btn btn_add-place swap-search" type="submit">Сохранить</button> <button class="btn btn_add-place" type="submit">Отменить</button>'
  ).insertAfter(".place__images");

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
