// Скрипт появления скрытия кнопки войти / зарегистрироваться

$(".btn_acc").click(function(){
    $(".modal-wrap").css({ display: "flex" });
});

// Скрипт перемещения по табам
$(function () {
    var tab = $(".tabs .tabs-items > div");
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
}); // email check