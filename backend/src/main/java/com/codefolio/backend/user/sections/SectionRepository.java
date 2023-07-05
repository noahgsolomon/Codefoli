package com.codefolio.backend.user.sections;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section, Long> {
    List<Section> findAllByUsersAndPage(Users users, PageType page);
    Optional<Section> findByUsersAndPageAndType(Users users, PageType page, SectionType type);
}
