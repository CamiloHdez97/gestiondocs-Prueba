package com.gestionDocs.gestionDocs.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Table(name = "documento")
@ToString @EqualsAndHashCode
public class Documento {

    @Id // Marcar como llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iddocumento")
    @Getter @Setter
    private Long iddocumento;

    @ManyToOne
    @JoinColumn(name = "idnumeracion", nullable = false)
    @Getter @Setter
    private Numeracion numeracion;

    @ManyToOne
    @JoinColumn(name = "idestado", nullable = false)
    @Getter @Setter
    private Estado estado;

    @Column(name = "numero", nullable = false)
    @Getter @Setter
    private int numero;

    @Column(name = "fecha", nullable = false)
    @Temporal(TemporalType.DATE)
    @Getter @Setter
    private Date fecha;

    @Column(name = "base", nullable = false)
    @Getter @Setter
    private BigDecimal base;

    @Column(name = "impuestos", nullable = false)
    @Getter @Setter
    private BigDecimal impuestos;

}