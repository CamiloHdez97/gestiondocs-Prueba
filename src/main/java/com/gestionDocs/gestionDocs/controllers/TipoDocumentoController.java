package com.gestionDocs.gestionDocs.controllers;

import com.gestionDocs.gestionDocs.dao.TipoDocumentoDao;
import com.gestionDocs.gestionDocs.models.TipoDocumento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TipoDocumentoController {

    @Autowired
    private TipoDocumentoDao tipoDocumentoDao;

    @RequestMapping(value = "api/tipodocumentos", method = RequestMethod.GET)
    public List<TipoDocumento> getTiposDocumentos() {
        return tipoDocumentoDao.getTiposDocumentos();
    }
}