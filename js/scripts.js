// Скрипт появления скрытия окна войти / зарегистрироваться
$(".btn_acc").click(function () {
    $(".modal-wrap_acc").addClass("display-flex");
    $(".modal-window_acc").addClass("display-flex");
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


