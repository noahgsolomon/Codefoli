package com.codefolio.backend.user.faq;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {
    List<FAQ> findAllByUsers(Users users);
    Optional<FAQ> findByUsersAndId(Users users, Long id);
}
