//funzione per visualizzazione eventi correnti (eventi attuali e delle prossime 3 ore)
$(document).ready(function () {
getCurrentEventi();

});

function getCurrentEventi() {
    $.ajax({
        url: "rest/eventi",
        method: "GET",
        success: function (response) {
            $("#tableEventi").empty();
            let tableCurrentEventi = "<table><tr><td>nome</td><td>aula</td><td>orario</td><td></td></tr>";
            Object.keys(response).forEach(function (key) {
                let evento = response[key];
                tableCurrentEventi += "<tr>" +
                        "<td>" + evento["nome"] + "</td>" +
                        "<td>" + evento["aula"] + "</td>" +
                        "<td>" + evento["ora_inizio"] + " - " + evento["ora_fine"] + "</td>" +
                        "</tr>";
            });
            tableCurrentEventi += "</table>";
            $("#tableEventi").append(tableCurrentEventi);
        },
        error: function (xhr, status, error) {
            // Si è verificato un errore durante la richiesta
            
        }
    });
}

//funzione per evento specifico
function getEvento(id) {
    alert(url);
    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
            // La richiesta è stata completata con successo
            let tableCurrentEvent = "<table>";
            for (let i = 0; i < response.length; i++) {
                getEvento(response[i]);
            }
        },
        error: function (xhr, status, error) {
            // Si è verificato un errore durante la richiesta
            errorCallback(xhr, status, error);
        }
    });
}





