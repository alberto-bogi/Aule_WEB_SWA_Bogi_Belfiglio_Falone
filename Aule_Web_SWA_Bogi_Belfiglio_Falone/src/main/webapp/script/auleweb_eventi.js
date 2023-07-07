//funzione per visualizzazione eventi correnti (eventi attuali e delle prossime 3 ore)
$(document).ready(function () {
    getCurrentEventi();
    $("#popupEvento").hide();

});

function getCurrentEventi() {
    $.ajax({
        url: "rest/eventi",
        method: "GET",
        success: function (response) {
            $("#auleweb").empty();
            let tableCurrentEventi = "<table><tr><th>NOME</th><th>AULA</th><th>ORARIO</th><th>DETTAGLIO</th></tr>";
            Object.keys(response).forEach(function (key) {
                let evento = response[key];
                tableCurrentEventi += "<tr>" +
                        "<td>" + evento["nome"] + "</td>" +
                        "<td>" + evento["aula"] + "</td>" +
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
                    "<h2>INFORMAZIONI</h2>" +
                    "<p>nome: " + response["nome"].toLowerCase() + "</p>" +
                    "<p>data: " + response["data"] + "</p>" +
                    "<p>intervallo: " + response["ora_inizio"] + " - " + response["ora_fine"] + "</p>" +
                    "<p>aula: " + response["aula"].toLowerCase() + "</p>" +
                    "<p>responsabile: " + response["responsabile"].toLowerCase() + "</p>" +
                    "<p>tipologia :" + response["tipo"].toLowerCase() + "</p>";
            if (response["tipo"] === "LEZIONE" || response["tipo"] === "ESAME" || response["tipo"] === "PARZIALE") {
                eventContent += "<p>corso: " + response["corso"].toLowerCase() + "</p>";
            }
            eventContent += "<p>ricorrenza: " + response["ricorrenza"].toLowerCase() + "</p>";
            if (response["ricorrenza"] !== "NESSUNA") {
                eventContent += "<p>intervallo ricorrenza: " + response["data"] + " - " + response["data_ricorrenza"] + "</p>";
            }
            
            $("#popupEvento").append(eventContent);
            $("#popupEvento").fadeIn(1000);
        },
        error: function (xhr, status, error) {
            $("#tableEventi").append(xhr.responseText);
        }
    });
}





