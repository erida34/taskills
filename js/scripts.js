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

// Превью фотографии при добавлении

$(".uploaded-file").on("change", function () {
    getFileParam();
    $(".footer").css({ "margin-top": "5vh" });
});

function getFileParam() {
    try {
        var file = document.getElementsByClassName("uploaded-file").item(0).files[0];
        if (file) {
            if (/\.(jpe?g|bmp|gif|png)$/i.test(file.name)) {
                var elPreview = document.getElementById("preview");
                elPreview.innerHTML = "";
                var newImg = document.createElement("img");
                newImg.className = "preview-img";

                if (typeof file.getAsDataURL == "function") {
                    if (file.getAsDataURL().substr(0, 11) == "data:image/") {
                        newImg.setAttribute("src", file.getAsDataURL());
                        elPreview.appendChild(newImg);
                    }
                } else {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            newImg.setAttribute("src", evt.target.result);
                            elPreview.appendChild(newImg);
                        }
                    };

                    var blob;
                    if (file.slice) {
                        blob = file.slice(0, file.size);
                    } else if (file.webkitSlice) {
                        blob = file.webkitSlice(0, file.size);
                    } else if (file.mozSlice) {
                        blob = file.mozSlice(0, file.size);
                    }
                    reader.readAsDataURL(blob);
                }
            }
        }
    } catch (e) {
        alert("file3");
        var file = document.getElementsByClassName("uploaded-file").item(0).value;
        file = file.replace(/\\/g, "/").split("/").pop();
        document.getElementById("file-name").innerHTML = file;
    }
}
