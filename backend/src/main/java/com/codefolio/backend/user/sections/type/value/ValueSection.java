package com.codefolio.backend.user.sections.type.value;

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
public class ValueSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users users;
    private String headerOne;
    @Column(length = 1000)
    private String descriptionOne;

    public ValueSection(Users users, String headerOne, String descriptionOne) {
        this.users = users;
        this.headerOne = headerOne;
        this.descriptionOne = descriptionOne;
    }

}
