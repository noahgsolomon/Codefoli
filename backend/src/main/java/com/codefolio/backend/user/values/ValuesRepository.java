package com.codefolio.backend.user.values;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ValuesRepository extends JpaRepository<Values, Long> {
    List<Values> findAllByUsers(Users users);
    Optional<Values> findByUsersAndValue(Users users, ValuesType value);
}
