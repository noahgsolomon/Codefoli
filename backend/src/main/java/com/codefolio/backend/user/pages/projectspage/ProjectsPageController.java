package com.codefolio.backend.user.pages.projectspage;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
public class ProjectsPageController {

    private final ProjectsPageService projectsPageService;

    public ProjectsPageController(ProjectsPageService projectsPageService) {
        this.projectsPageService = projectsPageService;
    }

    @GetMapping("/projects-page")
    public ResponseEntity<Response> getProjectsPage(Principal principal){
        return projectsPageService.getProjectsPage(principal);
    }

    @PutMapping("/projects-page/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return projectsPageService.updateHeaderOne(principal, headerOne);
    }

    @PutMapping("/projects-page/description-one")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return projectsPageService.updateDescriptionOne(principal, descriptionOne);
    }
}
