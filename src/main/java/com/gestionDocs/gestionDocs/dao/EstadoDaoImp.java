package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.Estado;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional
public class EstadoDaoImp implements EstadoDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Estado> getEstados() {
        return entityManager.createQuery("SELECT es FROM Estado es", Estado.class).getResultList();
    }

    @Override
    public Estado getEstadoById(Long id) {
        return entityManager.find(Estado.class, id);
    }


}