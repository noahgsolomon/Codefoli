package com.codefolio.backend.user.Projects;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ProjectsService {

    private final ProjectsRepository projectsRepository;

    public ResponseEntity<Response> removeProject(Principal principal, String id) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndId(user, Long.parseLong(id));
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
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
            Projects newProject = new Projects(user, project.title(), project.language(), project.description(), user.getName());
            projectsRepository.save(newProject);
            return ResponseEntity.ok(new Response(StatusType.OK, "Project added successfully", new AddProjectResponseModel(newProject.getName(), newProject.getDescription(), newProject.getLanguage(), newProject.getUpdatedAt(), newProject.getImage(), newProject.getId().toString())));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
