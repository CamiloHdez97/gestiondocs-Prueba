package com.gestionDocs.gestionDocs.dao;

import com.gestionDocs.gestionDocs.models.Documento;

import com.gestionDocs.gestionDocs.models.Estado;
import com.gestionDocs.gestionDocs.models.Numeracion;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//Poder acceder al repositorio
@Repository

//Estructura de la consulta, fragmentos de transación.
@Transactional

public class DocumentoDaoImp implements DocumentoDao {

    //Conexión con la base de datos.
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Documento> getDocumentos(){

        return entityManager.createQuery("SELECT d FROM Documento d ORDER BY d.iddocumento", Documento.class).getResultList();

    }

    @Override
    public Documento getDocumentoById(Long id) {
        return entityManager.find(Documento.class, id);
    }

    @Override
    public void eliminar(Long id) {
        Documento documento = entityManager.find(Documento.class, id);
        entityManager.remove(documento);
    }

    @Override
    public void registrar(Documento documento) {

        System.out.println("Documento antes de persistir: " + documento);
        // Cargar instancias de Numeracion y Estado si son null
        if (documento.getNumeracion() != null && documento.getNumeracion().getIdnumeracion() != null) {
            Numeracion numeracion = entityManager.find(Numeracion.class, documento.getNumeracion().getIdnumeracion());
            documento.setNumeracion(numeracion);
        }

        if (documento.getEstado() != null && documento.getEstado().getIdestado() != null) {
            Estado estado = entityManager.find(Estado.class, documento.getEstado().getIdestado());
            documento.setEstado(estado);
        }

        System.out.println("Documento antes de persistir: " + documento);
        entityManager.merge(documento);

    }
    @Override
    public boolean existeDocumentNumeroNumeracion(Long idNumeracion, int numero) {
        return entityManager.createQuery(
                        "SELECT COUNT(d) FROM Documento d " +
                                "WHERE d.numeracion.idnumeracion = :idNumeracion AND d.numero = :numero",
                        Long.class)
                .setParameter("idNumeracion", idNumeracion)
                .setParameter("numero", numero)
                .getSingleResult() > 0;
    }
    @Override
    public void actualizar(Documento documento) {
        entityManager.merge(documento);
    }

}