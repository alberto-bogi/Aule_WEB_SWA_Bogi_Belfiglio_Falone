//funzione per visualizzazione eventi correnti (eventi attuali e delle prossime 3 ore)
$(document).ready(function () {
    $("#popupEvento").hide();
    

});

function getCurrentEventi() {
    $.ajax({
        url: "rest/eventi/current",
        method: "GET",
        success: function (response) {
            $("#auleweb").empty();
            let tableCurrentEventi = "<h3>EVENTI CORRENTI</h3><table><tr><th>NOME</th><th>AULA</th><th>ORARIO</th><th>DETTAGLIO</th></tr>";
            Object.keys(response).forEach(function (key) {
                let evento = response[key];
                tableCurrentEventi += "<tr>" +
                        "<td>" + evento["nome"] + "</td>" +
                        "<td>" + evento["aula"] + ' <span class="aula" onclick="showAulaInformationsById(' + evento["id_aula"] + ')">(mostra altro)</span></td>' +
                        "<td>" + evento["ora_inizio"] + " - " + evento["ora_fine"] + "</td>" +
                        '<td><button type="button" name="ID_evento" value="' + key + '" onclick="showEventInformations(this.value)" >vedi</button></td>' +
                        "</tr>";
            });
            tableCurrentEventi += "</table>";
            $("#auleweb").append(tableCurrentEventi);
        },
        error: function (xhr, status, error) {
            // Si è verificato un errore durante la richiesta

        }
    });
}

//funzione per visualizzazione informazioni evento
function showEventInformations(id) {
    $.ajax({
        url: "rest/eventi/" + id,
        method: "GET",
        success: function (response) {
            $("#popupEvento").empty();
            let eventContent =
                    '<div class="exit">' +
                    '<button type="button" onclick="fadeOutPopupEvento()">X</button>' +
                    '</div>' +
                    '<div class="container">' +
                    '<div class="ten columns">' +
                    '<h2>INFORMAZIONI</h2>';
            if(sessionStorage.getItem("authToken") !== null){
                eventContent += '<button type="button" value="' + id + '" onclick="insertOrModifyEvent(this.value)">modifica</button>';
            }
            eventContent +=
                    "<p><b>NOME</b>: " + response["nome"].toLowerCase() + "</p>" +
                    "<p><b>DATA</b>: " + response["data"] + "</p>" +
                    "<p><b>INTERVALLO</b>: " + response["ora_inizio"] + " - " + response["ora_fine"] + "</p>" +
                    "<p><b>AULA</b>: " + response["aula"].toLowerCase() + "</p>" +
                    "<p><b>RESPONSABILE</b>: " + response["responsabile"].toLowerCase() + "</p>" +
                    "<p><b>TIPOLOGIA</b>: " + response["tipo"].toLowerCase() + "</p>";
            if (response["tipo"] === "LEZIONE" || response["tipo"] === "ESAME" || response["tipo"] === "PARZIALE") {
                eventContent += "<p><b>CORSO</b>: " + response["corso"].toLowerCase() + "</p>";
            }
            eventContent += "<p><b>RICORRENZA</b>: " + response["ricorrenza"].toLowerCase() + "</p>";
            if (response["ricorrenza"] !== "NESSUNA") {
                eventContent += "<p><b>INTERVALLO RICORRENZA</b>: dal " + response["data"] + " al " + response["data_ricorrenza"] + "</p>";
            }
            eventContent += "</div></div>";

            $("#popupEvento").append(eventContent);
            $("#popupEvento").fadeIn(1000);
        },
        error: function (xhr, status, error) {
            
        }
    });
}

function showEventiFormByAulaId(id) {
    $("#auleweb").empty();
    $.ajax({
        url: "rest/aule/" + id,
        method: "GET",
        success: function (response) {
            let contentForm =
                    '<div class="eventi correnti">' +
                    '<label>vedi gli eventi attuali: </label>' +
                    '<button type="button" id="currentEventButton" onclick="getCurrentEventi()">cerca</button> ' +
                    '</div>' +
                    '<h3>AULA ' + response["nome"].toUpperCase() + '</h3>' +
                    '<form id="eventi_aula" method="GET">' +
                    '<input type="week" id="aula_week" onchange="showEventiByAulaAndWeek()"/>' +
                    '<input type="hidden" id="id_aula" value ="' + id + '" />' +
                    '</form>' +
                    '<div id="table_eventi_aula"></div>';
            $("#popupAula").hide();
            $("#auleweb").append(contentForm);

        }
    });


}


