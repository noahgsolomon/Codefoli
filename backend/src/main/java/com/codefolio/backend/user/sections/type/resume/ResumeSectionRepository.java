package com.codefolio.backend.user.sections.type.resume;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeSectionRepository extends JpaRepository<ResumeSection, Long> {
    Optional<ResumeSection> findByUsers(Users users);
}