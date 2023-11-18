package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.Estado;

import java.util.Date;
import java.util.List;

public interface EstadoDao {

    List<Estado> getEstados();

    Estado getEstadoById(Long id);

}