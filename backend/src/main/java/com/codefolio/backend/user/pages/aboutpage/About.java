package com.codefolio.backend.user.pages.aboutpage;

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
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", unique = true)
    private Users users;
    private String headerOne;
    private String iconOne;
    private String iconTwo;
    private String headerTwo;
    private String iconThree;
    @Column(length = 1000)
    private String descriptionOne;
    @Column(columnDefinition = "TEXT")
    private String descriptionTwo;

    public About(
            Users users,
            String headerOne,
            String iconOne,
            String iconTwo,
            String headerTwo,
            String iconThree,
            String descriptionOne,
            String descriptionTwo
            ) {
        this.users = users;
        this.headerOne = headerOne;
        this.iconOne = iconOne;
        this.iconTwo = iconTwo;
        this.headerTwo = headerTwo;
        this.iconThree = iconThree;
        this.descriptionOne = descriptionOne;
        this.descriptionTwo = descriptionTwo;
    }
}