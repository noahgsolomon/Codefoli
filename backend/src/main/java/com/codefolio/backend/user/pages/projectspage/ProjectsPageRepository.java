package com.codefolio.backend.user.pages.projectspage;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectsPageRepository extends JpaRepository<ProjectsPage, Long> {

    Optional<ProjectsPage> findByUsers(Users users);
}
