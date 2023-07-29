package com.codefolio.backend.user.Projects.languages;

import com.codefolio.backend.user.Projects.Projects;
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
public class Languages {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String language;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private Users users;

        @ManyToOne
        @JoinColumn(name = "project_id")
        private Projects project;
        public Languages(Users users, Projects project, String language) {
            this.users = users;
            this.project = project;
            this.language = language;
        }
}
