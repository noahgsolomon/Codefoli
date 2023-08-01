package com.codefolio.backend.user.Projects.projectcontent;

import com.codefolio.backend.user.Projects.Projects;
import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProjectContentRepository extends JpaRepository<ProjectContent, Long> {
    Optional<ProjectContent> findByProjectAndUsers(Projects project, Users users);
}
