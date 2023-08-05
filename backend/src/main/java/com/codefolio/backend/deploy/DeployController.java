package com.codefolio.backend.deploy;

import java.security.Principal;
import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeployController {

    private final DeployService deployService;

    public DeployController(DeployService deployService) {
        this.deployService = deployService;
    }

    @PostMapping("/deploy")
    public ResponseEntity<Response> deploy(Principal principal) {
        return deployService.deploy(principal);
    }

}
