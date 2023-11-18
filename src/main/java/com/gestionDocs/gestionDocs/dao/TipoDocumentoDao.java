package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.TipoDocumento;

import java.util.List;

public interface TipoDocumentoDao {

    List<TipoDocumento> getTiposDocumentos();

    TipoDocumento getTipoDocumentoById(Long id);

}