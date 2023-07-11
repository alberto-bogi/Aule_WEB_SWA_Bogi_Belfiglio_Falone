
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



function verifyCorrectnessTimeEvento() {

}



