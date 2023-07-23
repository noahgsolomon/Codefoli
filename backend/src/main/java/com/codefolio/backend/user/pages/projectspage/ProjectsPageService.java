package com.codefolio.backend.user.pages.projectspage;

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
public class ProjectsPageService {

    private final ProjectsPageRepository projectsPageRepository;

    public ResponseEntity<Response> getProjectsPage(Principal principal) {
        try {
            Users users = getAuthenticatedUser(principal);
            if (users == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "User not authenticated", null));
            }

            Optional<ProjectsPage> projectsPage = projectsPageRepository.findByUsers(users);
            if (projectsPage.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Projects page data not found", null));
            }

            ProjectsPageResponseModel projectsPageResponseModel = new ProjectsPageResponseModel(
                    projectsPage.get().getHeaderOne(),
                    projectsPage.get().getDescriptionOne()
            );

            return ResponseEntity.ok(new Response(StatusType.OK, "Projects page data fetched successfully", projectsPageResponseModel));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<ProjectsPage> projectsPageData = projectsPageRepository.findByUsers(user);
            if (projectsPageData.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Contact data not found", null));
            }
            projectsPageData.get().setHeaderOne(headerOne);
            projectsPageRepository.save(projectsPageData.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", headerOne));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<ProjectsPage> projectsPageData = projectsPageRepository.findByUsers(user);
            if (projectsPageData.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Contact data not found", null));
            }
            projectsPageData.get().setDescriptionOne(descriptionOne);
            projectsPageRepository.save(projectsPageData.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", descriptionOne));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
