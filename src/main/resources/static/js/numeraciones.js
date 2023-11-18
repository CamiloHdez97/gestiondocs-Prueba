// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarNumeracion();
    $('#numeracion').DataTable();
});

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   };
}

async function cargarNumeracion() {
    const request = await fetch('api/numeraciones', {
        method: 'GET',
        headers: getHeaders()
    });
    const numeraciones = await request.json();

    let listadoHtml = '';

    for (let numeracion of numeraciones) {
        let numeracionHtml = '<tr><td>' + numeracion.idnumeracion + '</td><td>' + numeracion.tipoDocumento.descripcion + '</td><td>' +
            numeracion.empresa.razonsocial + '</td><td>' + numeracion.prefijo + '</td><td>' + numeracion.consecutivoinicial +
            '</td><td>' + numeracion.consecutivofinal + '</td><td>' + numeracion.vigenciainicial + '</td><td>' +
            numeracion.vigenciafinal + '</td></tr>';

        listadoHtml += numeracionHtml;
    }
    document.querySelector('#numeracion tbody').outerHTML = listadoHtml;
}