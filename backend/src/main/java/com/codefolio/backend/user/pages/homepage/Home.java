package com.codefolio.backend.user.pages.homepage;

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
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", unique = true)
    private Users users;

    private String headerOne;
    @Column(length = 1000)
    private String descriptionOne;
    private String headerTwo;
    private String profileImage;
    public Home(Users users, String headerOne, String descriptionOne, String headerTwo, String profileImage) {
        this.users = users;
        this.headerOne = headerOne;
        this.descriptionOne = descriptionOne;
        this.headerTwo = headerTwo;
        this.profileImage = profileImage;
    }
}
