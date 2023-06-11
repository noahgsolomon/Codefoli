package com.codefolio.backend.user;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "user_session")
@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class UserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_id")
    private String sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @Column(name = "created_at")
    private Date createdAt;

    public UserSession (String sessionId, Users users, Date createdAt){
        this.sessionId = sessionId;
        this.users = users;
        this.createdAt = createdAt;
    }
}
