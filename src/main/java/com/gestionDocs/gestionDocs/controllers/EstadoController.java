package com.gestionDocs.gestionDocs.controllers;

import com.gestionDocs.gestionDocs.dao.EstadoDao;
import com.gestionDocs.gestionDocs.models.Estado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EstadoController {

    @Autowired
    private EstadoDao estadoDao;

    @RequestMapping(value = "api/estados", method = RequestMethod.GET)
    public List<Estado> getEstados() {
        return estadoDao.getEstados();
    }
}