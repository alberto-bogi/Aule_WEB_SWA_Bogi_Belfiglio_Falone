
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

}


