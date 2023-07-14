

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
            if (sessionStorage.getItem("authToken") !== null) {
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
                    '<button type="button" id="currentEventButton" onclick="getCurrentEventi()">vedi</button> ' +
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
    if (sanitizedSearch) {
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
                            '<p class="search null">Non è stato trovato alcun evento con nome <b><em>' + sanitizedSearch + '</b></em></p>';
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
}

function insertNewEvento() {
    let nome = document.getElementById("nome").value.toUpperCase();
    let data_evento = document.getElementById("data_evento").value;
    let ora_inizio = document.getElementById("ora_inizio").value;
    let ora_fine = document.getElementById("ora_fine").value;
    let descrizione = document.getElementById("descrizione").value.toUpperCase();
    let ricorrenza = document.querySelector('input[type="radio"][name="ricorrenza"]:checked').value;
    let data_ricorrenza;
    if (document.getElementById("data_ricorrenza").value)
        data_ricorrenza = document.getElementById("data_ricorrenza").value;
    else
        data_ricorrenza = "";
    let tipologia = document.querySelector('input[type="radio"][name="tipologia"]:checked').value;
    let responsabileKey = document.querySelector('input[type="radio"][name="responsabile"]:checked').value;
    let aulaKey = document.querySelector('input[type="radio"][name="aula"]:checked').value;
    let corsoKey;
    if (document.querySelector('input[type="radio"][name="corso"]:checked') !== null)
        corsoKey = document.querySelector('input[type="radio"][name="corso"]:checked').value;
    else
        corsoKey = 0;

    let evento = {
        nome: nome,
        data_evento: data_evento,
        ora_inizio: ora_inizio,
        ora_fine: ora_fine,
        descrizione: descrizione,
        ricorrenza: ricorrenza,
        data_ricorrenza: data_ricorrenza,
        tipologia: tipologia,
        id_corso: corsoKey,
        id_aula: aulaKey,
        id_responsabile: responsabileKey
    };


    $.ajax({
        url: "rest/eventi",
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        contentType: "application/json",
        data: JSON.stringify(evento),
        success: function (data, textStatus, jqXHR) {
            //jqXHR rappresenta l'oggetto jqXHR (XMLHttpRequest) che contiene le informazioni sulla richiesta AJAX
            //come lo stato, gli header, i metodi ausiliari. Può essere utilizzato per accedere a informazioni aggiuntive sulla richiesta
            //Prendiamo la URI che ci indirizza all'oggetto appena creato
            if (jqXHR.status === 201) {
                let uri = jqXHR.getResponseHeader('Location');
                $.ajax({
                    url: uri,
                    method: 'get',
                    success: function (response) {
                        sessionStorage.setItem("ID_evento", response["ID"]);
                        location.reload();

                    }

                });
            }
        },
        error: function (xhr) {
            $("#container").empty().append(xhr.responseText);
        }
    });

}


function modifyEvento(id) {
    let nome = document.getElementById("nome").value.toUpperCase();
    let data_evento = document.getElementById("data_evento").value;
    let ora_inizio = document.getElementById("ora_inizio").value;
    let ora_fine = document.getElementById("ora_fine").value;
    let descrizione = document.getElementById("descrizione").value.toUpperCase();
    let ricorrenza = document.querySelector('input[type="radio"][name="ricorrenza"]:checked').value;
    let data_ricorrenza;
    if (document.getElementById("data_ricorrenza").value)
        data_ricorrenza = document.getElementById("data_ricorrenza").value;
    else
        data_ricorrenza = "";
    let tipologia = document.querySelector('input[type="radio"][name="tipologia"]:checked').value;
    alert(tipologia);
    let responsabileKey = document.querySelector('input[type="radio"][name="responsabile"]:checked').value;
    let aulaKey = document.querySelector('input[type="radio"][name="aula"]:checked').value;
    let corsoKey;
    if (document.querySelector('input[type="radio"][name="corso"]:checked') !== null)
        corsoKey = document.querySelector('input[type="radio"][name="corso"]:checked').value;
    else
        corsoKey = 0;

    alert(corsoKey);
    let evento = {
        nome: nome,
        data_evento: data_evento,
        ora_inizio: ora_inizio,
        ora_fine: ora_fine,
        descrizione: descrizione,
        ricorrenza: ricorrenza,
        data_ricorrenza: data_ricorrenza,
        tipologia: tipologia,
        id_corso: corsoKey,
        id_aula: aulaKey,
        id_responsabile: responsabileKey
    };


    $.ajax({
        url: "rest/eventi/" + id,
        method: "put",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        contentType: "application/json",
        data: JSON.stringify(evento),
        success: function (data, textStatus, jqXHR) {
            //jqXHR rappresenta l'oggetto jqXHR (XMLHttpRequest) che contiene le informazioni sulla richiesta AJAX
            //come lo stato, gli header, i metodi ausiliari. Può essere utilizzato per accedere a informazioni aggiuntive sulla richiesta
            //Prendiamo la URI che ci indirizza all'oggetto appena creato
            if (jqXHR.status === 201) {
                let uri = jqXHR.getResponseHeader('Location');
                $.ajax({
                    url: uri,
                    method: 'get',
                    success: function (response) {
                        sessionStorage.setItem("ID_evento", response["ID"]);
                        location.reload();

                    }

                });
            }
        },
        error: function (xhr) {
            $("#container").empty().append(xhr.responseText);
        }
    });


}


function exportEventiCalendar() {
    let data_inizio = document.getElementById("input_csv_date_1").value;
    let data_fine = document.getElementById("input_csv_date_2").value;

    let periodo = {
        data_inizio: data_inizio,
        data_fine: data_fine
    };

    $.ajax({
        url: "rest/eventi/calendar/export",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(periodo),
        xhrFields: {
            responseType: "blob"
        },
        success: function (response) {
            document.getElementById("input_csv_date_1").value = "";
            document.getElementById("input_csv_date_2").value = "";
            document.getElementById("button_csv_eventi").disabled = true;

            //specifichiamo un url temporaneo che ci servirà per accedere ai dati binari
            let url = window.URL.createObjectURL(new Blob([response]));
            let a = document.createElement('a');
            a.href = url;
            a.download = "eventi.ics";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        },
        error: function (xhr) {
            $("#container").empty().append(xhr.responseText);
        }
    });
}






