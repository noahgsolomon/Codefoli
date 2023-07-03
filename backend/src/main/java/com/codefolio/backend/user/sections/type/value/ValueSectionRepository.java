package com.codefolio.backend.user.sections.type.value;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ValueSectionRepository extends JpaRepository<ValueSection, Long> {
    Optional<ValueSection> findByUsers(Users users);
}
