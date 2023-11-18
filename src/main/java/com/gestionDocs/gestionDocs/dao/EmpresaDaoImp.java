package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.Empresa;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class EmpresaDaoImp implements EmpresaDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Empresa> getEmpresas() {
        return entityManager.createQuery("SELECT e FROM Empresa e", Empresa.class).getResultList();
    }

}