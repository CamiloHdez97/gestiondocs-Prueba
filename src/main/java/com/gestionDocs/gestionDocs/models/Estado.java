package com.gestionDocs.gestionDocs.models;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "estado")
@ToString @EqualsAndHashCode
public class Estado {

    @Id // Marcar como llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idestado")
    @Getter @Setter
    private Long idestado;

    @Column(name = "descripcion", nullable = false, length = 256)
    @Getter @Setter
    private String descripcion;

    @Column(name = "exitoso", nullable = false)
    @Getter @Setter
    private boolean exitoso;

}