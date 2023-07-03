package com.codefolio.backend.user.sections.type.skill;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillSectionRepository extends JpaRepository<SkillSection, Long> {
    Optional<SkillSection> findByUsers(Users users);
}
