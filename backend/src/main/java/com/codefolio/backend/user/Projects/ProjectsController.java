package com.codefolio.backend.user.Projects;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.security.Principal;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectsController {

    private final ProjectsService projectsService;

    public ProjectsController(ProjectsService projectsService) {
        this.projectsService = projectsService;
    }

    @DeleteMapping("/project/remove")
    public ResponseEntity<Response> removeProject(Principal principal, @RequestBody String id){
        return projectsService.removeProject(principal, id);
    }

    @PostMapping("/project/add")
    public ResponseEntity<Response> addProject(Principal principal, @RequestBody AddProjectRequestModel project){
        return projectsService.addProject(principal, project);
    }

}
