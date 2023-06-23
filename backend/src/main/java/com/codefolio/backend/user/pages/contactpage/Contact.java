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
    @JoinColumn(name = "user_id")
    private Users users;

    private String headerOne;
    private String descriptionOne;
    private String email;
    private String phone;

    private String headerTwo;
    private String descriptionTwo;

    public Contact(Users users, String headerOne, String descriptionOne, String email, String phone, String headerTwo, String descriptionTwo) {
        this.users = users;
        this.headerOne = headerOne;
        this.descriptionOne = descriptionOne;
        this.email = email;
        this.phone = phone;
        this.headerTwo = headerTwo;
        this.descriptionTwo = descriptionTwo;
    }
}
