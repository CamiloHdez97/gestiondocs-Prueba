package com.gestionDocs.gestionDocs.controllers;

import com.gestionDocs.gestionDocs.dao.DocumentoDao;
import com.gestionDocs.gestionDocs.dao.EstadoDao;
import com.gestionDocs.gestionDocs.dao.NumeracionDao;
import com.gestionDocs.gestionDocs.models.Documento;
import com.gestionDocs.gestionDocs.models.Estado;
import com.gestionDocs.gestionDocs.models.Numeracion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DocumentoController {

    @Autowired
    private DocumentoDao documentoDao;

    @Autowired
    private NumeracionDao numeracionDao;

    @Autowired
    private EstadoDao estadoDao;

    @RequestMapping(value = "api/documentos", method = RequestMethod.GET)
    public List<Documento> getDocumentos() {
        return documentoDao.getDocumentos();
    }

    @RequestMapping(value = "api/documentos", method = RequestMethod.POST)
    public void registrarDocumento(@RequestBody Documento documento) {

        System.out.println("Documento antes de persistir: " + documento);
        Numeracion numeracion = numeracionDao.getNumeracionById(documento.getNumeracion().getIdnumeracion());
        Estado estado = estadoDao.getEstadoById(documento.getEstado().getIdestado());
        documento.setNumeracion(numeracion);
        documento.setEstado(estado);
        documentoDao.registrar(documento);
    }

    @RequestMapping(value = "api/documentos/{id}", method = RequestMethod.GET)
    public Documento getDocumentoById(@PathVariable Long id) {
        System.out.println("id Documento antes de eliminar: " + id);
        return documentoDao.getDocumentoById(id);
    }

    @RequestMapping(value = "api/documentos/{id}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id) {
        System.out.println("id Documento antes de editar: " + id);
        documentoDao.eliminar(id);
    }

    @RequestMapping(value = "api/documentos/{id}", method = RequestMethod.PUT)
    public void actualizar(@PathVariable Long id, @RequestBody Documento documentoActualizado) {

        Documento documentoExistente = documentoDao.getDocumentoById(id);

        if (documentoExistente != null) {

            documentoExistente.setNumero(documentoActualizado.getNumero());
            documentoExistente.setFecha(documentoActualizado.getFecha());
            documentoExistente.setBase(documentoActualizado.getBase());
            documentoExistente.setImpuestos(documentoActualizado.getImpuestos());

            Numeracion numeracion = numeracionDao.getNumeracionById(documentoActualizado.getNumeracion().getIdnumeracion());
            Estado estado = estadoDao.getEstadoById(documentoActualizado.getEstado().getIdestado());
            documentoExistente.setNumeracion(numeracion);
            documentoExistente.setEstado(estado);

            documentoDao.actualizar(documentoExistente);
        } else {

            System.out.println("Documento con ID " + id + " no encontrado.");

        }
    }

    @RequestMapping(value = "api/documentos/existe/{id}/{numero}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> existeDocumentoConNumero(
            @PathVariable("id") Long numeracionId,
            @PathVariable("numero") int numero) {
        boolean existe = documentoDao.existeDocumentNumeroNumeracion(numeracionId, numero);
        return new ResponseEntity<>(existe, HttpStatus.OK);
    }

}