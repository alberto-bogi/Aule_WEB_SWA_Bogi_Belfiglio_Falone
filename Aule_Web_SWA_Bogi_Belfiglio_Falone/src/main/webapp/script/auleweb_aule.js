$(document).ready(function(){
    $("#popupSelectAula").hide();
    $("#popupLogin").hide();
});

function fadeOutPopupSelectAula() {
    $('#popupSelectAula').fadeOut(1000);

}

function fadeInPopupSelectAula() {
    $('#popupSelectAula').fadeIn(1000);

}

function showLogin(){
    $("#popupLogin").fadeToggle(1000);
}