function showEventiByAulaAndWeek() {
    let form = document.getElementById("eventi_aula");
    let id = form.elements["id_aula"].value;
    let week = form.elements["aula_week"].value;
    $.ajax({
        url: "rest/eventi/" + id + "/" + week,
        method: "GET",
        success: function (response) {
            $("#table_eventi_aula").empty();
            let tableAulaEventi = "<table><tr><th>NOME</th><th>DATA</th><th>ORARIO</th><th>RESPONSABILE</th><th>DETTAGLIO</th></tr>";
            Object.keys(response).forEach(function (key) {
                let evento = response[key];
                tableAulaEventi += "<tr>" +
                        "<td>" + evento["nome"] + "</td>" +
                        "<td>" + evento["data"] +
                        "<td>" + evento["ora_inizio"] + " - " + evento["ora_fine"] + "</td>" +
                        "<td>" + evento["responsabile"] + '</td>' +
                        '<td><button type="button" name="ID_evento" value="' + evento["ID_evento"] + '" onclick="showEventInformations(this.value)" >vedi</button></td>' +
                        "</tr>";
            });
            tableAulaEventi += "</table>";
            $("#table_eventi_aula").append(tableAulaEventi);
        },
        error: function (xhr, status, error) {
            $("#table_eventi_aula").append(xhr.responseText);


        }
    });
}


function fadeOutPopupEvento() {
    $('#popupEvento').fadeOut(1000);

}

function showEventInformationsByName() {
    let form = document.getElementById("search_evento");
    let search = form.elements["searchEvento"].value;
    let sanitizedSearch = search.replace(/[<>"'=()*!?]/g, '');

    $.ajax({
        url: "rest/eventi/" + sanitizedSearch,
        method: "GET",
        success: function (response) {
            if (Object.keys(response).length > 0) {
                $("#popupEvento").empty();
                let eventContent =
                        '<div>' +
                        '<div class="exit">' +
                        '<button type="button" onclick="fadeOutPopupEvento()">X</button>' +
                        '</div>' +
                        '<h2  style="clear: right">INFORMAZIONI</h2>' +
                        "<p><b>NOME:</b> " + response["nome"].toLowerCase() + "</p>" +
                        "<p><b>DATA:</b> " + response["data"] + "</p>" +
                        "<p><b>INTERVALLO:</b> " + response["ora_inizio"] + " - " + response["ora_fine"] + "</p>" +
                        "<p><b>AULA:</b> " + response["aula"].toLowerCase() + "</p>" +
                        "<p><b>RESPONSABILE:</b> " + response["responsabile"].toLowerCase() + "</p>" +
                        "<p><b>TIPOLOGIA:</b> " + response["tipo"].toLowerCase() + "</p>";
                if (response["tipo"] === "LEZIONE" || response["tipo"] === "ESAME" || response["tipo"] === "PARZIALE") {
                    eventContent += "<p><b>CORSO:</b> " + response["corso"].toLowerCase() + "</p>";
                }
                eventContent += "<p><b>RICORRENZA:</b> " + response["ricorrenza"].toLowerCase() + "</p>";
                if (response["ricorrenza"] !== "NESSUNA") {
                    eventContent += "<p><b>INTERVALLO RICORRENZA:</b> " + response["data"] + " - " + response["data_ricorrenza"] + "</p>";
                }

                $("#popupEvento").append(eventContent);
                $("#popupEvento").fadeIn(1000);
            } else {
                $("#popupEvento").empty();
                let eventContent =
                        '<div>' +
                        '<div class="exit">' +
                        '<button type="button" onclick="fadeOutPopupEvento()">X</button>' +
                        '</div>' +
                        '<h2  style="clear: right;">Evento non trovato</h2>' +
                        '<p class="search null">Non è stato trovato alcun evento con nome <b><em>' + sanitizedSearch + '</b></em></p>' ;
                $("#popupEvento").append(eventContent);
                $("#popupEvento").fadeIn(1000);
            }

        },
        error: function (xhr, status, error) {
            $("#tableEventi").append(xhr.responseText);
            $("#popupEvento").empty();
            let eventContent =
                    '<div>' +
                    '<div class="exit">' +
                    '<button type="button" onclick="fadeOutPopupEvento()">X</button>' +
                    '</div>' +
                    '<h2  style="clear: right; color: red">Evento non trovato</h2>' +
                    '<p>Non sono permessi caratteri speciali per la ricerca di un evento</p>';
            $("#popupEvento").append(eventContent);
            $("#popupEvento").fadeIn(1000);

        }
    });
}






