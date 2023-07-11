$(document).ready(function () {
    $("#popupAula").hide();
    $("#popupLogin").hide();
    $("#attrezzatureAula").hide();
    $("#gruppiAula").hide();
});



function showAulaInformationsByName() {
    $("#popupAula").empty();
    let form = document.getElementById("search_aula");
    let search = form.elements["aula"].value;
    let sanitizedSearch = search.replace(/[<>"'=()*!?]/g, '');
    $.ajax({
        url: "rest/aule/" + sanitizedSearch,
        method: "GET",
        success: function (response) {
            if (Object.keys(response).length > 0) {
                let id = response["id_aula"];
                showAulaInformationsById(id);
            } else {
                let popupContent =
                        '<div>' +
                        '<div class="exit">' +
                        '<button type="button" onclick="fadeOutPopupAula()">X</button>' +
                        '</div>' +
                        '<h2  style="clear: right">NESSUN RISULTATO</h2>' +
                        '<p class="search null">ci dispiace, ma la ricerca <b><em>' + sanitizedSearch + '</b></em> non ha fornito risultati</p>' +
                        '</div>';
                $("#popupAula").append(popupContent);
                $("#popupAula").fadeIn(1000);
                let form = document.getElementById("search_aula");
                let search = form.elements["aula"].value = "";
            }
        },
        error: function (xhr, status, error) {
            $("auleweb").append(xhr.responseText);
            $("auleweb").show();
        }
    });
}

function showAulaInformationsById(id) {
    $.ajax({
        url: "rest/aule/" + id,
        method: "GET",
        success: function (response) {
            $("#popupAula").empty();
            let popupContent =
                    '<div class="exit">' +
                    '<button type="button" onclick="fadeOutPopupAula()">X</button>' +
                    '</div>' +
                    '<div class="container">' +
                    '<div class="ten columns">' +
                    '<h2>INFORMAZIONI</h2>';
            if (sessionStorage.getItem("authToken") !== null) {
                popupContent += 
                        '<button type="button" value="' + response["id_aula"] + '" onclick="assignGruppoForAula(this.value)">assegna gruppi</button>' +
                        '<button type="button" value="' + response["id_aula"] + '" onclick="exportAulaCSV(this.value)">esporta</button>'
                
            } else {
                popupContent += '<button type="button" value="' + response["id_aula"] + '" onclick="showEventiFormByAulaId(this.value)">eventi</button>';
            }

            popupContent +=
                    "<p><b>NOME</b>: " + response["nome"].toLowerCase() + "</p>" +
                    "<p><b>LUOGO</b>: " + response["luogo"].toLowerCase() + "</p>" +
                    "<p><b>EDIFICIO</b>: " + response["edificio"].toLowerCase() + "</p>" +
                    "<p><b>CAPIENZA</b>: " + response["capienza"] + "</p>" +
                    "<p><b>RESPONSABILE</b>: " + response["responsabile"].toLowerCase() + "</p>" +
                    "<p><b>PRESE ELETTRICHE</b>: " + response["prese_elettriche"] + "</p>" +
                    "<p><b>PRESE DI RETE</b>: " + response["prese_di_rete"] + "</p>" +
                    '<p class="attrezzature" id="showAule" onclick="showAttrezzatureByAula(' + response["id_aula"] + ')">mostra le attrezzature</p>' +
                    '<div id="attrezzatureAula"></div>' +
                    '<p class="attrezzature" id="showGruppi" onclick="showGruppiByAula(' + response["id_aula"] + ')">mostra i gruppi di appartenenza</p>' +
                    '<div id="gruppiAula"></div>' +
                    '</div>' +
                    '</div>';



            $("#popupAula").append(popupContent);
            $("#popupAula").fadeIn(1000);
            let form = document.getElementById("search_aula");
            let search = form.elements["aula"].value = "";
        }
    });
}

function showGruppiByAula(id) {
    $("#gruppiAula").empty();
    $("#showGruppi").hide();
    $.ajax({
        url: "rest/aule/" + id + "/gruppi",
        method: "get",
        success: function (response) {
            let gruppiContent = "";
            if (Object.keys(response).length > 0) {
                Object.keys(response).forEach(function (key) {
                    let gruppo = response[key];
                    gruppiContent += "<p><b>" + gruppo["tipo"] + "</b>: " + gruppo["nome"] + "</p>";
                });
                gruppiContent += '</p><p class="attrezzature" id="hide" onclick="hideGruppi()">nascondi gruppi</p>';
                $("#gruppiAula").append(gruppiContent);
                $("#gruppiAula").show();
            } else {
                let message = "<p>non ci sono gruppi associati a questa aula</p>";
                message += '<p class="attrezzature" onclick="hideGruppi()">nascondi</p>';
                $("#gruppiAula").append(message);
                $("#gruppiAula").show();

            }
        }
    });
}

function showAttrezzatureByAula(id) {
    $("#attrezzatureAula").empty();
    $("#showAule").hide();
    $.ajax({
        url: "rest/aule/" + id + "/attrezzature",
        method: "GET",
        success: function (response) {
            let attrezzatureContent = "";
            if (Object.keys(response).length > 0) {
                attrezzatureContent += "<p>";
                Object.keys(response).forEach(function (key) {
                    let attrezzatura = response[key];
                    attrezzatureContent += attrezzatura["nome"] + " ";
                });
                attrezzatureContent += '</p><p class="attrezzature" id="hide" onclick="hideAttrezzature()">nascondi attrezzature</p>';
                $("#attrezzatureAula").append(attrezzatureContent);
                $("#attrezzatureAula").show();
            } else {
                let message = "<p>non ci sono attrezzature disponibili in questa aula</p>";
                message += '<p class="attrezzature" onclick="hideAttrezzature()">nascondi</p>';
                $("#attrezzatureAula").append(message);
                $("#attrezzatureAula").show();
            }
        }

    });
}

function fillAuleTable(){
    $.ajax({
            url:"rest/aule",
            method:"get",
            success: function(response){
                let table = "";
                table += '<table><th></th><th>NOME</th>';
                Object.keys(response).forEach(function(key){
                    let aula = response[key];
                    table +=
                            '<tr>' + 
                            '<td><input type="radio" name="aula" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                            '<td>' + aula['nome'] + '</td>' +
                            '</tr>';
                });
                table += '</table>';
                $("#aula").empty().append(table);
            },
            error: function(xhr){
                $("#aula").empty().append(xhr.responseText);
            }
        });
}


function hideAttrezzature() {
    $("#attrezzatureAula").hide();
    $("#showAule").show();
}

function hideGruppi() {
    $("#gruppiAula").hide();
    $("#showGruppi").show();
}



function fadeOutPopupAula() {
    $('#popupAula').fadeOut(1000);

}


function fadeInPopupLogin() {
    $("#popupLogin").slideDown(300);
}

function fadeOutPopupLogin() {
    $("#popupLogin").slideUp(300);
}



