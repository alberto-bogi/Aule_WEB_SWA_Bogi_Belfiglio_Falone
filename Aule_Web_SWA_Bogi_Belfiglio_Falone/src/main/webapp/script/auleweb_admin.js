$(document).ready(function () {
    if (sessionStorage.getItem("ID_evento") !== null) {
        showEventInformations(sessionStorage.getItem("ID_evento"));
        sessionStorage.removeItem("ID_evento");
    } else if (sessionStorage.getItem("ID_aula") !== null) {
        showAulaInformationsById(sessionStorage.getItem("ID_aula"));
        sessionStorage.removeItem("ID_aula");
    }



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
            '<div id="form_evento" class="form event">' +
            '<div class="container">' +
            '<div class="ten columns">' +
            '<h3>FORM EVENTO</h3>' +
            '<button type="button" onclick="location.reload()">annulla</button><br>' +
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
            '<div id="input_time_error" style="display:none">' +
            '<p>Attenzione. verificare che:</p>' +
            '<ul>' +
            '<li>La data inserita sia almeno la data odierna</li>' +
            '<li>In caso di data odierna, l\'orario di inizio non sia inferiore a quello attuale</li>' +
            '<li>In caso di date successive, l\'orario di inizio sia inferiore a quello di fine</li>' +
            '<li>L\'orario sia inserito con scarti di 15 minuti</li>' +
            '</ul>' +
            '</div><br>' +
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
            '<label>ricerca responsabile: </label>' +
            '<input type="text" oninput="dynamicSearchResponsabile(this)" placeholder="email..." />' +
            '<div id="responsabile"></div>' +
            '<h4>AULA</h4>' +
            '<label>ricerca aula: </label>' +
            '<input type="text" oninput="dynamicSearchAula(this)" placeholder="nome aula..." />' +
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
        let button = '<button type="button" id="button_event" value="' + id + '" onclick="modifyEvento(this.value)">modifica</button>';
        $("#button_operation_event").empty().append(button);
        fillFormEvent(id);
        $("#popupEvento").hide();
    }

}

function fillFormEvent(id) {
    $.ajax({
        url: "rest/eventi/" + id,
        method: "get",
        success: function (response) {
            document.getElementById("nome").value = response["nome"];
            document.getElementById("data_evento").value = response["data"];
            document.getElementById("ora_inizio").value = response["ora_inizio"];
            document.getElementById("ora_fine").value = response["ora_fine"];
            document.getElementById("descrizione").value = response["descrizione"];
            if (response["ricorrenza"] === "GIORNALIERA") {
                document.querySelector('input[type="radio"][name="ricorrenza"]').checked = false;
                document.querySelector('input[type="radio"][name="ricorrenza"][value="1"]').checked = true;
                document.getElementById("data_ricorrenza").value = response["data_ricorrenza"];
                document.getElementById("fine_ricorrenza").style.display = "block";
            } else if (response["ricorrenza"] === "SETTIMANALE") {
                document.querySelector('input[type="radio"][name="ricorrenza"]').checked = false;
                document.querySelector('input[type="radio"][name="ricorrenza"][value="2"]').checked = true;
                document.getElementById("data_ricorrenza").value = response["data_ricorrenza"];
                document.getElementById("fine_ricorrenza").style.display = "block";
            } else if (response["ricorrenza"] === "MENSILE") {
                document.querySelector('input[type="radio"][name="ricorrenza"]').checked = false;
                document.querySelector('input[type="radio"][name="ricorrenza"][value="3"]').checked = true;
                document.getElementById("data_ricorrenza").value = response["data_ricorrenza"];
                document.getElementById("fine_ricorrenza").style.display = "block";
            } else if (response["ricorrenza"] === "NESSUNA") {
                document.querySelector('input[type="radio"][name="ricorrenza"]').checked = false;
                document.querySelector('input[type="radio"][name="ricorrenza"][value="4"]').checked = true;
                document.getElementById("fine_ricorrenza").style.display = "none";
            }

            if (response["tipo"] === "LEZIONE") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="1"]').checked = true;
                fillCorsiTable(response["id_corso"]);
                document.getElementById("corso").style.display = "block";
            } else if (response["tipo"] === "ESAME") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="2"]').checked = true;
                fillCorsiTable(response["id_corso"]);
                document.getElementById("corso").style.display = "block";
            } else if (response["tipo"] === "PARZIALE") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="3"]').checked = true;
                fillCorsiTable(response["id_corso"]);
                document.getElementById("corso").style.display = "block";
            } else if (response["tipo"] === "SEMINARIO") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="4"]').checked = true;
                fillCorsiTable();
                document.getElementById("corso").style.display = "none";
            } else if (response["tipo"] === "RIUNIONE") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="5"]').checked = true;
                fillCorsiTable();
                document.getElementById("corso").style.display = "none";
            } else if (response["tipo"] === "LAUREA") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="6"]').checked = true;
                fillCorsiTable();
                document.getElementById("corso").style.display = "none";
            } else if (response["tipo"] === "ALTRO") {
                document.querySelector('input[type="radio"][name="tipologia"]').checked = false;
                document.querySelector('input[type="radio"][name="tipologia"][value="7"]').checked = true;
                fillCorsiTable();
                document.getElementById("corso").style.display = "none";
            }

            fillResponsabiliTable(response["id_responsabile"]);
            fillAuleTable(response["id_aula"]);
        },
        error: function (xhr) {
            $("#container").empty().append(xhr.responseText);
        }
    });
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
                if (document.getElementById("aule_administration") !== null) {
                    //alert("si");
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
                } else {
                    //alert("ok");
                    $("#aula").empty();
                    let tableAule = "<table><tr><th></th><th>NOME</th></tr>";
                    Object.keys(response).forEach(function (key) {
                        let aula = response[key];
                        tableAule += "<tr>" +
                                '<td><input type="radio" name="aula" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                                "<td>" + aula["nome"] + '</td>' +
                                "</tr>";
                    });
                    tableAule += "</table>";
                    $("#aula").append(tableAule);

                }
            },
            error: function (xhr) {

            }
        });
    }
}

