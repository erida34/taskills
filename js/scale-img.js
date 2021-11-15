$(document).ready(function () {
    var j = 0;
    $(".imgonclick").click(function () {
        var imgGL = $(this).attr("src");

        if (j == 0) {
            j++;
            $("#imgonGL").attr("src", imgGL);
            $("#clickonGL").css({ "z-index": "299", "background-color": "rgba(0, 0, 0, 0.6)" });
        }
    });
    $("#clickonGL").click(function () {
        if (j == 1) {
            j--;
            $("#clickonGL").css({ "z-index": "-1", "background-color": "rgba(0, 0, 0, 0)" });
            $("#imgonGL").attr("src", "images/alfa-img.png");
        }
    });
});
