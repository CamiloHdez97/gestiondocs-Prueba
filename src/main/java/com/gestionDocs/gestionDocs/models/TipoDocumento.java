package com.gestionDocs.gestionDocs.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "tipodocumento")
@ToString @EqualsAndHashCode
public class TipoDocumento {

    @Id // Marcar como llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtipodocumento")
    @Getter @Setter
    private Long idtipodocumento;

    @Column(name = "descripcion", nullable = false, length = 256)
    @Getter @Setter
    private String descripcion;

}