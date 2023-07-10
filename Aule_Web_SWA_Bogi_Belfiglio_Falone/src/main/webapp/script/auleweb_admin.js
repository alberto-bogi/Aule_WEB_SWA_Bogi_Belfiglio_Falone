$(document).ready(function () {
    getEventiAdministration();
    getAuleAdministration();
});

//FUNZIONI PER EVENTI LATO AMMINISTRATIVO
function getEventiAdministration() {
    $.ajax({
        url: "rest/eventi",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        success: function (response) {
            $("#eventi_administration").empty();
            let tableEventi = "<table><tr><th>NOME</th><th>AULA</th><th>RESPONSABILE</th><th>TIPO</th><th>DETTAGLIO</th></tr>";
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
            tableEventi += "</table>";
            $("#eventi_administration").append(tableEventi);
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
            '<h3>FORM EVENTO</h3>' +
            '<div class="formEvent">' +
            '<div class="container">' +
            '<div class="ten columns">' +
            '<button type="button" onclick="">annulla</button><br>' +
            '<label for="input1Ev">nome:</label>' +
            '<input type="text" name="nome" id="input_evento_1" oninput="validateEventsInputs(1)" />' +
            '<br>' +
            '<label for="input4Ev">data:</label>' +
            '<input type="date" name="data" id="input_evento_3" oninput="validateEventsInputs(1), verifyCorrectnessTimeEvento(1)"/>' +
            '<br>' +
            '<label for="input5Ev">ora inizio:</label>' +
            '<input type="time" step="900" name="ora_inizio" class="orario" id="input_evento_4" oninput="validateEventsInputs(1), verifyCorrectnessTimeEvento(1)"/>' +
            '<br>' +
            '<label for="input6Ev">ora fine:</label>' +
            '<input type="time" step="900" name="ora_fine" class="orario" id="input_evento_5" oninput="validateEventsInputs(1), verifyCorrectnessTimeEvento(1)"/>' +
            '<br>' +
            '<label for="input2Ev">descrizione:</label><br>' +
            '<textarea name="descrizione" id="input_evento_2" oninput="validateEventsInputs(1)"></textarea>' +
            '<br>' +
            '<h4>TIPOLOGIA</h4>' +
            '<input type="radio" name="tipologia" value="1" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>LEZIONE</label><br>' +
            '<input type="radio" name="tipologia" value="2" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>ESAME</label><br>' +
            '<input type="radio" name="tipologia" value="3" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>PARZIALE</label><br>' +
            '<input type="radio" name="tipologia" value="4" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>SEMINARIO</label><br>' +
            '<input type="radio" name="tipologia" value="5" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>RIUNIONE</label><br>' +
            '<input type="radio" name="tipologia" value="6" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>LAUREA</label><br>' +
            '<input type="radio" name="tipologia" value="7" onchange="showExtendedEventForm(this.value); validateEventsInputs(1)"/>' +
            '<label>ALTRO</label><br>' +
            '<div id="corsi_evento" style="display:none">' +
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
            '<h4>Ricorrenza</h4>' +
            '<input type="radio" name="ricorrenza" class="ricorrenza" value="1" onchange="showFineRicorrenza(1); validateEventsInputs(1)"/></td>' +
            '<label>GIORNALIERA</label><br>' +
            '<input type="radio" name="ricorrenza" class="ricorrenza" value="2" onchange="showFineRicorrenza(1); validateEventsInputs(1)"/></td>' +
            '<label>SETTIMANALE</label><br>' +
            '<input type="radio" name="ricorrenza" class="ricorrenza" value="3" onchange="showFineRicorrenza(1); validateEventsInputs(1)"/></td>' +
            '<label>MENSILE</label><br>' +
            '<input type="radio" name="ricorrenza" class="ricorrenza" value="4" onchange="showFineRicorrenza(1); validateEventsInputs(1)"/></td>' +
            '<label>NESSUNA</label><br>' +
            '<div id="fine_ricorrenza" style="display:none">' +
            '</div>' +
            '<h4>RESPONSABILI</h4>' +
            '<div id="responsabile"></div>' +
            '<h4>AULA</h4>' +
            '<div id="aula"></div>' +
            '<h4>ATTREZZATURA</h4>' +
            '<div id="attrezzatura"></div>' +
            '<div id="button_operation_event"></div>' +
            '</div>' + 
            '</div>' + 
            '</div>';
    $("#container").empty().append(form);
    
    if(!id){
        $("button_operation_event").empty().append('<button type="button" onclick="inserNewEvent()>inserisci</button>');
        fillResponsabiliTable();
        //fillAuleTable();
        //fillAttrezzatureTable();
    }else{
        $("button_operation_event").empty().append('<button type="button" onclick="modifyEvent()>modifica</button>');
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
                tableAule += "<tr>" +
                        "<td>" + aula["nome"] + "</td>" +
                        "<td>" + aula["responsabile"] + '</td>' +
                        "<td>" + aula["luogo"] + "</td>" +
                        '<td><button type="button" name="ID_aula" value="' + key + '" onclick="showAulaInformationsById(this.value)" >vedi</button></td>' +
                        "</tr>";
            });
            tableAule += "</table>";
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



