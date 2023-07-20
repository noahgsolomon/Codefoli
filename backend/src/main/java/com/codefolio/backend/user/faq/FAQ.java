package com.codefolio.backend.user.faq;

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
public class FAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;
    private String question;
    @Column(length = 1000)
    private String answer;

    public FAQ(Users users, String question, String answer) {
        this.users = users;
        this.question = question;
        this.answer = answer;
    }
}
