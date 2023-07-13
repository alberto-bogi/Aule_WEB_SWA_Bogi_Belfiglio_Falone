$(document).ready(function () {
    $("#export_eventi_div").empty();
    $("#login_div").empty();
    $("#container").empty();

    function firstPageClient() {


        let container_div =
                '<div class="cerca">' +
                '<div class="container">' +
                '<div class="five columns">' +
                '<p>Evento:</p>' +
                '<form action="get" id="search_evento">' +
                '<label>' +
                ' <img src="images/search.png" alt="icona_search" />' +
                '<input type="text" name="searchEvento" placeholder="nome evento..." />' +
                '<button type="button" onclick="showEventInformationsByName()">cerca</button>' +
                '</label>' +
                '</form>' +
                '</div>' +
                '<div class="five columns">' +
                '<p>Aula:</p>' +
                '<form action="get" id="search_aula">' +
                '<label>' +
                '<img src="images/search.png" alt="icona_search" />' +
                '<input type="text" id="aula" placeholder="nome aula..." />' +
                '<button type="button" onclick="showAulaInformationsByName()">cerca</button>' +
                '</label>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="auleweb">' +
                '</div>';

        //Riempiamo
        let export_eventi_div =
                '<div class="export">' +
                '<button type="button" onclick="myFunction()">' +
                '<img src="images/calendar.png" alt="calendar">' +
                '</button>' +
                '</div>';
        let login_div = '<button type="button" id="button_login" onclick="fadeInPopupLogin()">LOGIN</button>';

        $("#export_eventi_div").append(export_eventi_div);
        $("#login_div").append(login_div);
        $("#container").append(container_div);


    }

    function firstPageAdmin() {
        //Riempiamo
        let container =
                '<div class="container">' +
                '<div class="ten columns">' +
                '<div class="administration">' +
                '<h3>EVENTI</h3>' +
                '<label>' +
                '<img src="images/search.png" alt="icona_search" />' +
                '<input type="text" oninput="dynamicSearchEvent(this)" placeholder="ricerca evento..." />' +
                ' | ' +
                '<button type="button" onclick="insertOrModifyEvent()">inserisci</button>' +
                '</label>' +
                '<div id="eventi_administration">' +
                '</div>' +
                '<h3>AULE</h3>' +
                '<label>' +
                '<img src="images/search.png" alt="icona_search" />' +
                '<input type="text" oninput="dynamicSearchAula(this)" placeholder="ricerca aula..." />' +
                ' | ' +
                '<button type="button" onclick="insertAula()">inserisci</button>' +
                '</label>' +
                '<div id="aule_administration">' +
                '</div>' +
                '</div>' +
                '</div>';
        let login_div = '<button type="button" id="button_logout" onclick="logout()">LOGOUT</button>';
        $("#login_div").append(login_div);
        $("#container").empty().append(container);

    }

    if (sessionStorage.getItem("authToken") === null) {
        firstPageClient();
        getCurrentEventi();

    } else {
        firstPageAdmin();
        getEventiAdministration();
        getAuleAdministration();

    }


});



