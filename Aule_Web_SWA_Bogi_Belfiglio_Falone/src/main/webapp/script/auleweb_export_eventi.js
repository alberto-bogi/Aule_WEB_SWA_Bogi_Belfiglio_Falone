$(document).ready(function () {
    
});
function fadeInPopupExport() {
    $("#popupExport").fadeIn(1000);
}
function fadeOutPopupExport() {
    $("#popupExport").fadeOut(1000);
}
function checkCSVButton() {
    let date1 = document.getElementById("input_csv_date_1").value;
    let date2 = document.getElementById("input_csv_date_2").value;
    let button = document.getElementById("button_csv_eventi");

    if (date1 && date2) {
        button.disabled = false;
        return;
    } else {
        button.disabled = true;
        return;
    }
}