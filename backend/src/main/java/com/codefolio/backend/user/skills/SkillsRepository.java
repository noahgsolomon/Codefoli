package com.codefolio.backend.user.skills;

import com.codefolio.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillsRepository extends JpaRepository<Skills, Long> {
    List<Skills> findAllByUsers(Users users);
    Optional<Skills> findByUsersAndSkill(Users users, SkillsType skill);
}
