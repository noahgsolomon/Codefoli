package com.codefolio.backend.user.Projects.projectcontent;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
public class ProjectContentController {

    private final ProjectContentService projectContentService;

    public ProjectContentController(ProjectContentService projectContentService) {
        this.projectContentService = projectContentService;
    }

    @PutMapping("/project-content/header")
    public ResponseEntity<Response> updateHeader(Principal principal, @RequestBody ProjectContentUpdateRequestModel content) {
        return projectContentService.updateHeader(principal, content);
    }

    @PutMapping("/project-content/about")
    public ResponseEntity<Response> updateAbout(Principal principal, @RequestBody ProjectContentUpdateRequestModel content) {
        return projectContentService.updateAbout(principal, content);
    }

    @PutMapping("/project-content/overview")
    public ResponseEntity<Response> updateOverview(Principal principal, @RequestBody ProjectContentUpdateRequestModel content) {
        return projectContentService.updateOverview(principal, content);
    }

    @PutMapping("/project-content/description")
    public ResponseEntity<Response> updateDescription(Principal principal, @RequestBody ProjectContentUpdateRequestModel content) {
        return projectContentService.updateDescription(principal, content);
    }

    @PutMapping("/project-content/platforms")
    public ResponseEntity<Response> updatePlatforms(Principal principal, @RequestBody ProjectContentUpdateRequestModel content) {
        return projectContentService.updatePlatforms(principal, content);
    }

    @PutMapping("/project-content/link")
    public ResponseEntity<Response> updateLink(Principal principal, @RequestBody ProjectContentUpdateRequestModel content) {
        return projectContentService.updateLink(principal, content);
    }
}
