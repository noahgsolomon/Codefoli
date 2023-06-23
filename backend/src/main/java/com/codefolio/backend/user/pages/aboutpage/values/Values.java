package com.codefolio.backend.user.pages.aboutpage.values;

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
public class Values {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    private String value;
    private String description;

    public Values(Users users, String value, String description) {
        this.users = users;
        this.value = value;
        this.description = description;
    }
}
