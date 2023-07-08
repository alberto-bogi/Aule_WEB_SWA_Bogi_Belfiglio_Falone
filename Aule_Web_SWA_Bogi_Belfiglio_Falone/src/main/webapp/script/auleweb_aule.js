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
    $.ajax({
        url: "rest/aule/" + search,
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
                        '<p class="search null">ci dispiace, ma la ricerca <b><em>' + search + '</b></em> non ha fornito risultati</p>' +
                        '</div>';
                $("#popupAula").append(popupContent);
                $("#popupAula").fadeIn(1000);

            }
        },
        error: function (xhr, status, error) {
            let popupContent =
                    '<div>' +
                    '<div class="exit">' +
                    '<button type="button" onclick="fadeOutPopupAula()">X</button>' +
                    '</div>' +
                    '<div class="error"><h2  style="clear: right">ATTENZIONE</h2>' +
                    '<p>non sono ammessi caratteri speciali per la ricerca, è possibile inserire solamente caratteri ' +
                    'alfanumerici e "."</p>' +
                    '</div>';
            $("#popupAula").append(popupContent);
            $("#popupAula").show();
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
                    '</div></div>' +
                    '<div class="container">' + 
                    '<div class="ten columns">' +
                    '<h2>INFORMAZIONI</h2>' +
                    '<button type="button" value="' + response["id_aula"] + '" onclick="showEventiFormByAulaId(this.value)">eventi</button>' +
                    "<p><b>NOME</b>: " + response["nome"].toLowerCase() + "</p>" +
                    "<p><b>LUOGO</b>: " + response["luogo"].toLowerCase() + "</p>" +
                    "<p><b>EDIFICIO</b>: " + response["edificio"].toLowerCase() + "</p>" +
                    "<p><b>CAPIENZA</b>: " + response["capienza"] + "</p>" +
                    "<p><b>RESPONSABILE</b>: " + response["responsabile"].toLowerCase() + "</p>" +
                    "<p><b>PRESE ELETTRICHE</b>:" + response["prese_elettriche"] + "</p>" +
                    "<p><b>PRESE DI RETE</b>:" + response["prese_di_rete"] + "</p>" +
                    '<p class="attrezzature" id="showAula" onclick="showAttrezzatureByAula(' + response["id_aula"] + ')">mostra le attrezzature</p>' +
                    '<p class="attrezzature" id="showGruppo" onclick="showGruppiByAula(' + response["id_aula"] + ')">mostra i gruppi di appartenenza</p>' +
                    '<div id="attrezzatureAula"></div>' +
                    '<div id="gruppiAula"></div>' ;
                    


            $("#popupAula").append(popupContent);
            $("#popupAula").fadeIn(1000);
        }
    });
}

function showGruppiByAula(id) {
    $("#gruppiAula").empty();
    $("#show").hide();
    $.ajax({
        url: "rest/aule/" + id + "/gruppi",
        method: "get",
        success: function (response) {
            let gruppiContent = "";
            Object.keys(response).forEach(function (key) {
                let gruppo = response[key];
                gruppiContent += "<p><b>" + gruppo["tipo"] + "</b>: " + gruppo["nome"] + "</p>";
            });
            gruppiContent += '</p><p class="attrezzature" id="hide" onclick="hideGruppi()">nascondi</p>';
            $("#gruppiAula").append(gruppiContent);
            $("#gruppiAula").show();
        }
    });
}

function showAttrezzatureByAula(id) {
    $("#attrezzatureAula").empty();
    $("#show").hide();
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
                attrezzatureContent += '</p><p class="attrezzature" id="hide" onclick="hideAttrezzature()">nascondi</p>';
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

function hideAttrezzature() {
    $("#attrezzatureAula").hide();
    $("#show").show();
}

function hideGruppi() {
    $("#gruppiAula").hide();
    $("#show").show();
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



