package com.gestionDocs.gestionDocs.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "numeracion")
@ToString @EqualsAndHashCode
public class Numeracion {

    @Id // Marcar como llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idnumeracion")
    @Getter @Setter
    private Long idnumeracion;

    @ManyToOne
    @JoinColumn(name = "idtipodocumento", nullable = false)
    @Getter @Setter
    private TipoDocumento tipoDocumento;

    @ManyToOne
    @JoinColumn(name = "idempresa", nullable = false)
    @Getter @Setter
    private Empresa empresa;

    @Column(name = "prefijo", nullable = false, length = 8)
    @Getter @Setter
    private String prefijo;

    @Column(name = "consecutivoinicial", nullable = false)
    @Getter @Setter
    private int consecutivoinicial;

    @Column(name = "consecutivofinal", nullable = false)
    @Getter @Setter
    private int consecutivofinal;

    @Column(name = "vigenciainicial", nullable = false)
    @Temporal(TemporalType.DATE)
    @Getter @Setter
    private Date vigenciainicial;

    @Column(name = "vigenciafinal", nullable = false)
    @Temporal(TemporalType.DATE)
    @Getter @Setter
    private Date vigenciafinal;

}