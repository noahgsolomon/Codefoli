package com.codefolio.backend.user.Projects;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectsRepository extends JpaRepository<Projects, Long>{
    List<Projects> findAllByUsers(Users users);
    Optional<Projects> findByUsersAndId(Users users, Long id);
}
