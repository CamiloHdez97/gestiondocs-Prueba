package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.Numeracion;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional
public class NumeracionDaoImp implements NumeracionDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Numeracion> getNumeraciones() {
        return entityManager.createQuery("SELECT n FROM Numeracion n", Numeracion.class).getResultList();
    }

    @Override
    public Numeracion getNumeracionById(Long id) {
        return entityManager.find(Numeracion.class, id);
    }

}