package com.gestionDocs.gestionDocs.dao;
import com.gestionDocs.gestionDocs.models.Documento;
import java.util.List;

public interface DocumentoDao {

    List<Documento> getDocumentos();

    Documento getDocumentoById(Long id);

    void eliminar(Long id);

    void registrar(Documento documento);

    boolean existeDocumentNumeroNumeracion(Long idNumeracion, int numero);

    void actualizar(Documento documento);
}