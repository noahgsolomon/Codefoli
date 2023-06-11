package com.codefolio.backend.user.githubrepo;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectsRepository extends JpaRepository<Projects, Long>{
    List<Projects> findAllByUsers(Users users);
}
