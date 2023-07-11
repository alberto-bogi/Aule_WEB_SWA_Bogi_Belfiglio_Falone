$(document).ready(function () {
    if (sessionStorage.getItem("ID_evento") !== null){
        showEventInformations(sessionStorage.getItem("ID_evento"));
        sessionStorage.removeItem("ID_evento");
    }
    
    getEventiAdministration();
    getAuleAdministration();



});

//FUNZIONI PER EVENTI LATO AMMINISTRATIVO
function getEventiAdministration() {
    $.ajax({
        url: "rest/eventi",
        method: "GET",
        success: function (response) {
            $("#eventi_administration").empty();
            let tableEventi = "<table><thead><tr><th>NOME</th><th>AULA</th><th>RESPONSABILE</th><th>TIPO</th><th>DETTAGLIO</th></tr></thead><tbody>";
            Object.keys(response).forEach(function (key) {
                let evento = response[key];
                tableEventi += "<tr>" +
                        "<td>" + evento["nome"] + "</td>" +
                        "<td>" + evento["aula"] + '</td>' +
                        "<td>" + evento["responsabile"] + "</td>" +
                        "<td>" + evento["tipo"] + "</td>" +
                        '<td><button type="button" name="ID_evento" value="' + key + '" onclick="showEventInformations(this.value)" >vedi</button></td>' +
                        "</tr>";
            });
            tableEventi += "</tbody></table>";
            $("#eventi_administration").append(tableEventi);
            let div_eventi = document.getElementById("eventi_administration");
            let table = div_eventi.querySelector('table');
            let thElements = table.querySelectorAll('th');
            thElements.forEach(function (thElement) {
                thElement.style.width = thElement.offsetWidth + 'px';
            });
        },
        error: function (xhr) {
            $("#eventi_administration").append(xhr.responseText);

        }
    });
}

function dynamicSearchEvent(input) {
    let search = input.value;
    if (!search) {
        getEventiAdministration();
    } else {
        $.ajax({
            url: "rest/eventi/" + search + "/dynamic",
            method: "GET",
            success: function (response) {
                $("#eventi_administration").empty();
                let tableEventi = "<table><tr><th>NOME</th><th>AULA</th><th>RESPONSABILE</th><th>TIPO</th><th>DETTAGLIO</th></tr>";
                Object.keys(response).forEach(function (key) {
                    let evento = response[key];
                    tableEventi += "<tr>" +
                            "<td>" + evento["nome"] + "</td>" +
                            "<td>" + evento["aula"] + "</td>" +
                            "<td>" + evento["responsabile"] + '</td>' +
                            "<td>" + evento["tipo"] + "</td>" +
                            '<td><button type="button" name="ID_evento" value="' + key + '" onclick="showEventInformations(this.value)" >vedi</button></td>' +
                            "</tr>";
                });
                tableEventi += "</table>";
                $("#eventi_administration").append(tableEventi);
            },
            error: function (xhr) {
                $("#eventi_administration").append(xhr.responseText);
            }
        });
    }
}

