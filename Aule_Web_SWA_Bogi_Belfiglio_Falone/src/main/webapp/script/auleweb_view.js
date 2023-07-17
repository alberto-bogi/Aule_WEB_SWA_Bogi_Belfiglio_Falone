
///Javascript di supporto per cliente

function showFineRicorrenza() {
    let radio_button;
    let data_fine_ricorrenza;
    data_fine_ricorrenza = document.getElementById('fine_ricorrenza');
    radio_button = document.querySelector('input[name="ricorrenza"][type="radio"][value="4"]');
    if (radio_button.checked) {
        data_fine_ricorrenza.style.display = 'none';
    } else {
        let ricorrenze = document.getElementById("data_ricorrenza");
        ricorrenze.value = null;
        data_fine_ricorrenza.style.display = 'block';
    }
}

function showCorsi() {
    let radio_value;
    let div_corsi;

    div_corsi = document.getElementById('corso');
    radio_value = document.querySelector('input[name="tipologia"]:checked').value;
    if (radio_value === "1" || radio_value === "2" || radio_value === "3") {
        let corsi = div_corsi.querySelectorAll('input[type="radio"]');
        corsi.forEach((elemento) => {
            if (elemento.checked) {
                elemento.checked = false;
            }
        });
        div_corsi.style.display = 'block';
    } else {
        div_corsi.style.display = 'none';
    }
}


function validateEventsInputs() {

    let nome = document.getElementById("nome").value;
    let data_evento = document.getElementById("data_evento").value;
    let ora_inizio = document.getElementById("ora_inizio").value;
    let ora_fine = document.getElementById("ora_fine").value;
    let descrizione = document.getElementById("descrizione").value;
    let ricorrenza = document.querySelector('input[type="radio"][name="ricorrenza"]:checked');
    let tipologia = document.querySelector('input[type="radio"][name="tipologia"]:checked');
    let responsabile = document.querySelector('input[type="radio"][name="responsabile"]:checked');
    let aula = document.querySelector('input[type="radio"][name="aula"]:checked');
    let button = document.getElementById("button_event");



    if (nome && data_evento && ora_inizio && ora_fine && descrizione && responsabile && aula && ricorrenza && tipologia) {
        if (ricorrenza.value === "1" || ricorrenza.value === "2" || ricorrenza.value === "3") {
            let data_ricorrenza = document.getElementById("data_ricorrenza").value;
            if (!data_ricorrenza) {
                button.disabled = true;
                return;
            }
        }
        if (tipologia.value === "1" || tipologia.value === "2" || tipologia.value === "3") {
            let corso = document.querySelector('input[type="radio"][name="corso"]:checked');
            if (!corso) {
                button.disabled = true;
                return;
            } else {
                button.disabled = false;
                return;
            }
        } else {
            button.disabled = false;
            return;
        }

    } else {
        button.disabled = true;
        return;
    }
}



function validateAuleInputs() {

    let nome = document.getElementById("nome").value;
    let via = document.getElementById("via").value;
    let civico = document.getElementById("civico").value;
    let edificio = document.getElementById("edificio").value;
    let piano = document.getElementById("piano").value;
    let capienza = document.getElementById("capienza").value;
    let prese_elettriche = document.getElementById("prese_elettriche").value;
    let prese_rete = document.getElementById("prese_rete").value;
    let note_generiche = document.getElementById("note_generiche").value;
    let responsabile = document.querySelector('input[type="radio"][name="responsabile"]:checked');
    let attrezzatura = document.querySelectorAll('input[type="checkbox"][name="attrezzatura"]:checked');
    let button = document.getElementById("button_aula");

    if (nome && civico && via && edificio && piano && capienza && prese_elettriche && prese_rete && note_generiche && responsabile && attrezzatura) {
        button.disabled = false;
        return;

    } else {
        button.disabled = true;
        return;
    }
}

