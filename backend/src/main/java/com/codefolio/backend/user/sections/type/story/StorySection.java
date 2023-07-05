package com.codefolio.backend.user.sections.type.story;

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
public class StorySection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users users;
    private String headerOne;
    @Column(length = 1000)
    private String descriptionOne;
    private String bulletOne;
    private String bulletTwo;
    private String bulletThree;
    private String imageOne;

    public StorySection(Users users, String headerOne, String descriptionOne, String bulletOne, String bulletTwo, String bulletThree, String imageOne) {
        this.users = users;
        this.headerOne = headerOne;
        this.descriptionOne = descriptionOne;
        this.bulletOne = bulletOne;
        this.bulletTwo = bulletTwo;
        this.bulletThree = bulletThree;
        this.imageOne = imageOne;
    }
}
