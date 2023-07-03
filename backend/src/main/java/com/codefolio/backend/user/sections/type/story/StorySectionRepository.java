package com.codefolio.backend.user.sections.type.story;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorySectionRepository extends JpaRepository<StorySection, Long> {
    Optional<StorySection> findByUsers(Users users);
}
