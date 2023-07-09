package com.codefolio.backend.user.userdata;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.services.Services;
import com.codefolio.backend.user.services.ServicesRepository;
import com.codefolio.backend.user.services.ServicesType;
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
public class UserDataService {

    private final ServicesRepository servicesRepository;

    public ResponseEntity<Response> updateServices(Principal principal, UpdateServiceRequestModel updateServiceRequestModel) {
        try {
            System.out.println(updateServiceRequestModel.after());
            System.out.println(updateServiceRequestModel.before());
            Users user = getAuthenticatedUser(principal);
            ServicesType afterService;
            ServicesType beforeService;
            try {
                afterService = ServicesType.valueOf(updateServiceRequestModel.after());
                beforeService = ServicesType.valueOf(updateServiceRequestModel.before());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service not found", null));
            }
            Optional<Services> service = servicesRepository.findByUsersAndService(user, beforeService);
            if (service.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service not found", null));
            }
            service.get().setService(afterService);
            servicesRepository.save(service.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Service updated successfully", service.get().getService()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
