$(document).ready(function () {
    $("#popupAula").hide();
    $("#popupLogin").hide();
});



function showAulaInformationsByName(){
    let form = document.getElementById("search_aula");
    let search = form.elements["aula"].value;
    
    $.ajax({
       url: "rest/aule/" + search,
       method: "GET",
      
    });
}


function fadeOutPopupSelectAula() {
    $('#popupAula').fadeOut(1000);

}


function fadeInPopupLogin() {
    $("#popupLogin").slideDown(300);
}

function fadeOutPopupLogin() {
    $("#popupLogin").slideUp(300);
}



