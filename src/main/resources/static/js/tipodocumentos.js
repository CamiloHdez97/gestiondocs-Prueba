// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarTipoDocumento();
    $('#tipoDocumento').DataTable();
});

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   };
}

async function cargarTipoDocumento() {
    const request = await fetch('api/tipodocumentos', {
        method: 'GET',
        headers: getHeaders()
    });
    const tiposDocumentos = await request.json();

    let listadoHtml = '';

    for (let tipoDocumento of tiposDocumentos) {
        let tipoDocumentoHtml = '<tr><td>' + tipoDocumento.idtipodocumento + '</td><td>' + tipoDocumento.descripcion + '</td></tr>';

        listadoHtml += tipoDocumentoHtml;
    }
    document.querySelector('#tipodocumento tbody').outerHTML = listadoHtml;
}