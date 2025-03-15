package com.international_house.backend.entity;

import jakarta.persistence.*;

import java.util.UUID;

import lombok.*;

import org.hibernate.annotations.UuidGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationEvent {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(nullable = false, updatable = false, unique = true)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "consultation")
    private Consultation consultation;

    @Column
    private Long startDate;

    @Column
    private Long endDate;

    @Column
    private String description;

    @Column
    private String repeat;

    @Column
    private Boolean isCanceled = false;

    @Column
    private String reason;
}
