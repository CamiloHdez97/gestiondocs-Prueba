// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarEmpresas();
    $('#empresas').DataTable();
    actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email').outerHTML = localStorage.email;
}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   };
}


async function cargarEmpresas() {
    const request = await fetch('api/empresas', {
        method: 'GET',
        headers: getHeaders()
    });
    const empresas = await request.json();

    let listadoHtml = '';

    for (let empresa of empresas) {
        let empresaHtml = '<tr><td>' + empresa.idempresa + '</td><td>' + empresa.identificacion + '</td><td>' + empresa.razonsocial + '</td></tr>';

        listadoHtml += empresaHtml;
    }
    document.querySelector('#empresa tbody').outerHTML = listadoHtml;
}