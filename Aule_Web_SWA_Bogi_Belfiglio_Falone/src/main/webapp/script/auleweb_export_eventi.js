$(document).ready(function () {
 
    $("#popupExport").hide();
    
});
function fadeInPopupExport() {
    $("#popupExport").slideDown(300);
}
function fadeOutPopupExport() {
    $("#popupExport").slideUp(300);
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