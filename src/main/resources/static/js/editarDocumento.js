let datos = {}; // Mueve la declaración aquí para que sea accesible fuera del bloque try

$(document).ready(function() {
    cargarNumeracion();
    cargarEstados();

    const datosLocalStorage = localStorage.getItem('documentoSeleccionado');

    if (datosLocalStorage) {
        datos = JSON.parse(datosLocalStorage);

        document.getElementById('cmbNumeracion').value = datos.numeracion.idnumeracion;
        document.getElementById('cmbEstado').value = datos.estado.idestado;
        document.getElementById('txtNumero').value = datos.numero;
        document.getElementById('inputDate').value = datos.fecha;
        document.getElementById('txtBase').value = datos.base;
        document.getElementById('txtImpuesto').value = datos.impuestos;
    }
});


function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   };
}

async function obtenerIdDocumento(id) {

    const request = await fetch(`api/documentos/${id}`, {
        method: 'GET',
        headers: getHeaders()
    });

    const documento = await request.json();
    return documento.iddocumento;
}

async function cargarNumeracion() {
    const request = await fetch('api/numeraciones', {
        method: 'GET',
        headers: getHeaders()
    });

    const numeraciones = await request.json();
    let optionsHtml = '';
    for (let numeracion of numeraciones) {
        optionsHtml += `<option value=${numeracion.idnumeracion}>${numeracion.idnumeracion} - ${numeracion.empresa.razonsocial}</option>`;

    }
    document.getElementById('cmbNumeracion').innerHTML = optionsHtml;

    if (datos.numeracion && datos.numeracion.idnumeracion) {
        document.getElementById('cmbNumeracion').value = datos.numeracion.idnumeracion;
    }
}

async function cargarEstados() {
    const request = await fetch('api/estados', {
        method: 'GET',
        headers: getHeaders()
    });
    const estados = await request.json();

    let optionsHtml;
    for (let estado of estados) {
        optionsHtml += `<option value=${estado.idestado}>${estado.descripcion}</option>`;
    }
    document.getElementById('cmbEstado').innerHTML = optionsHtml;

    if (datos.estado && datos.estado.idestado) {
        document.getElementById('cmbEstado').value = datos.estado.idestado;
    }
}

async function actualizarDocumento() {
    try {
         const idDocumentoGuardado = JSON.parse(localStorage.getItem('documentoSeleccionado'));
        if (!confirm('¿Actualizar el Documento?')) {
            return;
        }
        console.table(idDocumentoGuardado.iddocumento);
        const idDocumento = await obtenerIdDocumento(idDocumentoGuardado.iddocumento);
        if (!idDocumento) {
            alert('No se ha proporcionado un ID de documento válido.');
            return;
        }

        datos = {
            numeracion: {
                idnumeracion: parseInt(document.getElementById('cmbNumeracion').value)
            },
            estado: {
                idestado: parseInt(document.getElementById('cmbEstado').value)
            },
            numero: parseInt(document.getElementById('txtNumero').value),
            fecha: document.getElementById('inputDate').value,
            base: parseFloat(document.getElementById('txtBase').value),
            impuestos: parseFloat(document.getElementById('txtImpuesto').value)
        };

        if (!datos.numeracion.idnumeracion || !datos.estado.idestado || !datos.numero || !datos.fecha || isNaN(datos.base) || isNaN(datos.impuestos)) {
            alert('Por favor, complete todos los campos y tenga en cuenta los campos numéricos.');
            return;
        }

        const rango = await obtenerNumeracion(datos.numeracion.idnumeracion);
        if (!(datos.numero >= rango.consecutivoinicial && datos.numero <= rango.consecutivofinal)) {
            alert(`El número del documento está fuera del rango autorizado. (${rango.consecutivoinicial} - ${rango.consecutivofinal})`);
            return;
        }

        const fechaDocumento = new Date(datos.fecha).getTime();
        const vigenciaInicio = new Date(rango.vigenciainicial).getTime();
        const vigenciaFinal = new Date(rango.vigenciafinal).getTime();
        if (!(fechaDocumento >= vigenciaInicio && fechaDocumento <= vigenciaFinal)) {
            alert(`La fecha del documento está fuera del rango autorizado. (${rango.vigenciainicial} - ${rango.vigenciafinal})`);
            return;
        }

        if (datos.base <= 0){
            alert('El valor base del documento debe ser mayor a cero.');
            return;
        }

        if(datos.impuestos <= datos.base){
            alert('El valor de los impuestos deben ser mayor a la base.');
            return;
        }

        const response = await fetch(`api/documentos/${idDocumento}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar documento: ' + response.status);
        }

        alert('El documento se actualizó con éxito!');
        localStorage.removeItem('documentoSeleccionado');
        window.location.href = 'index.html';

    } catch (error) {
        console.error(error);
        alert('Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo.');
    }
}
async function obtenerNumeracion(id) {
    const request = await fetch('api/numeraciones/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const numeracion = await request.json();
    return numeracion;
}