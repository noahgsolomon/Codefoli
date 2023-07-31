package com.codefolio.backend.user.Projects;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @PutMapping("/project/title")
    public ResponseEntity<Response> updateProjectTitle(Principal principal, @RequestBody UpdateProjectTitleRequestModel project){
        return projectsService.updateProjectTitle(principal, project);
    }

    @PutMapping("/project/description")
    public ResponseEntity<Response> updateProjectDescription(Principal principal, @RequestBody UpdateProjectDescriptionRequestModel project){
        return projectsService.updateProjectDescription(principal, project);
    }

    @DeleteMapping("/project/remove-language")
    public ResponseEntity<Response> removeLanguage(Principal principal, @RequestBody RemoveProjectLanguageRequestModel language){
        return projectsService.removeLanguage(principal, language);
    }

}
