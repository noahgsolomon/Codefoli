package com.codefolio.backend.user.sections.type.testimonial;

import jakarta.persistence.*;
import lombok.*;

@Table
@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class TestimonialSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
