package com.codefolio.backend.user.workhistory;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class WorkController {

    private final WorkService workService;

    public WorkController(WorkService workService){
        this.workService = workService;
    }

    @PutMapping("/job/company")
    public ResponseEntity<Response> updateJobCompany(Principal principal, @RequestBody UpdateJobCompanyRequestModel job) {
        return workService.updateJobCompany(principal, job);
    }

    @PutMapping("/job/description")
    public ResponseEntity<Response> updateJobDescription(Principal principal, @RequestBody UpdateJobDescriptionRequestModel job) {
        return workService.updateJobDescription(principal, job);
    }

    @PutMapping("/job/position")
    public ResponseEntity<Response> updateJobPosition(Principal principal, @RequestBody UpdateJobPositionRequestModel job) {
        return workService.updateJobPosition(principal, job);
    }

    @PutMapping("/job/start-date")
    public ResponseEntity<Response> updateJobStartDate(Principal principal, @RequestBody UpdateJobStartDateRequestModel job) {
        return workService.updateJobStartDate(principal, job);
    }

    @PutMapping("/job/end-date")
    public ResponseEntity<Response> updateJobEndDate(Principal principal, @RequestBody UpdateJobEndDateRequestModel job) {
        return workService.updateJobEndDate(principal, job);
    }

    @PutMapping("/job/change-order")
    public ResponseEntity<Response> changeJobOrder(Principal principal, @RequestBody ChangeJobOrderRequestModel job) {
        return workService.changeJobOrder(principal, job);
    }
}
