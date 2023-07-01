package com.codefolio.backend.user.sections.type.faq;

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
public class FAQSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users users;
    private String headerOne;
    private String descriptionOne;

    public FAQSection(Users users, String headerOne, String descriptionOne) {
        this.users = users;
        this.headerOne = headerOne;
        this.descriptionOne = descriptionOne;
    }
}
