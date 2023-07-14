package com.codefolio.backend.user.workhistory;

import com.amazonaws.services.kms.model.NotFoundException;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Objects;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class WorkService {
    private final WorkRepository workRepository;

    private Work getValidWorkForUser(Principal principal, String jobIdString) throws NotFoundException {
        Users user = getAuthenticatedUser(principal);
        long id = Long.parseLong(jobIdString);
        Work work = workRepository.findById(id).orElseThrow();
        if (!Objects.equals(work.getUsers().getId(), user.getId())) {
            throw new NotFoundException("Invalid job id");
        }
        return work;
    }

    private ResponseEntity<Response> handleException(Exception e) {
        e.printStackTrace();
        System.err.print(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
    }

    public ResponseEntity<Response> updateJobCompany(Principal principal, UpdateJobCompanyRequestModel job) {
        try {
            Work work = getValidWorkForUser(principal, job.id());
            work.setCompany(job.company());
            workRepository.save(work);
            return ResponseEntity.ok(new Response(StatusType.OK, "Company title updated successfully", work.getCompany()));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    public ResponseEntity<Response> updateJobDescription(Principal principal, UpdateJobDescriptionRequestModel job) {
        try {
            Work work = getValidWorkForUser(principal, job.id());
            work.setDescription(job.description());
            workRepository.save(work);
            return ResponseEntity.ok(new Response(StatusType.OK, "Description updated successfully", work.getDescription()));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    public ResponseEntity<Response> updateJobPosition(Principal principal, UpdateJobPositionRequestModel job) {
        try {
            Work work = getValidWorkForUser(principal, job.id());
            work.setPosition(job.position());
            workRepository.save(work);
            return ResponseEntity.ok(new Response(StatusType.OK, "Position updated successfully", work.getPosition()));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    public ResponseEntity<Response> updateJobStartDate(Principal principal, UpdateJobStartDateRequestModel job) {
        try {
            Work work = getValidWorkForUser(principal, job.id());
            work.setStartDate(job.startDate());
            workRepository.save(work);
            return ResponseEntity.ok(new Response(StatusType.OK, "Start date updated successfully", work.getStartDate()));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    public ResponseEntity<Response> updateJobEndDate(Principal principal, UpdateJobEndDateRequestModel job) {
        try {
            Work work = getValidWorkForUser(principal, job.id());
            work.setEndDate(job.endDate());
            workRepository.save(work);
            return ResponseEntity.ok(new Response(StatusType.OK, "End date updated successfully", work.getEndDate()));
        } catch (Exception e) {
            return handleException(e);
        }
    }
}
