package com.codefolio.backend.user.Projects;

import com.codefolio.backend.user.Projects.languages.Languages;
import com.codefolio.backend.user.Projects.languages.LanguagesRepository;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ProjectsService {

    private final ProjectsRepository projectsRepository;
    private final LanguagesRepository languagesRepository;

    @Transactional
    public ResponseEntity<Response> removeProject(Principal principal, String id) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndId(user, Long.parseLong(id));
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            List<Languages> languages = languagesRepository.findAllByProjectAndUsers(project.get(), user);
            languagesRepository.deleteAll(languages);
            projectsRepository.delete(project.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project deleted successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addProject(Principal principal, AddProjectRequestModel project) {
        try {
            Users user = getAuthenticatedUser(principal);
            Projects newProject = new Projects(user, project.title(), project.description(), user.getName());
            projectsRepository.save(newProject);
            Languages newLanguage = new Languages(user, newProject, project.language());
            languagesRepository.save(newLanguage);
            List<Languages> languages = languagesRepository.findAllByProjectAndUsers(newProject, user);
            List<String> languagesList = languages.stream().map(Languages::getLanguage).toList();
            return ResponseEntity.ok(new Response(StatusType.OK, "Project added successfully", new AddProjectResponseModel(newProject.getName(), newProject.getDescription(), languagesList, newProject.getUpdatedAt(), newProject.getImage(), newProject.getId().toString(), newProject.getSlug())));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateProjectTitle(Principal principal, UpdateProjectTitleRequestModel project) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> projectToUpdate = projectsRepository.findByUsersAndId(user, Long.parseLong(project.id()));
            if (projectToUpdate.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectToUpdate.get().setName(project.title());
            projectToUpdate.get().setSlug(createSlug(project.title()));
            projectsRepository.save(projectToUpdate.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project title updated successfully", projectToUpdate.get().getSlug()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateProjectDescription(Principal principal, UpdateProjectDescriptionRequestModel project) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> projectToUpdate = projectsRepository.findByUsersAndId(user, Long.parseLong(project.id()));
            if (projectToUpdate.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectToUpdate.get().setDescription(project.description());
            projectsRepository.save(projectToUpdate.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project description updated successfully", projectToUpdate.get().getDescription()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> removeLanguage(Principal principal, ProjectLanguageRequestModel language) {
        try {
            Users user = getAuthenticatedUser(principal);
            Projects project = projectsRepository.findById(Long.parseLong(language.id())).orElseThrow();
            if (!Objects.equals(project.getUsers().getId(), user.getId())){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Optional<Languages> languageToRemove = languagesRepository.findByLanguageAndProject(language.language(), project);
            if (languageToRemove.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Language not found", null));
            }
            languagesRepository.delete(languageToRemove.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Language removed successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addLanguage(Principal principal, ProjectLanguageRequestModel language) {
        try {
            Users user = getAuthenticatedUser(principal);
            Projects project = projectsRepository.findById(Long.parseLong(language.id())).orElseThrow();
            if (!Objects.equals(project.getUsers().getId(), user.getId())){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Languages newLanguage = new Languages(user, project, language.language());
            languagesRepository.save(newLanguage);
            return ResponseEntity.ok(new Response(StatusType.OK, "Language added successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    private String createSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[':;/.,!@#$%^&*()_+=]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("--+", "-");
    }
}
