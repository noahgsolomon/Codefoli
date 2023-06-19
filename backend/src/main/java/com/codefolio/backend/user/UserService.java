package com.codefolio.backend.user;

import com.codefolio.backend.user.githubrepo.ProjectsRepository;
import com.codefolio.backend.user.githubrepo.Projects;
import com.codefolio.backend.user.skills.Skills;
import com.codefolio.backend.user.skills.SkillsRepository;
import com.codefolio.backend.user.skills.SkillsType;
import com.codefolio.backend.user.workhistory.Work;
import com.codefolio.backend.user.workhistory.WorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final WorkRepository workRepository;
    private final ProjectsRepository projectsRepository;
    private final SkillsRepository skillsRepository;

    public ResponseEntity<?> userDetails(Principal principal) {
        if (!(principal instanceof Authentication)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        Object principalUser = ((Authentication) principal).getPrincipal();
        if (!(principalUser instanceof Users user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        List<Work> userWorks = workRepository.findAllByUsers(user);
        List<Projects> userProjects = projectsRepository.findAllByUsers(user);
        List<Skills> userSkills = skillsRepository.findAllByUsers(user);

        SkillsType[] userSkillsTypes = userSkills.stream()
                .map(Skills::getSkill)
                .toArray(SkillsType[]::new);

        UserHomeResponseModel userHomeResponseModel = new UserHomeResponseModel(
                user.getName(),
                user.getEmail(),
                user.getCompany(),
                user.getLocation(),
                user.getAbout(),
                userSkillsTypes,
                userProjects.toArray(new Projects[0]),
                userWorks.toArray(new Work[0]),
                user.getRole().toString(),
                user.getProfession()
        );

        return ResponseEntity.ok(userHomeResponseModel);
    }

    public ResponseEntity<?> setup(UserProfileRequestModel userProfile, Principal principal) {
        if (!(principal instanceof Authentication)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        Object principalUser = ((Authentication) principal).getPrincipal();
        if (!(principalUser instanceof Users user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        user.setName(userProfile.name());
        user.setEmail(userProfile.email());
        user.setCompany(userProfile.company());
        user.setLocation(userProfile.location());
        user.setProfession(userProfile.profession());
        user.setAbout(userProfile.about());
        userRepository.save(user);

        userProfile.skills().forEach(skill -> {
            Skills newSkill = new Skills(SkillsType.valueOf(skill), user);
            skillsRepository.save(newSkill);
        });

        userProfile.work().forEach(work -> {
            Work newWork = new Work(user, work.getCompany(), work.getPosition(), work.getStartDate(), work.getEndDate(), work.getDescription());
            workRepository.save(newWork);
        });

        List<Projects> userProjects = projectsRepository.findAllByUsers(user);
        for (Projects userProject : userProjects) {
            projectsRepository.deleteById(userProject.getId());
        }

        userProfile.projects().forEach(project -> {
            System.out.println(project.getName());
            Projects newProject = new Projects(user, project.getName(), project.getLanguage(), project.getDescription(), project.getUpdatedAt(), user.getName());
            projectsRepository.save(newProject);
        });

        user.setRole(RoleType.USER);
        userRepository.save(user);

        return ResponseEntity.ok("Profile setup successfully!");

    }
}