function insertOrModifyEvent(id) {
    //////svuotiamo il container totale per inserire la form dell'evento
    let form = "";
    form +=
            '<div class="form event">' +
            '<div class="container">' +
            '<div class="ten columns">' +
            '<h3>FORM EVENTO</h3>' +
            '<button type="button" onclick="">annulla</button><br>' +
            '<label for="nome">nome:</label>' +
            '<input type="text" name="nome" id="nome" oninput="validateEventsInputs()" />' +
            '<br>' +
            '<label for="data_evento">data:</label>' +
            '<input type="date" name="data" id="data_evento" onchange="validateEventsInputs(), verifyCorrectnessTimeEvento()"/>' +
            '<br>' +
            '<label for="ora_inizio">ora inizio:</label>' +
            '<input type="time" step="900" name="ora_inizio" class="orario" id="ora_inizio" onchange="validateEventsInputs(), verifyCorrectnessTimeEvento()"/>' +
            '<br>' +
            '<label for="ora_fine">ora fine:</label>' +
            '<input type="time" step="900" name="ora_fine" class="orario" id="ora_fine" onchange="validateEventsInputs(), verifyCorrectnessTimeEvento()"/>' +
            '<br>' +
            '<label for="descrizione">descrizione:</label><br>' +
            '<textarea name="descrizione" id="descrizione" oninput="validateEventsInputs()"></textarea>' +
            '<br>' +
            '<h4>TIPOLOGIA</h4>' +
            '<table><th></th><th>NOME</th>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="1" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>LEZIONE</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="2" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>ESAME</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="3" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>PARZIALE</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="4" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>SEMINARIO</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="5" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>RIUNIONE</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="6" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>LAUREA</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="tipologia" value="7" onchange="showCorsi(); validateEventsInputs()"/></td>' +
            '<td>ALTRO</td>' +
            '</tr>' +
            '</table>' +
            '<div id="corso" style="display:none">' +
            '</div>' +
            '<div id="request_time_input" style="display:none">' +
            '<p>Attenzione. verificare che:</p>' +
            '<ul>' +
            '<li>La data inserita sia almeno la data odierna</li>' +
            '<li>In caso di data odierna, l\'orario di inizio non sia inferiore a quello attuale</li>' +
            '<li>In caso di date successive, l\'orario di inizio sia inferiore a quello di fine</li>' +
            '<li>L\'orario sia inserito con scarti di 15 minuti</li>' +
            '</ul>' +
            '</div>' +
            '<h4>RICORRENZA</h4>' +
            '<table><th></th><th>FREQUENZA</th>' +
            '<tr>' +
            '<td><input type="radio" name="ricorrenza" class="ricorrenza" value="1" onchange="showFineRicorrenza(); validateEventsInputs()"/></td>' +
            '<td>GIORNALIERA</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="ricorrenza" class="ricorrenza" value="2" onchange="showFineRicorrenza(); validateEventsInputs()"/></td>' +
            '<td>SETTIMANALE</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="ricorrenza" class="ricorrenza" value="3" onchange="showFineRicorrenza(); validateEventsInputs()"/></td>' +
            '<td>MENSILE</td>' +
            '</tr>' +
            '<tr>' +
            '<td><input type="radio" name="ricorrenza" class="ricorrenza" value="4" onchange="showFineRicorrenza(); validateEventsInputs()"/></td>' +
            '<td>NESSUNA</td>' +
            '</tr>' +
            '</table>' +
            '<div id="fine_ricorrenza" style="display:none">' +
            '<label>segnare la data di fine ricorrenza</label>' +
            '<input type="date" id="data_ricorrenza" name="fine_ricorrenza" onchange="validateEventsInputs()" />' +
            '</div>' +
            '<h4>RESPONSABILI</h4>' +
            '<div id="responsabile"></div>' +
            '<h4>AULA</h4>' +
            '<div id="aula"></div>' +
            '<div id="button_operation_event"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
    $("#container").empty().append(form);

    if (!id) {
        let button = '<button type="button" id="button_event" onclick="insertNewEvento()"disabled>inserisci</button>';
        $("#button_operation_event").empty().append(button);
        fillResponsabiliTable();
        fillAuleTable();
        fillCorsiTable();
    } else {
        $("button_operation_event").empty().append('<button type="button" id="button_event" onclick="modifyEvento()">modifica</button>');
        fillFormEvent(id);
    }

}



//FUNZIONI PER AULE LATO AMMINISTRATIVO
function getAuleAdministration()
{
    $.ajax({
        url: "rest/aule",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        success: function (response) {
            $("#aule_administration").empty();
            let tableAule = "<table><tr><th>NOME</th><th>RESPONSABILE</th><th>LUOGO</th><th>DETTAGLIO</th></tr>";
            Object.keys(response).forEach(function (key) {
                let aula = response[key];
                tableAule += "<tbody><tr>" +
                        "<td>" + aula["nome"] + "</td>" +
                        "<td>" + aula["responsabile"] + '</td>' +
                        "<td>" + aula["luogo"] + "</td>" +
                        '<td><button type="button" name="ID_aula" value="' + key + '" onclick="showAulaInformationsById(this.value)" >vedi</button></td>' +
                        "</tr>";
            });
            tableAule += "</tbody></table>";
            $("#aule_administration").append(tableAule);
        },
        error: function (xhr) {
            $("#aule_administration").append(xhr.responseText);
        }
    });
}


function dynamicSearchAula(input) {
    let search = input.value;
    if (!search) {
        getAuleAdministration();
    } else {
        $.ajax({
            url: "rest/aule/" + search + "/dynamic",
            method: "GET",
            success: function (response) {
                $("#aule_administration").empty();
                let tableAule = "<table><tr><th>NOME</th><th>RESPONSABILE</th><th>LUOGO</th><th>DETTAGLIO</th></tr>";
                Object.keys(response).forEach(function (key) {
                    let aula = response[key];
                    tableAule += "<tr>" +
                            "<td>" + aula["nome"] + "</td>" +
                            "<td>" + aula["responsabile"] + '</td>' +
                            "<td>" + aula["luogo"] + "</td>" +
                            '<td><button type="button" name="ID_evento" value="' + key + '" onclick="showAulaInformationsById(this.value)" >vedi</button></td>' +
                            "</tr>";
                });
                tableAule += "</table>";
                $("#aule_administration").append(tableAule);
            },
            error: function (xhr) {

            }
        });
    }
}



