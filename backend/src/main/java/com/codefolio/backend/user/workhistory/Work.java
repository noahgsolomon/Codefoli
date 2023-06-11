package com.codefolio.backend.user.workhistory;

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
    private String company;
    private String position;
    private String startDate;
    private String endDate;
    private String description;

    public Work(String company, String position, String startDate, String endDate, String description) {
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
