	$('#AllBtn').on('click', function() {
  document.querySelectorAll('.card-mesto').forEach(function(eventCard) {
    eventCard.classList.toggle("card_active");
  });
});

$('#AllBtn2').on('click', function() {
  document.querySelectorAll('.card-obzor').forEach(function(eventCard) {
    eventCard.classList.toggle("card_active");
  });
});

// Скрипт появления скрытия окна войти / зарегистрироваться
$(".btn_acc").click(function () {
  $(".modal-wrap_acc").addClass("display-flex");
  $(".modal-window_acc").addClass("display-flex");
  var tab = $(".tabs_acc > .tab_acc");
  tab.hide().filter(":first").show();

  $(".tabs-nav_acc a")
    .click(function () {
      tab.hide();
      tab.filter(this.hash).show();
      $(".tabs .tabs-nav_acc a").removeClass("active");
      $(this).addClass("active");
      return false;
    })
    .filter(":first")
    .click();
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
  var tab = $(".tabs-items > div");
  tab.hide().filter(":first").show();
  $(".tabs-nav a").filter(":first").addClass("active");
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
// Скрипт редактирования места
$(".user-actions_red").click(function () {
  // Заменяем все .place__input на input
  var i,
    list = document.querySelectorAll(".place__input");
  for (i = 0; i < list.length; ++i) {
    list[i].outerHTML =
      "<input type='text' name='" +
      list[i].getAttribute("name") +
      "' class=' mb-10 place__input_active' value='" +
      list[i].innerHTML.trim() +
      "' />";
  }

  // Заменяем все .text__descr на textarea
  list = document.querySelectorAll(".text__descr");
  for (i = 0; i < list.length; ++i) {
    var textAr = list[i].innerHTML.trim();
    list[i].outerHTML =
      "<textarea class='input-descr mb-20' type='text' name='descr' required>" +
      textAr +
      "</textarea>";
  }

  list = document.querySelectorAll(".text__descr");
  for (i = 0; i < list.length; ++i) {
    var textAr = list[i].innerHTML.trim();
    list[i].outerHTML =
      "<textarea class='input-descr mb-20' type='text' name='descr' required>" +
      textAr +
      "</textarea>";
  }

  $(".place__info-prew").addClass("flex");

  // Добавляем кнопку определения координат
  $(
    '<button type="button" class="find-me btn btn-info btn-block">Мои координаты</button>'
  ).insertAfter('input[name="coord"]');

  // Добавляем поле для вставки фото
  $(
    '<label class="flex flex-col flex-cen label-load mb-20" id="dropbox"><i class="material-icons" style="font-size: 40px">attach_file</i><span class="text_cen text_small">Выберите / Перетащите свои файлы</span><input class="" type="file" class="addImages" id="addImages" multiple=""></label> <ul class="flex upload-img__container" class="uploadImagesList" id="uploadImagesList"><li class="item template"><span class="img-wrap"><img src="" class="img-upl" alt=""><input type="hidden" name="img"></span><button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button></li></ul>'
  ).insertAfter(".place__content");

  $(
    '<button class="text_midi btn btn_add-place swap-search" id="save_edit" type="button">Сохранить</button> <button class="btn btn_add-place btn_cancel" type="submit">Отменить</button>'
  ).insertAfter(".upload-img__container");

  // Добавляем форму на страницу
  $(".section_place").prepend(
    '<form method="post" name="edit" class="container add-form"></form>'
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
      new_imgs.push(event.target.result);
      queue[file.name] = file;
    });
    reader.readAsDataURL(file);
  }

  // Удаление фотографий
  imagesList.on("click", ".delete-link", function () {
    var item = $(this).closest(".item"),
      id = item.data("id");
    if ($(this).parent().find(".img-upl").hasClass("new-upload")) {
      for (i = 0; i < new_imgs.length; i++) {
        if (
          new_imgs[i]["name"] ==
          $(this).parent().find(".new-upload")[0].getAttribute("value")
        ) {
          new_imgs.splice(i, 1);
        }
      }
    } else {
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
  $("#save_edit").click(function () {
    var formi = new FormData(document.forms.edit);
    $.ajax({
      type: "POST",
      url: "edit_place.php",
      data: {
        name: formi.get("placename"),
        address: formi.get("address"),
        coord: formi.get("coord"),
        descr: formi.get("descr"),
        hashtag: formi.get("hashtag"),
        addimg: new_imgs,
        delimg: del_imgs,
        id_place: formi.get("id_place"),
      },
      success: function (result) {
        location.reload();
      },
    });
  });
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

// if(Webcam){

// Webcam.set({
//     width: 320,
//     height: 240,
//     image_format: 'jpeg',
//     jpeg_quality: 90
// });
// Webcam.attach( '#my_camera' );


// const btn = document.querySelector('#btn-snap');

// btn.addEventListener('click', () => {
//    take_snapshot();
// })

// function take_snapshot() {
//     // take snapshot and get image data
//     Webcam.snap( function(data_uri) {
//         // display results in page
//         document.getElementById('results').innerHTML =
//             `<h2>Here is your image:</h2>
//             <img src="${data_uri}"/>`;
//     } );
// }
//   function error({ message }) {
//     console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
//   }
// }

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
$("#btn_add").click(function () {
  var formi = new FormData(document.forms.formadd);
  $("#add_msg").removeClass("display-none");
  $.ajax({
    type: "POST",
    url: "send_place.php",
    data: {
      name: formi.get("placename"),
      address: formi.get("address"),
      coord: formi.get("coord"),
      descr: formi.get("descr"),
      hashtag: formi.get("hashtag"),
      addimg: new_imgs
    },
    success: function (result) {
      //location.reload();
      console.log(result);
      $("#add_msg").text("Отправлено!");
      document.location.href = "index.php";
    },
  });
});
$(".user-actions_repost").click(function(){
  var url = new URL(window.location.href);
  var idPlace = url.searchParams.get("place");
  $.ajax({
    type: "POST",
    url: "repost.php",
    data: { place: idPlace },
    success: function (result) {
      console.log(result);
    },
  });

})