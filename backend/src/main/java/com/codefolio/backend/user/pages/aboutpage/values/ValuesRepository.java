package com.codefolio.backend.user.pages.aboutpage.values;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValuesRepository extends JpaRepository<Values, Long> {
}
