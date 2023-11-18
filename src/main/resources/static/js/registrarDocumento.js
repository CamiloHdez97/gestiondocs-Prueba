// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarNumeracion();
    cargarEstados();
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

    let optionsHtml = '<option value="">Seleccione Tipo de Numeracion</option>';
    for (let numeracion of numeraciones) {
        optionsHtml += '<option value=' + numeracion.idnumeracion + '>' + numeracion.idnumeracion + ' - ' + numeracion.empresa.razonsocial + ' - ' + numeracion.tipoDocumento.descripcion + '</option>';
    }
    document.getElementById('cmbNumeracion').innerHTML = optionsHtml;
}

async function cargarEstados() {
    const request = await fetch('api/estados', {
        method: 'GET',
        headers: getHeaders()
    });

    const estados = await request.json();

    let optionsHtml = '<option value="">Seleccione el estado</option>';
    for (let estado of estados) {
        optionsHtml += '<option value=' + estado.idestado + '>' + estado.descripcion + '</option>';
    }
    document.getElementById('cmbEstado').innerHTML = optionsHtml;
}

async function registrarDocumento() {
    try {
        let datos = {
            numeracion: {
                idnumeracion: document.getElementById('cmbNumeracion').value
            },
            estado: {
                idestado: document.getElementById('cmbEstado').value
            },
            numero: document.getElementById('txtNumero').value,
            fecha: document.getElementById('inputDate').value,
            base: document.getElementById('txtBase').value,
            impuestos: document.getElementById('txtImpuesto').value
        };

        if (!datos.numeracion.idnumeracion || !datos.estado.idestado || !datos.numero || !datos.fecha || !datos.base || !datos.impuestos) {
            alert('Por favor, complete todos los campos.');
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

        const numeracionId = datos.numeracion.idnumeracion;
        const numero = datos.numero;
        const existeDocumento = await verificarExistenciaDocumento(numeracionId, numero);
        if (existeDocumento) {
            alert(`El número del documento ${numero} ya ha sido registrado para la numeración seleccionada.`);
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

        //Realizar el registro del documento
        const response = await fetch('api/documentos', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(datos)
        });
        if (!response.ok) {
            throw new Error('Error al registrar documento: ' + response.status);
        }

        alert('El documento se agregó con éxito!');
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

function documentoRegistrado(numero, documentosRegistrados) {
    if (Array.isArray(documentosRegistrados)) {
        return documentosRegistrados.some(documento => documento.numero === numero);
    }
    return false;
}

async function verificarExistenciaDocumento(numeracionId, numero) {
    try {
        const request = await fetch(`api/documentos/existe/${numeracionId}/${numero}`, {
            method: 'GET',
            headers: getHeaders()
        });
        const existe = await request.json();
        return existe;
    } catch (error) {
        console.error('Error al verificar la existencia del documento:', error);
        return false;
    }
}
