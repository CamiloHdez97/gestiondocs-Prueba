package com.gestionDocs.gestionDocs.controllers;

import com.gestionDocs.gestionDocs.dao.NumeracionDao;
import com.gestionDocs.gestionDocs.models.Numeracion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NumeracionController {

    @Autowired
    private NumeracionDao numeracionDao;

    @RequestMapping(value = "api/numeraciones", method = RequestMethod.GET)
    public List<Numeracion> getNumeraciones() {
        return numeracionDao.getNumeraciones();
    }

    @RequestMapping(value = "api/numeraciones/{id}", method = RequestMethod.GET)
    public Numeracion getNumeracionById(@PathVariable Long id) {
        return numeracionDao.getNumeracionById(id);
    }
}