function insertAula(id) {
//////svuotiamo il container totale per inserire la form dell'evento
    let form = "";
    form +=
            '<div id="form_aula" class="form aula">' +
            '<div class="container">' +
            '<div class="ten columns">' +
            '<h3>FORM AULA</h3>' +
            '<button type="button" onclick="location.reload()">annulla</button><br>' +
            '<label><i>configurazione di un\'aula: </i></label>' +
            '<button type="button" id="button_importa" onclick="fadeInPopupImportAula()">importa</button><br>' +
            '<label for="input_aula_1">nome:</label>' +
            '<input type="text" name="nome" id="nome" placeholder="inserisci nome aula" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_2">via:</label>' +
            '<input type="text" name="via" id="via" placeholder="inserisci nome via" oninput="validateAuleInputs()" />' +
            '<label for="input_aula_3">civico:</label>' +
            '<input type="number" name="civico" id="civico" min="1" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_4">edificio:</label>' +
            '<input type="text" name="edificio" id="edificio" placeholder="inserisci nome edificio" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_5">piano:</label>' +
            '<input type="number" min="0" name="piano" id="piano" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_6">capienza:</label>' +
            '<input type="number" min="0" name="capienza" id="capienza" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_7">numero prese elettriche:</label>' +
            '<input type="number" min="0" name="prese_elettriche" id="prese_elettriche" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_8">numero prese di rete:</label>' +
            '<input type="number" min="0" name="prese_rete" id="prese_rete" oninput="validateAuleInputs()" />' +
            '<br>' +
            '<label for="input_aula_9">note generiche:</label><br>' +
            '<textarea name="note_generiche" id="note_generiche" placeholder="inserisci delle note generiche" oninput="validateAuleInputs()"></textarea>' +
            '<br>' +
            '<h4>RESPONSABILI</h4>' +
            '<label>ricerca responsabile: </label>' +
            '<input type="text" oninput="dynamicSearchResponsabile(this)" placeholder="email..." />' +
            '<div id="responsabile"></div>' +
            '<br>' +
            '<h4>ATTREZZATURE</h4>' +
            '<div id="attrezzatura"></div>' +
            '<br>' +
            '<div id="button_operation_aula">' +
            '<button type="button" id="button_aula" onclick="insertNewAula()" disabled>inserisci</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    $("#container").empty().append(form);
    fillResponsabiliTable();
    fillAttrezzatureTable();
    //    fillGruppiTable();
}

function fadeInPopupImportAula() {
    $("#popupImportAula").fadeIn(1000);
}

function fadeOutPopupImportAula() {
    $("#popupImportAula").fadeOut(1000);
}







