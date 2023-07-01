package com.codefolio.backend.user.sections.type.resume;

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
public class ResumeSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users users;
    private String headerOne;

    public ResumeSection(Users users, String headerOne) {
        this.users = users;
        this.headerOne = headerOne;
    }

}
