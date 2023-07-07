$(document).ready(function () {
    $("#popupSelectAula").hide();
    $("#popupLogin").hide();
});

function fadeOutPopupSelectAula() {
    $('#popupSelectAula').fadeOut(1000);

}

function fadeInPopupSelectAula() {
    $('#popupSelectAula').fadeIn(1000);

}

function fadeInPopupLogin() {
    $("#popupLogin").fadeIn(800);
}

function fadeOutPopupLogin() {
    $("#popupLogin").fadeOut(800);
}



