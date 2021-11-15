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
$(".drop-menu").hide();
$(".drop-menu__link").click(function () {
  if ($(".drop-menu").hasClass("active")) {
    setTimeout(function () {
      $(".drop-menu").removeClass("active");
      $(".menu__arrow").removeClass("rotate");
      $(".drop-menu").hide();
    }, 100);
  } else {
    setTimeout(function () {
      $(".drop-menu").show();
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

// Скрипт показать больше
var el = document.getElementById("card-btn");
if (el) {
  document.querySelector("#card-btn").addEventListener("click", function () {
    document.querySelectorAll(".card").forEach(function (eventCard) {
      eventCard.classList.toggle("card_active");
    });
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
    '<button type="button" class="find-me btn btn-info btn-block">Find My Location</button>'
  ).insertAfter('input[name="coord"]');

  // Добавляем кнопку сохранить
  $(
    '<button class="text_midi btn btn_add-place swap-search" type="submit">Сохранить</button> <button class="btn btn_add-place" type="submit">Отменить</button>'
  ).insertAfter(".descr-hash");

  // Превращаем блок в форму
  $(".container_place").prepend(
    '<form class="add-form" action="any.php"></form>'
  );
  $(".add-form").html($(".place__content").html());
  $("div.place__content").hide();

  $(".user-actions_red").attr("disabled", true);
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
      alert("click2");
      console.log(lat + ", " + lat);
      console.log($('input[name="coord"]').val);
      $('input[name="coord"]').val(lat + ", " + lat);
      console.log($('input[name="coord"]').val);
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
        $("#wind_log_reg").hide();
        $.ajax({
          type: "POST",
          url: "verification.php",
          success: function (result) {
            console.log(result);
          },
        });
      }
      console.log(result);
    },
  });
});

$("#verif-btn").click(function () {
  var form = new FormData(document.forms.reg);
  $.ajax({
    type: "POST",
    url: "verificode.php",
    data: { cod: form.get("cod") },
    success: function (result) {
      if (result == "ok") {
        $(".modal-wrap_code").hide();
      }
      console.log(result);
    },
  });
});

$("#inp-search").on("input", function () {
  var texti = this.value;
  var bl = "noy";
  if (document.getElementById("mestamoi").className == "active") {
    var bl = "moi";
  }
  document.getElementById("other-bl").innerHTML = " ";
  document.getElementById("moi-bl").innerHTML = " ";
  // if(texti[0] != "#"){
  $.ajax({
    type: "POST",
    url: "search.php",
    data: { texti: texti, block: bl },
    success: function (result) {
      if (bl == "noy") $("#other-bl").html(result);
      else $("#moi-bl").html(result);
    },
  });
  // }
  // else{
  //     $.ajax({
  //         type: "POST",
  //         url: "search_hash.php",
  //         data: {texti: texti, block: bl},
  //         success: function(result) {
  //             if(bl == "noy") $("#other-bl").html(result);
  //             else $("#moi-bl").html(result);
  //         }
  //     });
  // }
});
