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
    @JoinColumn(name = "user_id")
    private Users users;

    //section one
    private String headerOne;
    private String iconOne;
    private String iconTwo;
    private String headerTwo;
    private String iconThree;
    @Column(length = 1000)
    private String descriptionOne;

    //section two
    private String headerThree;
    @Column(length = 1000)
    private String descriptionTwo;
    @Column(length = 1000)
    private String bulletOne;
    @Column(length = 1000)
    private String bulletTwo;
    @Column(length = 1000)
    private String bulletThree;
    private String imageOne;
    //section three jobs
    private String headerFour;

    //section four what drives me
    private String headerFive;
    @Column(length = 1000)
    private String descriptionThree;

    public About(
            Users users,
            String headerOne,
            String iconOne,
            String iconTwo,
            String headerTwo,
            String iconThree,
            String descriptionOne,
            String headerThree,
            String descriptionTwo,
            String bulletOne,
            String bulletTwo,
            String bulletThree,
            String imageOne,
            String headerFour,
            String headerFive,
            String descriptionThree) {
        this.users = users;
        this.headerOne = headerOne;
        this.iconOne = iconOne;
        this.iconTwo = iconTwo;
        this.headerTwo = headerTwo;
        this.iconThree = iconThree;
        this.descriptionOne = descriptionOne;
        this.headerThree = headerThree;
        this.descriptionTwo = descriptionTwo;
        this.bulletOne = bulletOne;
        this.bulletTwo = bulletTwo;
        this.bulletThree = bulletThree;
        this.imageOne = imageOne;
        this.headerFour = headerFour;
        this.headerFive = headerFive;
        this.descriptionThree = descriptionThree;
    }
}