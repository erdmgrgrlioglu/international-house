package com.international_house.backend.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Getter
@Setter
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false, unique = true)
    private Integer id;

    @Column(nullable = false, unique = true, columnDefinition = "text")
    private String name;

    @Column()
    private String description;

    @Column
    private String shortVersion;

    @Column
    private String defaultRoom = ""; // not implemented on client

    @Column
    private String color = "#e4001a";

    @Column
    private Integer totalVisitorCount = 0;

    @Column
    private Integer dailyVisitorCount = 0;
}
