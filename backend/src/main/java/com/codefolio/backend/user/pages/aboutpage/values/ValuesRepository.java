package com.codefolio.backend.user.pages.aboutpage.values;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ValuesRepository extends JpaRepository<Values, Long> {
    List<Values> findAllByUsers(Users users);
}