function select_button_abilitato() {
    let selectElements = document.getElementsByName("select_name");
    let buttonElement = document.getElementById("button_assegna");
    selectElements.forEach(function(select){
        let selectedOption = select.value;
        if(selectedOption !== ""){
            buttonElement.disabled = false;
        }
    });
}




function verifyCorrectnessTimeEvento() {
    let input_data = document.getElementById("data_evento");
    let input_time_1 = document.getElementById("ora_inizio");
    let input_time_2 = document.getElementById("ora_fine");
    let div_message = document.getElementById("input_time_error");
    if (input_data.value) {
        let verify_data = new Date(input_data.value);
        let current_data = new Date();
        verify_data.setHours(0, 0, 0, 0);
        current_data.setHours(0, 0, 0, 0);
        if (verify_data < current_data) {
            div_message.style.display = 'block';
            input_data.value = "";
            return;
        } else if (verify_data.getTime() === current_data.getTime()) {
            if (input_time_1.value) {
                let timeComponents = input_time_1.value.split(":");
                let hours = parseInt(timeComponents[0], 10);
                let minutes = parseInt(timeComponents[1], 10);

                let time_start = new Date();
                time_start.setHours(hours);
                time_start.setMinutes(minutes);
                let current_time = new Date();

                if (time_start < current_time) {
                    div_message.style.display = 'block';
                    input_time_1.value = "";
                    return;

                }
            }
        } else {
            if (input_time_1.value && input_time_2.value) {
                let timeComponents = input_time_1.value.split(":");
                let hours = parseInt(timeComponents[0], 10);
                let minutes = parseInt(timeComponents[1], 10);

                let time_start = new Date();
                time_start.setHours(hours);
                time_start.setMinutes(minutes);

                timeComponents = input_time_2.value.split(":");
                hours = parseInt(timeComponents[0], 10);
                minutes = parseInt(timeComponents[1], 10);
                let time_end = new Date();
                time_end.setHours(hours);
                time_end.setMinutes(minutes);
                if (time_end <= time_start) {
                    div_message.style.display = 'block';
                    input_time_2.value = "";
                    return;

                }
            }

        }

    }

    if (input_time_1.value) {
        let timeComponents = input_time_1.value.split(":");
        let minutes = parseInt(timeComponents[1], 10);
        if (minutes % 15 !== 0) {
            div_message.style.display = 'block';
            input_time_1.value = "";
            return;
        }
    }

    if (input_time_2.value) {
        let timeComponents = input_time_2.value.split(":");
        let minutes = parseInt(timeComponents[1], 10);
        if (minutes % 15 !== 0) {
            div_message.style.display = 'block';
            input_time_2.value = "";
            return;
        }
    }


    div_message.style.display = 'none';
    return;

}



function checkCalendarInput() {
    let date1 = document.getElementById("input_csv_date_1").value;
    let date2 = document.getElementById("input_csv_date_2").value;
    let button = document.getElementById("button_csv_eventi");


    if (date1 && date2) {
        if(date1 >= date2){
            button.disabled = true;
            $("#error_input_event_calendar").show();
            return;
        }else{
            $("#error_input_event_calendar").hide();
            button.disabled = false;
            return;
        }
        return;
    } else {
        button.disabled = true;
        return;
    }
}

function checkImportButton(){
    if(document.getElementById("aula_import").value){
        document.getElementById("button_aula_import").disabled = false;
    }else{
        document.getElementById("button_aula_import").disabled = true;
    }
}


/* function for popup */

function fadeInPopupExport() {
    $("#popupExport").fadeIn(1000);
}
function fadeOutPopupExport() {
    $("#popupExport").fadeOut(1000);
}

function fadeOutPopupEvento() {
    $('#popupEvento').fadeOut(1000);

}

function fadeOutPopupError() {
    $('#popupError').fadeOut(1000);

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
    $("#error_login").hide();
}

function fadeOutPopupLogin() {
    $("#popupLogin").slideUp(300);
}



