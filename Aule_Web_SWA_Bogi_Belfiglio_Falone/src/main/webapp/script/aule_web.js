$('#getCurrentEventi').submit(function (event){

    $.ajax({
        url: 'aule_web/eventi',
        type: 'GET',
        success: function (response) {
            
            
            $('#e-table-body-info').empty();

            var view =
                    '<tr>' + '<td>' + 'Nome ' + '</td>' + '<td>' + "aaaaaaaaa" + '</td>' + '</tr>' +
                    
            $('#e-table-body-info').append(view);

        },
        error: function () {
            console.log('Errore durante il recupero dei dati dal database');
        }
    });

});

