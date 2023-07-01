package com.codefolio.backend.user.sections.type.faq;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FAQSectionRepository extends JpaRepository<FAQSection, Long> {
    Optional<FAQSection> findByUsers(Users users);
}