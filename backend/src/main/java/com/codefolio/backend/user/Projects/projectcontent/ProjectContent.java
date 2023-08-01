package com.codefolio.backend.user.Projects.projectcontent;

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
public class ProjectContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Projects project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    private String header;
    @Column(columnDefinition = "TEXT")
    private String about;
    private String overview;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String image;
    private String platforms;

    public ProjectContent(Users users, Projects project, String header, String about, String overview, String description, String image, String platforms) {
        this.users = users;
        this.project = project;
        this.header = header;
        this.about = about;
        this.overview = overview;
        this.description = description;
        this.image = image;
        this.platforms = platforms;
    }
}
