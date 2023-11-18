package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.TipoDocumento;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional
public class TipoDocumentoDaoImp implements TipoDocumentoDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TipoDocumento> getTiposDocumentos() {
        return entityManager.createQuery("SELECT td FROM TipoDocumento td", TipoDocumento.class).getResultList();
    }

    public TipoDocumento getTipoDocumentoById(Long id) {
        return entityManager.find(TipoDocumento.class, id);
    }

}