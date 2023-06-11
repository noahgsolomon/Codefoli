package com.codefolio.backend.user.skills;

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
public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SkillsType skill;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public Skills(SkillsType skill, Users users) {
        this.skill = skill;
        this.users = users;
    }
}