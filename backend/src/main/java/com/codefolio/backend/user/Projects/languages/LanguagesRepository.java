package com.codefolio.backend.user.Projects.languages;

import com.codefolio.backend.user.Projects.Projects;
import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LanguagesRepository extends JpaRepository<Languages, Long> {
    List<Languages> findAllByProjectAndUsers(Projects project, Users users);
    Optional<Languages> findByLanguageAndProject(String language, Projects project);
}
