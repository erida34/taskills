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
    }
  delete queue[id];

  item.remove();
});


$("#add_btn").click(function () {
  var formi = new FormData(document.forms.formadd);
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
      location.reload();
    },
  });
});