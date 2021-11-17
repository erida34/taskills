var queue = {};
var imagesList = $("#uploadImagesList");

var itemPreviewTemplate = imagesList.find(".item.template").clone();
itemPreviewTemplate.removeClass("template");
imagesList.find(".item.template").remove();

// $("#addImages").on("change", function () {
//   var files = this.files;

//   for (var i = 0; i < files.length; i++) {
//     var file = files[i];

//     if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
//       alert("Фотография должна быть в формате jpg, png, webp или gif");
//       continue;
//     }
//     preview(files[i]);
//   }

//   this.value = "";
// });

document.querySelectorAll(".addImages").forEach((item) => {
  item.addEventListener("change", function () {
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
