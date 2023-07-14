package com.codefolio.backend.user.userdata;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class UserDataController {

    private final UserDataService userDataService;

    public UserDataController(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    @PutMapping("/update-service")
    public ResponseEntity<Response> updateServices(Principal principal, @RequestBody UpdateServiceRequestModel updateServiceRequestModel) {
        return userDataService.updateServices(principal, updateServiceRequestModel);
    }

    @DeleteMapping("/remove-language")
    public ResponseEntity<Response> removeLanguage(Principal principal, @RequestBody String skill) {
        return userDataService.removeLanguage(principal, skill);
    }

    @PostMapping("/add-language")
    public ResponseEntity<Response> addLanguage(Principal principal, @RequestBody String skill) {
        return userDataService.addLanguage(principal, skill);
    }

    @DeleteMapping("remove-service")
    public ResponseEntity<Response> removeService(Principal principal, @RequestBody String service) {
        return userDataService.removeService(principal, service);
    }

    @PostMapping("/add-service")
    public ResponseEntity<Response> addService(Principal principal, @RequestBody String service) {
        return userDataService.addService(principal, service);
    }

    @DeleteMapping("/remove-job")
    public ResponseEntity<Response> removeJob(Principal principal, @RequestBody String id) {
        return userDataService.removeJob(principal, id);
    }

    @PostMapping("/add-job")
    public ResponseEntity<Response> addJob(Principal principal, @RequestBody AddJobRequestModel addJobRequestModel) {
        return userDataService.addJob(principal, addJobRequestModel);
    }

}
