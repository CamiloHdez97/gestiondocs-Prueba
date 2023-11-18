// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarDocumentos();
    $('#documento').DataTable();

});

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   };
}

async function cargarDocumentos() {
    const request = await fetch('api/documentos', {
        method: 'GET',
        headers: getHeaders()
    });
    const documentos = await request.json();

    let listadoHtml = '';

    for (let documento of documentos) {
        let botonEliminar = '<a href="#" onclick="eliminarDocumento(' + documento.iddocumento  + ')" class="btn btn-danger btn-circle btn-sm mb-2 mx-1"><i class="fas fa-trash"></i></a>';
        let botonActualizar = '<a href="#" onclick="actualizarDocumento(' + documento.iddocumento  + ')" class="btn btn-warning btn-circle btn-sm mb-2 mx-1"><i class="fas fa-exclamation-triangle"></i></a>';
        let documentoHtml = '<tr><td>' + documento.iddocumento + '</td><td>' + documento.numeracion.idnumeracion + ' - ' + documento.numeracion.empresa.razonsocial + ' - ' + documento.numeracion.tipoDocumento.descripcion + '</td><td>' + documento.estado.descripcion + '</td><td>' + documento.numero + '</td><td>' + documento.fecha + '</td><td>' + documento.base + '</td><td>' + documento.impuestos + '</td><td>'  + botonActualizar + botonEliminar +'</td></tr>';

        listadoHtml += documentoHtml;
    }
    document.querySelector('#documento tbody').outerHTML = listadoHtml;
}

async function eliminarDocumento(id){
    try {
      if (!confirm('¿Eliminar el Documento?')) {
        return;
      }
        const request = await fetch('api/documentos/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });

        alert("Documento Eliminado");
        location.reload();

    } catch (error) {
        console.error(error);
        alert('Hubo un error al eliminar el documento. Por favor, inténtelo de nuevo.');
    }
}
async function actualizarDocumento(id) {
    try {
        const request = await fetch('api/documentos/' + id, {
            method: 'GET',
            headers: getHeaders()
        });

        const documentoSeleccionado = await request.json();

        localStorage.setItem('documentoSeleccionado', JSON.stringify(documentoSeleccionado));

        window.location.href = 'editarDocumento.html';

    } catch (error) {
        console.error(error);
        alert('Hubo un error al obtener el documento. Por favor, inténtelo de nuevo.');
    }
}