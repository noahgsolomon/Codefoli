package com.codefolio.backend.user.services;

import com.codefolio.backend.user.Users;
import jakarta.persistence.*;
import lombok.*;

@Table
@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ServicesType service;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public Services(ServicesType service, Users users) {
        this.service = service;
        this.users = users;
    }
}