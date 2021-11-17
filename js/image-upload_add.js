var new_imgs = [];
var del_imgs = [];

var btnAdd = document.querySelectorAll(".btn_add-form")[0];
if (btnAdd) {
  btnAdd.addEventListener("click", upL, false);
}
// Скрипт редактирования места
function upL() {
  // Добавляем форму на страницу
  $(".btn_add").remove();
  $(".btn_add-form").remove();
  var count = $(".form_place").length;

  var adding =
    '<form action="" class="form_place"> <div class="flex input-box input-box_add"> <input type="text" name="placename" placeholder="Название памятного места" required /> </div> <div class="flex input-box input-box_add"> <input type="text" name="address" placeholder="Адрес" required /> </div> <div class="flex input-box input-box_add input-box_add_short"> <input type="text" name="coord" placeholder="Координаты" required /> <button type="button" class="find-me btn btn-info btn-block"> Мои координаты </button> </div> <div class="flex input-box input-box_add"> <textarea class="input-descr" type="text" name="descr" placeholder="Описание" required ></textarea> </div><label class="flex flex-col flex-cen label-load mb-20" id="dropbox' +
    count +
    '"><i class="material-icons" style="font-size: 40px">attach_file</i> <span class="text_cen text_small">Выберите / Перетащите свои файлы</span> <input class="" type="file" class="addImages" id="addImages' +
    count +
    '" multiple=""> </label> <ul class="flex upload-img__container" id="uploadImagesList' +
    count +
    '"> <li class="item template"> <span class="img-wrap' +
    count +
    '"> <img src="" class="img-upl" alt=""> <input type="hidden" name="img"> </span> <button type="button" class="delete-link" title="Удалить"><img src="images/icons/close.png" alt=""></button> </li> </ul> <div class="flex input-box input-box_add"> <input type="text" name="hashtag" placeholder="#ХэштегМеста" /> </div> <button type="button" class="flex flex-cen btn_add-form mb-20"> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g id="original-icon" fill="#000000"> <path d="M86,6.88c-43.65603,0 -79.12,35.46397 -79.12,79.12c0,43.65603 35.46397,79.12 79.12,79.12c43.65603,0 79.12,-35.46397 79.12,-79.12c0,-43.65603 -35.46397,-79.12 -79.12,-79.12zM86,13.76c39.93779,0 72.24,32.30221 72.24,72.24c0,39.93779 -32.30221,72.24 -72.24,72.24c-39.93779,0 -72.24,-32.30221 -72.24,-72.24c0,-39.93779 32.30221,-72.24 72.24,-72.24zM85.94625,58.43297c-1.89722,0.02966 -3.41223,1.58976 -3.38625,3.48703v20.64h-20.64c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h20.64v20.64c-0.01754,1.24059 0.63425,2.39452 1.7058,3.01993c1.07155,0.62541 2.39684,0.62541 3.46839,0c1.07155,-0.62541 1.72335,-1.77935 1.7058,-3.01993v-20.64h20.64c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058h-20.64v-20.64c0.01273,-0.92983 -0.35149,-1.82522 -1.00967,-2.48214c-0.65819,-0.65692 -1.55427,-1.01942 -2.48408,-1.00489z" ></path> </g> </g> </svg> Добавить ещё одно место </button> <button class="btn btn_add title_small" type="submit">Добавить</button> </form>';

  $(".container_add-place").append(adding);

  //------------------------------
  //СКРИПТ ДЛЯ КАРТИНОК 1
  var queue = {};
  var imagesList = $("#uploadImagesList1");

  var itemPreviewTemplate = imagesList.find(".item.template").clone();
  itemPreviewTemplate.removeClass("template");
  imagesList.find(".item.template").remove();

  $("#addImages1").on("change", function () {
    var files = this.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        alert("Фотография должна быть в формате jpg, png, webp или gif");
        continue;
      }
      preview1(files[i]);
    }

    this.value = "";
  });

  var dropbox;
  dropbox = document.getElementById("dropbox1");

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

    handleFiles1(files);
  }

  function handleFiles1(files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        alert("Фотография должна быть в формате jpg, png, webp или gif");
        continue;
      }

      preview1(files[i]);
    }

    this.value = "";
  }
  // Создание превью
  function preview1(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function (event) {
      var itemPreview = itemPreviewTemplate.clone();

      itemPreview.find(".img-wrap1 img").attr("src", event.target.result);
      // itemPreview.find(".img-wrap1 img").addClass("new-upload");
      // itemPreview.find(".img-wrap1 img")[0].setAttribute("value", file.name);
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

  //Переделаешь функцию)))
  //  $("#save_edit").click(function () {
  //    var formi = new FormData(document.forms.edit);
  //    $.ajax({
  //      type: "POST",
  //      url: "edit_place.php",
  //      data: {
  //        name: formi.get("placename"),
  //        address: formi.get("address"),
  //        coord: formi.get("coord"),
  //        descr: formi.get("descr"),
  //        hashtag: formi.get("hashtag"),
  //        addimg: new_imgs,
  //        delimg: del_imgs,
  //        id_place: formi.get("id_place"),
  //      },
  //      success: function (result) {
  //        location.reload();
  //      },
  //    });
  //  });
  //  $(".place__images").remove();
  //  //------------------------------

  //СКРИПТ ДЛЯ КАРТИНОК 2
  // var queue = {};
  // var imagesList = $("#uploadImagesList2");

  // var itemPreviewTemplate = imagesList.find(".item.template").clone();
  // itemPreviewTemplate.removeClass("template");
  // imagesList.find(".item.template").remove();

  // $("#addImages2").on("change", function () {
  //   var files = this.files;

  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];

  //     if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
  //       alert("Фотография должна быть в формате jpg, png, webp или gif");
  //       continue;
  //     }
  //     preview2(files[i]);
  //   }

  //   this.value = "";
  // });

  // var dropbox;
  // dropbox = document.getElementById("dropbox2");

  // if (dropbox) {
  //   dropbox.addEventListener("dragenter", dragenter, false);
  //   dropbox.addEventListener("dragover", dragover, false);
  //   dropbox.addEventListener("drop", drop, false);
  // }

  // function dragenter(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }

  // function dragover(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }

  // function drop(e) {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   var dt = e.dataTransfer;
  //   var files = dt.files;

  //   handleFiles2(files);
  // }

  // function handleFiles2(files) {
  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];

  //     if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
  //       alert("Фотография должна быть в формате jpg, png, webp или gif");
  //       continue;
  //     }

  //     preview2(files[i]);
  //   }

  //   this.value = "";
  // }
  // // Создание превью
  // function preview2(file) {
  //   var reader = new FileReader();
  //   reader.addEventListener("load", function (event) {
  //     var itemPreview = itemPreviewTemplate.clone();

  //     itemPreview.find(".img-wrap2 img").attr("src", event.target.result);
  //     // itemPreview.find(".img-wrap2 img").addClass("new-upload");
  //     // itemPreview.find(".img-wrap2 img")[0].setAttribute("value", file.name);
  //     itemPreview.data("id", file.name);

  //     imagesList.append(itemPreview);
  //     new_imgs.push(event.target.result);
  //     queue[file.name] = file;
  //   });
  //   reader.readAsDataURL(file);
  // }

  // // Удаление фотографий
  // imagesList.on("click", ".delete-link", function () {
  //   var item = $(this).closest(".item"),
  //     id = item.data("id");
  //   if ($(this).parent().find(".img-upl").hasClass("new-upload")) {
  //     for (i = 0; i < new_imgs.length; i++) {
  //       if (
  //         new_imgs[i]["name"] ==
  //         $(this).parent().find(".new-upload")[0].getAttribute("value")
  //       ) {
  //         new_imgs.splice(i, 1);
  //       }
  //     }
  //   } else {
  //     del_imgs.push($(this).parent().find(".img-upl")[0].getAttribute("src"));
  //   }
  //   delete queue[id];

  //   item.remove();
  // });

  // //Переделаешь функцию)))
  // //  $("#save_edit").click(function () {
  // //    var formi = new FormData(document.forms.edit);
  // //    $.ajax({
  // //      type: "POST",
  // //      url: "edit_place.php",
  // //      data: {
  // //        name: formi.get("placename"),
  // //        address: formi.get("address"),
  // //        coord: formi.get("coord"),
  // //        descr: formi.get("descr"),
  // //        hashtag: formi.get("hashtag"),
  // //        addimg: new_imgs,
  // //        delimg: del_imgs,
  // //        id_place: formi.get("id_place"),
  // //      },
  // //      success: function (result) {
  // //        location.reload();
  // //      },
  // //    });
  // //  });
  // //  $(".place__images").remove();
  // //  //------------------------------

  // // //СКРИПТ ДЛЯ КАРТИНОК 3
  // var queue = {};
  // var imagesList = $("#uploadImagesList3");

  // var itemPreviewTemplate = imagesList.find(".item.template").clone();
  // itemPreviewTemplate.removeClass("template");
  // imagesList.find(".item.template").remove();

  // $("#addImages3").on("change", function () {
  //   var files = this.files;

  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];

  //     if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
  //       alert("Фотография должна быть в формате jpg, png, webp или gif");
  //       continue;
  //     }
  //     preview3(files[i]);
  //   }

  //   this.value = "";
  // });

  // var dropbox;
  // dropbox = document.getElementById("dropbox3");

  // if (dropbox) {
  //   dropbox.addEventListener("dragenter", dragenter, false);
  //   dropbox.addEventListener("dragover", dragover, false);
  //   dropbox.addEventListener("drop", drop, false);
  // }

  // function dragenter(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }

  // function dragover(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }

  // function drop(e) {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   var dt = e.dataTransfer;
  //   var files = dt.files;

  //   handleFiles3(files);
  // }

  // function handleFiles3(files) {
  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];

  //     if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
  //       alert("Фотография должна быть в формате jpg, png, webp или gif");
  //       continue;
  //     }

  //     preview1(files[i]);
  //   }

  //   this.value = "";
  // }
  // // Создание превью
  // function preview3(file) {
  //   var reader = new FileReader();
  //   reader.addEventListener("load", function (event) {
  //     var itemPreview = itemPreviewTemplate.clone();

  //     itemPreview.find(".img-wrap3 img").attr("src", event.target.result);
  //     // itemPreview.find(".img-wrap1 img").addClass("new-upload");
  //     // itemPreview.find(".img-wrap1 img")[0].setAttribute("value", file.name);
  //     itemPreview.data("id", file.name);

  //     imagesList.append(itemPreview);
  //     new_imgs.push(event.target.result);
  //     queue[file.name] = file;
  //   });
  //   reader.readAsDataURL(file);
  // }

  // // Удаление фотографий
  // imagesList.on("click", ".delete-link", function () {
  //   var item = $(this).closest(".item"),
  //     id = item.data("id");
  //   if ($(this).parent().find(".img-upl").hasClass("new-upload")) {
  //     for (i = 0; i < new_imgs.length; i++) {
  //       if (
  //         new_imgs[i]["name"] ==
  //         $(this).parent().find(".new-upload")[0].getAttribute("value")
  //       ) {
  //         new_imgs.splice(i, 1);
  //       }
  //     }
  //   } else {
  //     del_imgs.push($(this).parent().find(".img-upl")[0].getAttribute("src"));
  //   }
  //   delete queue[id];

  //   item.remove();
  // });

  //Переделаешь функцию)))
  //  $("#save_edit").click(function () {
  //    var formi = new FormData(document.forms.edit);
  //    $.ajax({
  //      type: "POST",
  //      url: "edit_place.php",
  //      data: {
  //        name: formi.get("placename"),
  //        address: formi.get("address"),
  //        coord: formi.get("coord"),
  //        descr: formi.get("descr"),
  //        hashtag: formi.get("hashtag"),
  //        addimg: new_imgs,
  //        delimg: del_imgs,
  //        id_place: formi.get("id_place"),
  //      },
  //      success: function (result) {
  //        location.reload();
  //      },
  //    });
  //  });
  //  $(".place__images").remove();
  //  //------------------------------
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
  var btnAdd = document.querySelectorAll(".btn_add-form")[0];
  if (btnAdd) {
    btnAdd.addEventListener("click", upL, false);
  }
}
