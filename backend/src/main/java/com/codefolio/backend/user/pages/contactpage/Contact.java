package com.codefolio.backend.user.pages.contactpage;

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
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", unique = true)
    private Users users;

    private String headerOne;
    private String descriptionOne;

    public Contact(Users users, String headerOne, String descriptionOne) {
        this.users = users;
        this.headerOne = headerOne;
        this.descriptionOne = descriptionOne;
    }
}
