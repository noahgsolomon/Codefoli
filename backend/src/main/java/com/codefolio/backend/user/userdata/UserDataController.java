package com.codefolio.backend.user.userdata;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

}
