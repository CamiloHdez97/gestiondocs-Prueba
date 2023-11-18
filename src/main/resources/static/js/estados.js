$(document).ready(function() {
    cargarEstados();
    $('#estados').DataTable();
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

async function cargarEstados() {
    const request = await fetch('api/estados', {
        method: 'GET',
        headers: getHeaders()
    });
    const estados = await request.json();

    let listadoHtml = '';

    for (let estado of estados) {
        let estadoHtml = '<tr><td>' + estado.idestado + '</td><td>' + estado.descripcion + '</td><td>' + estado.exitoso + '</td></tr>';

        listadoHtml += estadoHtml;
    }
    document.querySelector('#estado tbody').outerHTML = listadoHtml;
}