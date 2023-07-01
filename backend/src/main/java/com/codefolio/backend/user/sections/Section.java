package com.codefolio.backend.user.sections;

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
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @Enumerated(EnumType.STRING)
    private SectionType type;

    @Enumerated(EnumType.STRING)
    private PageType page;

    private int pageOrder;

    public Section(Users users, SectionType type, PageType page, int pageOrder) {
        this.users = users;
        this.type = type;
        this.page = page;
        this.pageOrder = pageOrder;
    }

}
