package com.international_house.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {

    @Id
    @Column(nullable = false, updatable = false, unique = true)
    private String id;

    @Column
    private Long timeStamp;

    @Column
    private Boolean beingCalled = false;

    @ManyToOne
    @JoinColumn(name = "consultation", nullable = false)
    private Consultation consultation;
}
