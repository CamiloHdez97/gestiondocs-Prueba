package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.Numeracion;

import java.util.List;

public interface NumeracionDao {

    List<Numeracion> getNumeraciones();
    Numeracion getNumeracionById(Long id);
}