package com.gestionDocs.gestionDocs.models;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "empresa")
@ToString @EqualsAndHashCode
public class Empresa {

    @Id // Marcar como llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idempresa")
    @Getter @Setter
    private Long idempresa;

    @Column(name = "identificacion", nullable = false, length = 16)
    @Getter @Setter
    private String identificacion;

    @Column(name = "razonsocial", nullable = false, length = 16)
    @Getter @Setter
    private String razonsocial;

}