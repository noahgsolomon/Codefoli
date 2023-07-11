package com.codefolio.backend.user.userdata;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.services.Services;
import com.codefolio.backend.user.services.ServicesRepository;
import com.codefolio.backend.user.services.ServicesType;
import com.codefolio.backend.user.skills.Skills;
import com.codefolio.backend.user.skills.SkillsRepository;
import com.codefolio.backend.user.skills.SkillsType;
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
    private final SkillsRepository skillsRepository;

    public ResponseEntity<Response> updateServices(Principal principal, UpdateServiceRequestModel updateServiceRequestModel) {
        try {
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

    public ResponseEntity<Response> removeLanguage(Principal principal, String skill) {
        try {
            Users user = getAuthenticatedUser(principal);
            SkillsType language;
            try {
                language = SkillsType.valueOf(skill);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Skill not found", null));
            }
            Optional<Skills> optionalSkill = skillsRepository.findByUsersAndSkill(user, language);
            if (optionalSkill.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Skill not found", null));
            }
            skillsRepository.delete(optionalSkill.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Skill removed successfully", skill));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addLanguage(Principal principal, String skill) {
        try {
            Users user = getAuthenticatedUser(principal);
            SkillsType language;
            try {
                language = SkillsType.valueOf(skill);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Skill not found", null));
            }
            Optional<Skills> optionalSkill = skillsRepository.findByUsersAndSkill(user, language);
            if (optionalSkill.isPresent()){
                return ResponseEntity.badRequest().body(new Response(StatusType.BAD, "Skill already present", null));
            }
            skillsRepository.save(new Skills(language, user));
            return ResponseEntity.ok(new Response(StatusType.OK, "Skill added successfully", skill));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> removeService(Principal principal, String serviceString) {
        try {
            Users user = getAuthenticatedUser(principal);
            ServicesType serviceType;
            try {
                serviceType = ServicesType.valueOf(serviceString);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service not found", null));
            }
            Optional<Services> service = servicesRepository.findByUsersAndService(user, serviceType);
            if (service.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service not found", null));
            }
            servicesRepository.delete(service.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Service removed successfully", service.get().getService()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addService(Principal principal, String serviceString) {
        try {
            Users user = getAuthenticatedUser(principal);
            ServicesType serviceType;
            try {
                serviceType = ServicesType.valueOf(serviceString);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service not found", null));
            }
            Optional<Services> service = servicesRepository.findByUsersAndService(user, serviceType);
            if (service.isPresent()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service already present", null));
            }
            Services services = new Services(serviceType, user);
            servicesRepository.save(services);
            return ResponseEntity.ok(new Response(StatusType.OK, "Service added successfully", services.getService()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
