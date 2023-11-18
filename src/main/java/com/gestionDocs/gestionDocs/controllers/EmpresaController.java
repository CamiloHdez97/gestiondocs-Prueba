package com.gestionDocs.gestionDocs.controllers;

import com.gestionDocs.gestionDocs.dao.EmpresaDao;
import com.gestionDocs.gestionDocs.models.Empresa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmpresaController {

    @Autowired
    private EmpresaDao empresaDao;

    @RequestMapping(value = "api/empresas", method = RequestMethod.GET)
    public List<Empresa> getEmpresas() {
        return empresaDao.getEmpresas();
    }

}