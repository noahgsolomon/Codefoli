package com.codefolio.backend.user.workhistory;

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
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;
    private String company;
    private String position;
    private String startDate;
    private String endDate;
    private String description;

    public Work(Users users, String company, String position, String startDate, String endDate, String description) {
        this.users = users;
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
