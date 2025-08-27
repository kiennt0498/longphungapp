package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "images")
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten_anh")
    private String tenAnh;

    @Column(name = "ten_tep")
    private String tenTep;

    @Column(name = "uri")
    private String uri;

    @Column(name = "status")
    private String status;



}