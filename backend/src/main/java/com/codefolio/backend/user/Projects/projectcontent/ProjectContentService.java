package com.codefolio.backend.user.Projects.projectcontent;

import java.security.Principal;
import com.codefolio.backend.user.Projects.Projects;
import com.codefolio.backend.user.Projects.ProjectsRepository;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ProjectContentService {

    private final ProjectContentRepository projectContentRepository;
    private final ProjectsRepository projectsRepository;
    public ResponseEntity<Response> updateHeader(Principal principal, ProjectContentUpdateRequestModel content) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndSlug(user, content.slug());
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Optional<ProjectContent> projectContent = projectContentRepository.findByProjectAndUsers(project.get(), user);
            if (projectContent.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectContent.get().setHeader(content.content());
            projectContentRepository.save(projectContent.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project header updated successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateAbout(Principal principal, ProjectContentUpdateRequestModel content) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndSlug(user, content.slug());
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Optional<ProjectContent> projectContent = projectContentRepository.findByProjectAndUsers(project.get(), user);
            if (projectContent.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectContent.get().setAbout(content.content());
            projectContentRepository.save(projectContent.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project about updated successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateOverview(Principal principal, ProjectContentUpdateRequestModel content) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndSlug(user, content.slug());
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Optional<ProjectContent> projectContent = projectContentRepository.findByProjectAndUsers(project.get(), user);
            if (projectContent.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectContent.get().setOverview(content.content());
            projectContentRepository.save(projectContent.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project overview updated successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }


    public ResponseEntity<Response> updateDescription(Principal principal, ProjectContentUpdateRequestModel content) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndSlug(user, content.slug());
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Optional<ProjectContent> projectContent = projectContentRepository.findByProjectAndUsers(project.get(), user);
            if (projectContent.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectContent.get().setDescription(content.content());
            projectContentRepository.save(projectContent.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project description updated successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }


    public ResponseEntity<Response> updatePlatforms(Principal principal, ProjectContentUpdateRequestModel content) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Projects> project = projectsRepository.findByUsersAndSlug(user, content.slug());
            if (project.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            Optional<ProjectContent> projectContent = projectContentRepository.findByProjectAndUsers(project.get(), user);
            if (projectContent.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.ERROR, "Project not found", null));
            }
            projectContent.get().setPlatforms(content.content());
            projectContentRepository.save(projectContent.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Project platforms updated successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
