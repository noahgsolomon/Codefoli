package com.codefolio.backend.user.services;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServicesRepository extends JpaRepository<Services, Long> {
    List<Services> findAllByUsers(Users users);
    Optional<Services> findByUsersAndService(Users users, ServicesType service);
}
